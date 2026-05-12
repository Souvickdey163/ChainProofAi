import os
import cv2
import pytesseract
import numpy as np
from PIL import Image
import hashlib
import json
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
import pdf2image
import tempfile
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

class DocumentAnalyzer:
    """AI-powered document authenticity analyzer"""
    
    def __init__(self):
        self.ela_threshold = 80  # Error Level Analysis threshold
        self.noise_threshold = 0.05
        logger.info("Document Analyzer initialized")
    
    def calculate_image_hash(self, image_path):
        """Calculate perceptual hash of image"""
        try:
            img = cv2.imread(image_path)
            if img is None:
                return None
            # Resize to 8x8 for simple hash
            resized = cv2.resize(img, (8, 8))
            gray = cv2.cvtColor(resized, cv2.COLOR_BGR2GRAY) if len(resized.shape) == 3 else resized
            # Calculate average
            avg = gray.mean()
            # Create hash
            hash_val = ''.join(['1' if pixel > avg else '0' for pixel in gray.flatten()])
            return hash_val
        except Exception as e:
            logger.error(f"Hash calculation error: {e}")
            return None
    
    def detect_tampering_ela(self, image_path):
        """Detect tampering using Error Level Analysis"""
        try:
            img = cv2.imread(image_path)
            if img is None:
                return False, []
            
            # Save original image with different quality
            temp_dir = tempfile.mkdtemp()
            temp_path = os.path.join(temp_dir, 'temp_img.jpg')
            cv2.imwrite(temp_path, img, [cv2.IMWRITE_JPEG_QUALITY, 95])
            
            # Read back the saved image
            recompressed = cv2.imread(temp_path)
            
            # Calculate difference
            diff = cv2.absdiff(img, recompressed)
            diff_gray = cv2.cvtColor(diff, cv2.COLOR_BGR2GRAY)
            
            # Analyze difference
            mean_diff = np.mean(diff_gray)
            std_diff = np.std(diff_gray)
            
            # Clean up temp file
            os.remove(temp_path)
            os.rmdir(temp_dir)
            
            # High mean difference suggests tampering
            tampering_detected = mean_diff > self.ela_threshold
            
            # Find suspicious regions
            suspicious_regions = []
            if tampering_detected:
                # Threshold diff image
                _, thresh = cv2.threshold(diff_gray, self.ela_threshold, 255, cv2.THRESH_BINARY)
                contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
                
                for contour in contours:
                    if cv2.contourArea(contour) > 100:  # Minimum area
                        x, y, w, h = cv2.boundingRect(contour)
                        suspicious_regions.append({
                            'coordinates': {'x': int(x), 'y': int(y), 'width': int(w), 'height': int(h)},
                            'confidence': float(np.mean(diff_gray[y:y+h, x:x+w]) / 255),
                            'reason': 'ELA anomaly detected'
                        })
            
            return tampering_detected, suspicious_regions
        
        except Exception as e:
            logger.error(f"ELA tampering detection error: {e}")
            return False, []
    
    def extract_text_ocr(self, image_path):
        """Extract text using Tesseract OCR"""
        try:
            # Read image
            img = cv2.imread(image_path)
            if img is None:
                return "", 0.0
            
            # Convert to grayscale
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            
            # Apply thresholding
            _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
            
            # OCR with confidence
            ocr_data = pytesseract.image_to_data(thresh, output_type=pytesseract.Output.DICT)
            
            # Extract text and calculate confidence
            text = ' '.join(ocr_data['text'])
            confidences = [int(conf) for conf in ocr_data['conf'] if int(conf) > 0]
            avg_confidence = np.mean(confidences) / 100 if confidences else 0.0
            
            return text, avg_confidence
        
        except Exception as e:
            logger.error(f"OCR error: {e}")
            return "", 0.0
    
    def check_metadata_anomalies(self, image_path):
        """Check for suspicious metadata patterns"""
        issues = []
        
        try:
            # Read image metadata
            img = Image.open(image_path)
            
            # Check image mode
            if img.mode not in ['RGB', 'RGBA']:
                issues.append(f"Unusual image color mode: {img.mode}")
            
            # Check for unusual dimensions
            width, height = img.size
            if width < 100 or height < 100:
                issues.append("Image dimensions too small for proper analysis")
            if width > 10000 or height > 10000:
                issues.append("Suspiciously large image dimensions")
            
            # Check aspect ratio
            aspect_ratio = width / height
            if aspect_ratio > 5 or aspect_ratio < 0.2:
                issues.append("Unusual aspect ratio detected")
            
            # Check for EXIF data anomalies
            exif = img._getexif() if hasattr(img, '_getexif') else None
            if exif:
                # Check for editing software signatures
                software = exif.get(305, '')
                if 'Photoshop' in software or 'GIMP' in software or 'Lightroom' in software:
                    issues.append(f"Image edited with professional software: {software}")
            
        except Exception as e:
            logger.error(f"Metadata analysis error: {e}")
            issues.append("Could not read image metadata")
        
        return issues
    
    def analyze_noise_patterns(self, image_path):
        """Analyze noise patterns for tampering signs"""
        try:
            img = cv2.imread(image_path)
            if img is None:
                return False
            
            # Convert to grayscale
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            
            # Calculate noise level
            noise = cv2.Laplacian(gray, cv2.CV_64F).var()
            
            # High noise indicates possible manipulation
            is_noisy = noise < 100 or noise > 1000
            
            return is_noisy
        
        except Exception as e:
            logger.error(f"Noise analysis error: {e}")
            return False
    
    def analyze_file(self, file_path, file_hash):
        """Main analysis function"""
        logger.info(f"Analyzing file: {file_path}")
        
        # Initialize results
        results = {
            'trustScore': 0,
            'ocrConfidence': 0.0,
            'tamperingDetected': False,
            'suspiciousRegions': [],
            'metadataIssues': [],
            'detailedReport': {}
        }
        
        # Check if file exists
        if not os.path.exists(file_path):
            return results
        
        # Convert PDF to images if needed
        image_path = file_path
        if file_path.lower().endswith('.pdf'):
            try:
                images = pdf2image.convert_from_path(file_path, first_page=1, last_page=1)
                if images:
                    temp_path = tempfile.mktemp(suffix='.png')
                    images[0].save(temp_path)
                    image_path = temp_path
            except Exception as e:
                logger.error(f"PDF conversion error: {e}")
        
        # Perform various analyses
        trust_score = 100
        issues = []
        
        # 1. OCR Analysis
        ocr_text, ocr_confidence = self.extract_text_ocr(image_path)
        results['ocrConfidence'] = ocr_confidence
        results['detailedReport']['ocrText'] = ocr_text[:500]  # Limit text length
        
        if ocr_confidence < 0.6:
            trust_score -= 30
            issues.append(f"Low OCR confidence: {ocr_confidence:.2%}")
        elif ocr_confidence < 0.8:
            trust_score -= 15
            issues.append(f"Medium OCR confidence: {ocr_confidence:.2%}")
        
        # 2. Tampering Detection
        tampering_detected, suspicious_regions = self.detect_tampering_ela(image_path)
        results['tamperingDetected'] = tampering_detected
        results['suspiciousRegions'] = suspicious_regions
        
        if tampering_detected:
            trust_score -= 50
            issues.append("Possible image tampering detected via ELA")
        elif len(suspicious_regions) > 0:
            trust_score -= 25
            issues.append(f"Found {len(suspicious_regions)} suspicious regions")
        
        # 3. Metadata Analysis
        metadata_issues = self.check_metadata_anomalies(image_path)
        results['metadataIssues'] = metadata_issues
        
        for issue in metadata_issues:
            trust_score -= 10
            issues.append(issue)
        
        # 4. Noise Pattern Analysis
        is_noisy = self.analyze_noise_patterns(image_path)
        if is_noisy:
            trust_score -= 15
            issues.append("Unusual noise patterns detected")
        
        # Clamp trust score
        trust_score = max(0, min(100, trust_score))
        results['trustScore'] = trust_score
        
        # Generate detailed report
        results['detailedReport'].update({
            'trustLevel': 'HIGH' if trust_score >= 80 else 'MEDIUM' if trust_score >= 60 else 'LOW',
            'issuesFound': issues,
            'analysisTimestamp': datetime.now().isoformat(),
            'recommendations': self.generate_recommendations(trust_score, issues)
        })
        
        # Clean up temp file
        if image_path != file_path and os.path.exists(image_path):
            os.remove(image_path)
        
        logger.info(f"Analysis complete. Trust Score: {trust_score}")
        return results
    
    def generate_recommendations(self, trust_score, issues):
        """Generate recommendations based on analysis"""
        recommendations = []
        
        if trust_score >= 80:
            recommendations.append("Document appears authentic. No immediate action required.")
        elif trust_score >= 60:
            recommendations.append("Document shows some anomalies. Consider manual verification.")
            recommendations.append("Request original document for comparison if available.")
        else:
            recommendations.append("⚠️ Document shows strong signs of tampering!")
            recommendations.append("Do NOT trust this document without independent verification.")
            recommendations.append("Request original source document immediately.")
        
        if issues:
            recommendations.append("Specific concerns: " + "; ".join(issues[:3]))
        
        return recommendations

# Initialize analyzer
analyzer = DocumentAnalyzer()

@app.route('/analyze', methods=['POST'])
def analyze():
    """Endpoint for file analysis"""
    try:
        # Check if file is present
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        file_hash = request.form.get('fileHash', '')
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Save temporary file
        temp_dir = tempfile.mkdtemp()
        temp_path = os.path.join(temp_dir, file.filename)
        file.save(temp_path)
        
        # Analyze file
        results = analyzer.analyze_file(temp_path, file_hash)
        
        # Clean up temp file
        os.remove(temp_path)
        os.rmdir(temp_dir)
        
        return jsonify(results), 200
    
    except Exception as e:
        logger.error(f"Analysis endpoint error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'ChainProof AI Python Service',
        'timestamp': datetime.now().isoformat()
    }), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5002))
    app.run(host='0.0.0.0', port=port, debug=False)
