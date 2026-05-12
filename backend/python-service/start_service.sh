#!/bin/bash

# Install system dependencies for Tesseract
apt-get update
apt-get install -y tesseract-ocr poppler-utils

# Install Python dependencies
pip install -r requirements.txt

# Start the Flask service
python ai_analyzer.py