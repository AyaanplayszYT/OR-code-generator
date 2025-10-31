import { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

interface QRCodeGeneratorProps {
  value: string;
  size: number;
  fgColor: string;
  bgColor: string;
  errorLevel: "L" | "M" | "Q" | "H";
  includeMargin: boolean;
  logoImage?: string;
  logoSize?: number;
  logoOpacity?: number;
  dotStyle?: "square" | "dots" | "rounded";
  cornerStyle?: "square" | "rounded" | "extra-rounded";
  frameStyle?: "none" | "basic" | "banner" | "tooltip";
  frameText?: string;
  useGradient?: boolean;
  gradientColor?: string;
}

export const QRCodeGenerator = ({
  value,
  size,
  fgColor,
  bgColor,
  errorLevel,
  includeMargin,
  logoImage,
  logoSize = 50,
  logoOpacity = 1,
  dotStyle = "square",
  cornerStyle = "square",
  frameStyle = "none",
  frameText = "Scan Me",
  useGradient = false,
  gradientColor = "#A855F7",
}: QRCodeGeneratorProps) => {
  const qrRef = useRef<HTMLDivElement>(null);

  const getQRStyle = () => {
    let style = "";
    
    if (dotStyle === "dots") {
      style += "qr-dots ";
    } else if (dotStyle === "rounded") {
      style += "qr-rounded ";
    }
    
    if (cornerStyle === "rounded") {
      style += "qr-rounded-corners ";
    } else if (cornerStyle === "extra-rounded") {
      style += "qr-extra-rounded-corners ";
    }
    
    return style;
  };

  const downloadQR = (format: "png" | "svg") => {
    if (!qrRef.current) return;

    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;

    if (format === "svg") {
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "qrcode.svg";
      link.click();
      URL.revokeObjectURL(url);
      toast.success("QR Code downloaded as SVG!");
    } else {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const svgData = new XMLSerializer().serializeToString(svg);
      const img = new Image();
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        canvas.width = size;
        canvas.height = size;
        ctx.drawImage(img, 0, 0, size, size);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const pngUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = pngUrl;
            link.download = "qrcode.png";
            link.click();
            URL.revokeObjectURL(pngUrl);
            toast.success("QR Code downloaded as PNG!");
          }
        });
        URL.revokeObjectURL(url);
      };
      img.src = url;
    }
  };

  return (
    <div className="glass rounded-2xl p-8 flex flex-col items-center space-y-6">
      <h3 className="text-2xl font-medium text-center">Your QR Code</h3>
      
      <div 
        ref={qrRef}
        className={`bg-white p-8 rounded-xl relative ${frameStyle !== "none" ? "qr-with-frame" : ""}`}
        style={{ 
          boxShadow: "0 10px 40px rgba(74, 222, 128, 0.2)" 
        }}
      >
        <div className={getQRStyle()}>
          <QRCodeSVG
            value={value || "https://example.com"}
            size={size}
            fgColor={fgColor}
            bgColor={bgColor}
            level={errorLevel}
            includeMargin={includeMargin}
            imageSettings={
              logoImage
                ? {
                    src: logoImage,
                    x: undefined,
                    y: undefined,
                    height: logoSize,
                    width: logoSize,
                    excavate: true,
                    opacity: logoOpacity,
                  }
                : undefined
            }
          />
        </div>
        
        {frameStyle === "banner" && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap">
            {frameText}
          </div>
        )}
        
        {frameStyle === "tooltip" && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap">
            {frameText}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-primary"></div>
          </div>
        )}
        
        {frameStyle === "basic" && (
          <div className="absolute -bottom-8 left-0 right-0 text-center text-sm font-medium text-foreground">
            {frameText}
          </div>
        )}
      </div>

      <div className="flex gap-3 flex-wrap justify-center">
        <Button
          onClick={() => downloadQR("png")}
          className="button-gradient"
          disabled={!value}
        >
          <Download className="w-4 h-4 mr-2" />
          Download PNG
        </Button>
        <Button
          onClick={() => downloadQR("svg")}
          variant="outline"
          disabled={!value}
        >
          <Download className="w-4 h-4 mr-2" />
          Download SVG
        </Button>
      </div>
      
      <div className="text-sm text-muted-foreground text-center">
        <p>💡 Pro Tip: Use high error correction for QR codes with logos</p>
      </div>
    </div>
  );
};
