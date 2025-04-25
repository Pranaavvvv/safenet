"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Download, QrCode, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function QRCodePage() {
  const [qrType, setQrType] = useState<"contact" | "location" | "custom">("contact")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [customText, setCustomText] = useState("")
  const [includeEmergencyInfo, setIncludeEmergencyInfo] = useState(true)
  const [qrGenerated, setQrGenerated] = useState(false)

  const handleGenerateQR = () => {
    // In a real app, we would generate a QR code here
    setQrGenerated(true)
  }

  const isFormValid = () => {
    if (qrType === "contact") return name.trim() !== "" && phone.trim() !== ""
    if (qrType === "location") return address.trim() !== ""
    if (qrType === "custom") return customText.trim() !== ""
    return false
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Emergency QR Code</h1>
        <p className="text-muted-foreground">Generate QR codes with your emergency information</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Create QR Code</CardTitle>
            <CardDescription>Select the type of information to include</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={qrType} onValueChange={(value) => setQrType(value as any)} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="contact">Contact Info</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="custom">Custom Text</TabsTrigger>
              </TabsList>

              <TabsContent value="contact" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Emergency Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter emergency contact number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Switch
                    id="emergency-info"
                    checked={includeEmergencyInfo}
                    onCheckedChange={setIncludeEmergencyInfo}
                  />
                  <Label htmlFor="emergency-info">Include emergency medical information</Label>
                </div>
                {includeEmergencyInfo && (
                  <div className="space-y-2 rounded-md border p-4">
                    <Label htmlFor="medical-info">Medical Information (allergies, conditions, etc.)</Label>
                    <Textarea
                      id="medical-info"
                      placeholder="Enter relevant medical information"
                      className="min-h-[100px]"
                    />
                  </div>
                )}
              </TabsContent>

              <TabsContent value="location" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address or Location</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your address or location details"
                    className="min-h-[100px]"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="current-location" defaultChecked />
                  <Label htmlFor="current-location">Use current GPS location</Label>
                </div>
              </TabsContent>

              <TabsContent value="custom" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="custom-text">Custom Information</Label>
                  <Textarea
                    id="custom-text"
                    placeholder="Enter any custom information you want to include"
                    className="min-h-[150px]"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button onClick={handleGenerateQR} className="w-full" disabled={!isFormValid()}>
              <QrCode className="mr-2 h-4 w-4" />
              Generate QR Code
            </Button>
          </CardFooter>
        </Card>

        <Card
          className={cn(
            "flex flex-col items-center justify-center transition-all duration-300",
            !qrGenerated && "opacity-50",
          )}
        >
          <CardHeader className="text-center">
            <CardTitle>Your QR Code</CardTitle>
            <CardDescription>
              {qrGenerated
                ? "Scan this code to access your emergency information"
                : "Fill out the form and generate your QR code"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="mb-6 flex h-64 w-64 items-center justify-center rounded-lg border-2 border-dashed p-2">
              {qrGenerated ? (
                <div className="h-full w-full bg-[url('/placeholder.svg?height=250&width=250')] bg-contain bg-center bg-no-repeat"></div>
              ) : (
                <QrCode className="h-16 w-16 text-muted-foreground opacity-50" />
              )}
            </div>

            {qrGenerated && (
              <div className="w-full rounded-lg border p-4 text-center">
                <h3 className="mb-1 font-medium">
                  {qrType === "contact"
                    ? `${name}'s Emergency Contact`
                    : qrType === "location"
                      ? "Location Information"
                      : "Custom Information"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {qrType === "contact" ? `Phone: ${phone}` : qrType === "location" ? address : "Custom data included"}
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex w-full gap-2">
            <Button variant="outline" className="flex-1" disabled={!qrGenerated}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button className="flex-1" disabled={!qrGenerated}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
