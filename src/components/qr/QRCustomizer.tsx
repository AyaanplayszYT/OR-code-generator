import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Palette, Image, Settings2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface QRCustomizerProps {
  size: number;
  setSize: (size: number) => void;
  fgColor: string;
  setFgColor: (color: string) => void;
  bgColor: string;
  setBgColor: (color: string) => void;
  errorLevel: "L" | "M" | "Q" | "H";
  setErrorLevel: (level: "L" | "M" | "Q" | "H") => void;
  includeMargin: boolean;
  setIncludeMargin: (include: boolean) => void;
  logoImage: string;
  setLogoImage: (image: string) => void;
  logoSize: number;
  setLogoSize: (size: number) => void;
  logoOpacity: number;
  setLogoOpacity: (opacity: number) => void;
  dotStyle: "square" | "dots" | "rounded";
  setDotStyle: (style: "square" | "dots" | "rounded") => void;
  cornerStyle: "square" | "rounded" | "extra-rounded";
  setCornerStyle: (style: "square" | "rounded" | "extra-rounded") => void;
  frameStyle: "none" | "basic" | "banner" | "tooltip";
  setFrameStyle: (style: "none" | "basic" | "banner" | "tooltip") => void;
  frameText: string;
  setFrameText: (text: string) => void;
  useGradient: boolean;
  setUseGradient: (use: boolean) => void;
  gradientColor: string;
  setGradientColor: (color: string) => void;
}

export const QRCustomizer = ({
  size,
  setSize,
  fgColor,
  setFgColor,
  bgColor,
  setBgColor,
  errorLevel,
  setErrorLevel,
  includeMargin,
  setIncludeMargin,
  logoImage,
  setLogoImage,
  logoSize,
  setLogoSize,
  logoOpacity,
  setLogoOpacity,
  dotStyle,
  setDotStyle,
  cornerStyle,
  setCornerStyle,
  frameStyle,
  setFrameStyle,
  frameText,
  setFrameText,
  useGradient,
  setUseGradient,
  gradientColor,
  setGradientColor,
}: QRCustomizerProps) => {
  const presetColors = [
    { name: "Black", value: "#000000" },
    { name: "Green", value: "#4ADE80" },
    { name: "Blue", value: "#3B82F6" },
    { name: "Purple", value: "#A855F7" },
    { name: "Red", value: "#EF4444" },
    { name: "Orange", value: "#F97316" },
  ];

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-2xl font-medium mb-6">Customize</h3>
      
      <Tabs defaultValue="style" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="style">
            <Palette className="w-4 h-4 mr-2" />
            Style
          </TabsTrigger>
          <TabsTrigger value="pattern">
            Pattern
          </TabsTrigger>
          <TabsTrigger value="logo">
            <Image className="w-4 h-4 mr-2" />
            Logo
          </TabsTrigger>
          <TabsTrigger value="advanced">
            <Settings2 className="w-4 h-4 mr-2" />
            Advanced
          </TabsTrigger>
        </TabsList>

        <TabsContent value="style" className="space-y-6">
          {/* Size Control */}
          <div className="space-y-3">
            <Label>QR Code Size: {size}px</Label>
            <Slider
              value={[size]}
              onValueChange={(value) => setSize(value[0])}
              min={128}
              max={512}
              step={32}
            />
          </div>

          {/* Foreground Color */}
          <div className="space-y-3">
            <Label>Foreground Color</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-20 h-10"
              />
              <Input
                type="text"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                placeholder="#000000"
                className="flex-1"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {presetColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setFgColor(color.value)}
                  className="w-8 h-8 rounded-lg border-2 border-white/20 hover:border-primary transition-all"
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Background Color */}
          <div className="space-y-3">
            <Label>Background Color</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-20 h-10"
              />
              <Input
                type="text"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                placeholder="#FFFFFF"
                className="flex-1"
              />
            </div>
          </div>

          {/* Gradient Toggle */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Use Gradient</Label>
              <Switch checked={useGradient} onCheckedChange={setUseGradient} />
            </div>
            {useGradient && (
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={gradientColor}
                  onChange={(e) => setGradientColor(e.target.value)}
                  className="w-20 h-10"
                />
                <Input
                  type="text"
                  value={gradientColor}
                  onChange={(e) => setGradientColor(e.target.value)}
                  placeholder="#A855F7"
                  className="flex-1"
                />
              </div>
            )}
          </div>

          {/* Margin Toggle */}
          <div className="flex items-center justify-between">
            <Label>Include Margin</Label>
            <Switch checked={includeMargin} onCheckedChange={setIncludeMargin} />
          </div>
        </TabsContent>

        <TabsContent value="pattern" className="space-y-6">
          {/* Dot Style */}
          <div className="space-y-3">
            <Label>Dot Style</Label>
            <Select value={dotStyle} onValueChange={(value: any) => setDotStyle(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="square">Square (Default)</SelectItem>
                <SelectItem value="dots">Rounded Dots</SelectItem>
                <SelectItem value="rounded">Rounded</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Corner Style */}
          <div className="space-y-3">
            <Label>Corner Style</Label>
            <Select value={cornerStyle} onValueChange={(value: any) => setCornerStyle(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="square">Square (Default)</SelectItem>
                <SelectItem value="rounded">Rounded</SelectItem>
                <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Frame Style */}
          <div className="space-y-3">
            <Label>Frame Style</Label>
            <Select value={frameStyle} onValueChange={(value: any) => setFrameStyle(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Frame</SelectItem>
                <SelectItem value="basic">Basic Border</SelectItem>
                <SelectItem value="banner">Banner</SelectItem>
                <SelectItem value="tooltip">Tooltip Bubble</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Frame Text */}
          {frameStyle !== "none" && (
            <div className="space-y-3">
              <Label>Frame Text</Label>
              <Input
                type="text"
                value={frameText}
                onChange={(e) => setFrameText(e.target.value)}
                placeholder="Scan Me"
              />
            </div>
          )}
        </TabsContent>

        <TabsContent value="logo" className="space-y-6">
          {/* Logo Upload */}
          <div className="space-y-3">
            <Label>Upload Logo/Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="cursor-pointer"
            />
            {logoImage && (
              <div className="flex items-center justify-between">
                <img src={logoImage} alt="Logo preview" className="w-16 h-16 object-contain rounded" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLogoImage("")}
                >
                  Remove
                </Button>
              </div>
            )}
          </div>

          {logoImage && (
            <>
              {/* Logo Size */}
              <div className="space-y-3">
                <Label>Logo Size: {logoSize}px</Label>
                <Slider
                  value={[logoSize]}
                  onValueChange={(value) => setLogoSize(value[0])}
                  min={20}
                  max={100}
                  step={5}
                />
              </div>

              {/* Logo Opacity */}
              <div className="space-y-3">
                <Label>Logo Opacity: {Math.round(logoOpacity * 100)}%</Label>
                <Slider
                  value={[logoOpacity * 100]}
                  onValueChange={(value) => setLogoOpacity(value[0] / 100)}
                  min={0}
                  max={100}
                  step={5}
                />
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          {/* Error Correction Level */}
          <div className="space-y-3">
            <Label>Error Correction Level</Label>
            <Select value={errorLevel} onValueChange={(value: any) => setErrorLevel(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="L">Low (7%)</SelectItem>
                <SelectItem value="M">Medium (15%)</SelectItem>
                <SelectItem value="Q">Quartile (25%)</SelectItem>
                <SelectItem value="H">High (30%)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Higher levels allow the QR code to be read even if partially damaged
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
