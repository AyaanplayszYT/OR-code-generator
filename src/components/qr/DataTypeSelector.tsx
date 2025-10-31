import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, Mail, Phone, MessageSquare, Wifi, User } from "lucide-react";

interface DataTypeSelectorProps {
  onValueChange: (value: string) => void;
}

export const DataTypeSelector = ({ onValueChange }: DataTypeSelectorProps) => {
  const [dataType, setDataType] = useState<string>("url");
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [phone, setPhone] = useState("");
  const [sms, setSms] = useState("");
  const [smsMessage, setSmsMessage] = useState("");
  const [wifiSSID, setWifiSSID] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiEncryption, setWifiEncryption] = useState("WPA");
  const [vCardName, setVCardName] = useState("");
  const [vCardPhone, setVCardPhone] = useState("");
  const [vCardEmail, setVCardEmail] = useState("");
  const [vCardOrg, setVCardOrg] = useState("");

  const updateValue = (type: string, data: any) => {
    switch (type) {
      case "url":
        onValueChange(data);
        break;
      case "text":
        onValueChange(data);
        break;
      case "email":
        onValueChange(`mailto:${data.email}?subject=${encodeURIComponent(data.subject)}`);
        break;
      case "phone":
        onValueChange(`tel:${data}`);
        break;
      case "sms":
        onValueChange(`sms:${data.phone}?body=${encodeURIComponent(data.message)}`);
        break;
      case "wifi":
        onValueChange(`WIFI:T:${data.encryption};S:${data.ssid};P:${data.password};;`);
        break;
      case "vcard":
        const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${data.name}
TEL:${data.phone}
EMAIL:${data.email}
ORG:${data.org}
END:VCARD`;
        onValueChange(vcard);
        break;
    }
  };

  const handleTypeChange = (type: string) => {
    setDataType(type);
    // Trigger initial value update
    setTimeout(() => {
      switch (type) {
        case "url":
          updateValue(type, url);
          break;
        case "text":
          updateValue(type, text);
          break;
        case "email":
          updateValue(type, { email, subject: emailSubject });
          break;
        case "phone":
          updateValue(type, phone);
          break;
        case "sms":
          updateValue(type, { phone: sms, message: smsMessage });
          break;
        case "wifi":
          updateValue(type, { ssid: wifiSSID, password: wifiPassword, encryption: wifiEncryption });
          break;
        case "vcard":
          updateValue(type, { name: vCardName, phone: vCardPhone, email: vCardEmail, org: vCardOrg });
          break;
      }
    }, 0);
  };

  return (
    <div className="glass rounded-2xl p-6 space-y-6">
      <h3 className="text-2xl font-medium">QR Code Content</h3>
      
      {/* Data Type Selector */}
      <div className="space-y-3">
        <Label>Content Type</Label>
        <Select value={dataType} onValueChange={handleTypeChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="url">
              <div className="flex items-center">
                <Link className="w-4 h-4 mr-2" />
                URL / Website
              </div>
            </SelectItem>
            <SelectItem value="text">
              <div className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                Plain Text
              </div>
            </SelectItem>
            <SelectItem value="email">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </div>
            </SelectItem>
            <SelectItem value="phone">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                Phone Number
              </div>
            </SelectItem>
            <SelectItem value="sms">
              <div className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                SMS Message
              </div>
            </SelectItem>
            <SelectItem value="wifi">
              <div className="flex items-center">
                <Wifi className="w-4 h-4 mr-2" />
                WiFi Network
              </div>
            </SelectItem>
            <SelectItem value="vcard">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                Contact Card (vCard)
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Dynamic Input Fields */}
      {dataType === "url" && (
        <div className="space-y-3">
          <Label>Website URL</Label>
          <Input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              updateValue("url", e.target.value);
            }}
          />
        </div>
      )}

      {dataType === "text" && (
        <div className="space-y-3">
          <Label>Text Content</Label>
          <Textarea
            placeholder="Enter any text..."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              updateValue("text", e.target.value);
            }}
            rows={4}
          />
        </div>
      )}

      {dataType === "email" && (
        <>
          <div className="space-y-3">
            <Label>Email Address</Label>
            <Input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                updateValue("email", { email: e.target.value, subject: emailSubject });
              }}
            />
          </div>
          <div className="space-y-3">
            <Label>Subject (Optional)</Label>
            <Input
              type="text"
              placeholder="Email subject"
              value={emailSubject}
              onChange={(e) => {
                setEmailSubject(e.target.value);
                updateValue("email", { email, subject: e.target.value });
              }}
            />
          </div>
        </>
      )}

      {dataType === "phone" && (
        <div className="space-y-3">
          <Label>Phone Number</Label>
          <Input
            type="tel"
            placeholder="+1234567890"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              updateValue("phone", e.target.value);
            }}
          />
        </div>
      )}

      {dataType === "sms" && (
        <>
          <div className="space-y-3">
            <Label>Phone Number</Label>
            <Input
              type="tel"
              placeholder="+1234567890"
              value={sms}
              onChange={(e) => {
                setSms(e.target.value);
                updateValue("sms", { phone: e.target.value, message: smsMessage });
              }}
            />
          </div>
          <div className="space-y-3">
            <Label>Message (Optional)</Label>
            <Textarea
              placeholder="Pre-filled message..."
              value={smsMessage}
              onChange={(e) => {
                setSmsMessage(e.target.value);
                updateValue("sms", { phone: sms, message: e.target.value });
              }}
              rows={3}
            />
          </div>
        </>
      )}

      {dataType === "wifi" && (
        <>
          <div className="space-y-3">
            <Label>Network Name (SSID)</Label>
            <Input
              type="text"
              placeholder="MyWiFiNetwork"
              value={wifiSSID}
              onChange={(e) => {
                setWifiSSID(e.target.value);
                updateValue("wifi", { ssid: e.target.value, password: wifiPassword, encryption: wifiEncryption });
              }}
            />
          </div>
          <div className="space-y-3">
            <Label>Password</Label>
            <Input
              type="text"
              placeholder="WiFi password"
              value={wifiPassword}
              onChange={(e) => {
                setWifiPassword(e.target.value);
                updateValue("wifi", { ssid: wifiSSID, password: e.target.value, encryption: wifiEncryption });
              }}
            />
          </div>
          <div className="space-y-3">
            <Label>Encryption Type</Label>
            <Select
              value={wifiEncryption}
              onValueChange={(value) => {
                setWifiEncryption(value);
                updateValue("wifi", { ssid: wifiSSID, password: wifiPassword, encryption: value });
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="WPA">WPA/WPA2</SelectItem>
                <SelectItem value="WEP">WEP</SelectItem>
                <SelectItem value="nopass">No Password</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {dataType === "vcard" && (
        <>
          <div className="space-y-3">
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="John Doe"
              value={vCardName}
              onChange={(e) => {
                setVCardName(e.target.value);
                updateValue("vcard", { name: e.target.value, phone: vCardPhone, email: vCardEmail, org: vCardOrg });
              }}
            />
          </div>
          <div className="space-y-3">
            <Label>Phone Number</Label>
            <Input
              type="tel"
              placeholder="+1234567890"
              value={vCardPhone}
              onChange={(e) => {
                setVCardPhone(e.target.value);
                updateValue("vcard", { name: vCardName, phone: e.target.value, email: vCardEmail, org: vCardOrg });
              }}
            />
          </div>
          <div className="space-y-3">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="john@example.com"
              value={vCardEmail}
              onChange={(e) => {
                setVCardEmail(e.target.value);
                updateValue("vcard", { name: vCardName, phone: vCardPhone, email: e.target.value, org: vCardOrg });
              }}
            />
          </div>
          <div className="space-y-3">
            <Label>Organization (Optional)</Label>
            <Input
              type="text"
              placeholder="Company Name"
              value={vCardOrg}
              onChange={(e) => {
                setVCardOrg(e.target.value);
                updateValue("vcard", { name: vCardName, phone: vCardPhone, email: vCardEmail, org: e.target.value });
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};
