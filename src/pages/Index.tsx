import { useState } from "react";
import { motion } from "framer-motion";
import { QrCode, Sparkles } from "lucide-react";
import { QRCodeGenerator } from "@/components/qr/QRCodeGenerator";
import { QRCustomizer } from "@/components/qr/QRCustomizer";
import { DataTypeSelector } from "@/components/qr/DataTypeSelector";

const Index = () => {
  const [qrValue, setQrValue] = useState("https://example.com");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [errorLevel, setErrorLevel] = useState<"L" | "M" | "Q" | "H">("M");
  const [includeMargin, setIncludeMargin] = useState(true);
  const [logoImage, setLogoImage] = useState("");
  const [logoSize, setLogoSize] = useState(50);
  const [logoOpacity, setLogoOpacity] = useState(1);
  const [dotStyle, setDotStyle] = useState<"square" | "dots" | "rounded">("square");
  const [cornerStyle, setCornerStyle] = useState<"square" | "rounded" | "extra-rounded">("square");
  const [frameStyle, setFrameStyle] = useState<"none" | "basic" | "banner" | "tooltip">("none");
  const [frameText, setFrameText] = useState("Scan Me");
  const [useGradient, setUseGradient] = useState(false);
  const [gradientColor, setGradientColor] = useState("#A855F7");

  return (
    <div className="min-h-screen bg-black text-foreground">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container px-4 pt-20 pb-12"
      >
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass"
          >
            <QrCode className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Professional QR Code Generator</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-normal mb-6 tracking-tight">
            Create Beautiful{" "}
            <span className="text-gradient font-medium">QR Codes</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Generate customizable QR codes with advanced features. Add logos, choose colors, and download in multiple formats.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Input and Customization */}
          <div className="space-y-6">
            <DataTypeSelector onValueChange={setQrValue} />
            <QRCustomizer
              size={size}
              setSize={setSize}
              fgColor={fgColor}
              setFgColor={setFgColor}
              bgColor={bgColor}
              setBgColor={setBgColor}
              errorLevel={errorLevel}
              setErrorLevel={setErrorLevel}
              includeMargin={includeMargin}
              setIncludeMargin={setIncludeMargin}
              logoImage={logoImage}
              setLogoImage={setLogoImage}
              logoSize={logoSize}
              setLogoSize={setLogoSize}
              logoOpacity={logoOpacity}
              setLogoOpacity={setLogoOpacity}
              dotStyle={dotStyle}
              setDotStyle={setDotStyle}
              cornerStyle={cornerStyle}
              setCornerStyle={setCornerStyle}
              frameStyle={frameStyle}
              setFrameStyle={setFrameStyle}
              frameText={frameText}
              setFrameText={setFrameText}
              useGradient={useGradient}
              setUseGradient={setUseGradient}
              gradientColor={gradientColor}
              setGradientColor={setGradientColor}
            />
          </div>

          {/* Right Column - QR Code Preview and Download */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <QRCodeGenerator
              value={qrValue}
              size={size}
              fgColor={fgColor}
              bgColor={bgColor}
              errorLevel={errorLevel}
              includeMargin={includeMargin}
              logoImage={logoImage}
              logoSize={logoSize}
              logoOpacity={logoOpacity}
              dotStyle={dotStyle}
              cornerStyle={cornerStyle}
              frameStyle={frameStyle}
              frameText={frameText}
              useGradient={useGradient}
              gradientColor={gradientColor}
            />
          </div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-20 max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Fully Customizable</h3>
              <p className="text-gray-400">
                Choose colors, add logos, adjust sizes, and control every aspect of your QR code design
              </p>
            </div>

            <div className="glass rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <QrCode className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Multiple Formats</h3>
              <p className="text-gray-400">
                Support for URLs, text, email, phone, SMS, WiFi, and vCard contact information
              </p>
            </div>

            <div className="glass rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">High Quality Export</h3>
              <p className="text-gray-400">
                Download your QR codes in PNG or SVG format for print or digital use
              </p>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <footer className="container px-4 py-8 mt-20 border-t border-white/10">
        <div className="text-center space-y-2">
          <p className="text-gray-400 text-sm">
            © 2025 QR Code Generator. Create professional QR codes in seconds.
          </p>
          <p className="text-primary font-medium">
            Made by Mistizz911
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
