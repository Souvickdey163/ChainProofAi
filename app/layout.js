import { Space_Grotesk, Syncopate } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "@/app/globals.css";
import "@/styles/animations.css";
import "@/styles/cyber-theme.css";
import "@/styles/dashboard.css";

const fontSans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans"
});

const fontDisplay = Syncopate({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display"
});

export const metadata = {
  title: "ChainProof AI",
  description: "AI + Blockchain Powered Digital Trust Verification Platform"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${fontSans.variable} ${fontDisplay.variable} font-sans antialiased`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
