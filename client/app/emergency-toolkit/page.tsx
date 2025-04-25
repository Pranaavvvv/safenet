"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  AlertTriangle,
  Bell,
  Camera,
  Clock,
  Flashlight,
  Heart,
  MapPin,
  MessageSquare,
  Mic,
  Phone,
  PhoneCall,
  QrCode,
  Shield,
  SirenIcon as SirenAlert,
  Volume2,
  Wand2,
  Wifi,
  WifiOff,
  X,
  Check,
  Plus,
  Quote,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function EmergencyToolkitPage() {
  const [activeTab, setActiveTab] = useState("quick-access")
  const [broadcastMessage, setBroadcastMessage] = useState("")
  const [isBroadcasting, setIsBroadcasting] = useState(false)
  const [showBroadcastSuccess, setShowBroadcastSuccess] = useState(false)

  // Emergency contacts data
  const emergencyContacts = [
    {
      id: 1,
      name: "Emma Johnson",
      relationship: "Sister",
      phone: "+1 (555) 123-4567",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Michael Chen",
      relationship: "Friend",
      phone: "+1 (555) 987-6543",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Quick tools data
  const quickTools = [
    {
      id: "sos",
      name: "SOS Alert",
      description: "Send emergency alert to your trusted contacts",
      icon: <AlertTriangle className="h-6 w-6 text-red-500" />,
      color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
      link: "/",
    },
    {
      id: "fake-call",
      name: "Fake Call",
      description: "Generate a realistic fake call to help in uncomfortable situations",
      icon: <PhoneCall className="h-6 w-6 text-blue-500" />,
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
      link: "/fake-call",
    },
    {
      id: "recorder",
      name: "Emergency Recorder",
      description: "Automatically record audio and video during emergencies",
      icon: <Camera className="h-6 w-6 text-purple-500" />,
      color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
      link: "/emergency-recorder",
    },
    {
      id: "location",
      name: "Share Location",
      description: "Share your real-time location with trusted contacts",
      icon: <MapPin className="h-6 w-6 text-green-500" />,
      color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
      link: "/map",
    },
    {
      id: "qr-code",
      name: "Emergency QR Code",
      description: "Show your emergency QR code with your information",
      icon: <QrCode className="h-6 w-6 text-yellow-500" />,
      color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
      link: "/qr-code",
    },
    {
      id: "signal-loss",
      name: "Offline Protocol",
      description: "Access emergency features even without connection",
      icon: <WifiOff className="h-6 w-6 text-orange-500" />,
      color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
      link: "/signal-loss",
    },
  ]

  // Trigger gestures data
  const triggerGestures = [
    {
      id: "power-button",
      name: "Power Button",
      description: "Press power button 5 times quickly",
      action: "Activate SOS",
      enabled: true,
    },
    {
      id: "volume-buttons",
      name: "Volume Buttons",
      description: "Press and hold both volume buttons for 3 seconds",
      action: "Start Emergency Recording",
      enabled: true,
    },
    {
      id: "shake",
      name: "Shake Device",
      description: "Shake your device vigorously 3 times",
      action: "Send Location to Contacts",
      enabled: false,
    },
    {
      id: "screen-tap",
      name: "Screen Pattern",
      description: "Tap screen corners in sequence: top-left, top-right, bottom-right, bottom-left",
      action: "Trigger Fake Call",
      enabled: false,
    },
  ]

  const handleBroadcast = () => {
    if (!broadcastMessage.trim()) return

    setIsBroadcasting(true)

    // Simulate broadcast sending
    setTimeout(() => {
      setIsBroadcasting(false)
      setShowBroadcastSuccess(true)

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowBroadcastSuccess(false)
        setBroadcastMessage("")
      }, 3000)
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Emergency Toolkit</h1>
        <p className="text-muted-foreground">Quick access to all safety tools and emergency features in one place</p>
      </div>

      {/* Hero section with SOS button */}
      <div className="mb-8 rounded-xl border border-primary/20 bg-primary/5 p-6 safety-glow">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="max-w-md">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="mb-2 text-2xl font-bold">One-Touch Emergency Response</h2>
              <p className="mb-4">
                Press and hold the SOS button for 3 seconds to alert your emergency contacts with your current location
                and activate emergency protocols.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  <Shield className="mr-1 h-3 w-3" />
                  Trusted Contacts Alerted
                </Badge>
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  <MapPin className="mr-1 h-3 w-3" />
                  Location Shared
                </Badge>
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  <Camera className="mr-1 h-3 w-3" />
                  Evidence Recording
                </Badge>
              </div>
            </motion.div>
          </div>
          <div className="flex items-center justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/">
                <Button
                  variant="destructive"
                  className="relative h-32 w-32 rounded-full text-xl font-bold shadow-lg after:absolute after:inset-0 after:rounded-full after:shadow-[0_0_15px_rgba(244,63,94,0.5)] after:animate-pulse bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
                >
                  <div className="flex flex-col items-center justify-center gap-2 relative z-10">
                    <AlertTriangle className="h-8 w-8" />
                    <span>SOS</span>
                  </div>
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="quick-access">Quick Access</TabsTrigger>
          <TabsTrigger value="broadcast">Emergency Broadcast</TabsTrigger>
          <TabsTrigger value="gestures">Custom Triggers</TabsTrigger>
        </TabsList>

        <TabsContent value="quick-access" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickTools.map((tool) => (
              <Link href={tool.link} key={tool.id}>
                <Card className="h-full cursor-pointer transition-all hover:border-primary/50 hover:shadow-md">
                  <CardHeader className={cn("rounded-t-lg", tool.color)}>
                    <div className="flex items-center gap-3">
                      {tool.icon}
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="mb-4 text-xl font-bold">Emergency Contacts</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {emergencyContacts.map((contact) => (
                <Card key={contact.id} className="border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                        <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{contact.name}</h4>
                        <p className="text-xs text-muted-foreground">{contact.relationship}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 gap-1">
                        <Phone className="h-3 w-3" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 gap-1">
                        <MessageSquare className="h-3 w-3" />
                        Text
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Link href="/contacts">
                <Card className="flex h-full cursor-pointer flex-col items-center justify-center border-dashed border-muted-foreground/30 p-6 text-center transition-all hover:border-primary/50">
                  <Phone className="mb-2 h-8 w-8 text-muted-foreground" />
                  <p className="font-medium">Manage Emergency Contacts</p>
                  <p className="text-xs text-muted-foreground">Add, edit or remove trusted contacts</p>
                </Card>
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="mb-4 text-xl font-bold">Additional Resources</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="border-primary/20">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="mb-3 rounded-full bg-primary/10 p-3">
                    <Flashlight className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-medium">Flashlight</h4>
                  <p className="text-xs text-muted-foreground">Quickly access your device's flashlight</p>
                </CardContent>
              </Card>
              <Card className="border-primary/20">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="mb-3 rounded-full bg-primary/10 p-3">
                    <SirenAlert className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-medium">Alarm Siren</h4>
                  <p className="text-xs text-muted-foreground">Loud alarm to deter threats</p>
                </CardContent>
              </Card>
              <Card className="border-primary/20">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="mb-3 rounded-full bg-primary/10 p-3">
                    <Volume2 className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-medium">Safety Audio</h4>
                  <p className="text-xs text-muted-foreground">Calming sounds for anxiety reduction</p>
                </CardContent>
              </Card>
              <Link href="/wellness">
                <Card className="cursor-pointer border-primary/20 transition-all hover:border-primary/50 hover:shadow-md">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <div className="mb-3 rounded-full bg-primary/10 p-3">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-medium">Wellness Tools</h4>
                    <p className="text-xs text-muted-foreground">Access breathing exercises and support</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="broadcast" className="mt-6">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Emergency Broadcast
              </CardTitle>
              <CardDescription>Send an emergency message to all your trusted contacts simultaneously</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-900/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  <div>
                    <h4 className="font-medium text-yellow-600 dark:text-yellow-400">Important</h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      Emergency broadcasts will be sent to all your trusted contacts with your current location. Use
                      this feature only in genuine emergency situations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="broadcast-message">Emergency Message</Label>
                <Input
                  id="broadcast-message"
                  placeholder="Enter your emergency message..."
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Your current location will be automatically included with this message
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-audio" className="flex items-center gap-2">
                    <Mic className="h-4 w-4 text-muted-foreground" />
                    Include Audio Recording
                  </Label>
                  <Switch id="include-audio" defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-photo" className="flex items-center gap-2">
                    <Camera className="h-4 w-4 text-muted-foreground" />
                    Include Photo
                  </Label>
                  <Switch id="include-photo" defaultChecked />
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h4 className="mb-2 font-medium">Recipients (5)</h4>
                <div className="flex flex-wrap gap-2">
                  {emergencyContacts.map((contact) => (
                    <Badge key={contact.id} variant="outline" className="bg-primary/10 text-primary">
                      {contact.name}
                      <X className="ml-1 h-3 w-3" />
                    </Badge>
                  ))}
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    Local Emergency Services
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    Guardian Network
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    Campus Security
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                </div>
              </div>

              {showBroadcastSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-900/20"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-green-100 p-1 dark:bg-green-900">
                      <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-green-600 dark:text-green-400">Broadcast Sent</h4>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Your emergency message has been sent to all your trusted contacts.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                className="w-full gap-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
                onClick={handleBroadcast}
                disabled={isBroadcasting || !broadcastMessage.trim()}
              >
                {isBroadcasting ? (
                  <>
                    <span className="animate-pulse">Sending Broadcast...</span>
                  </>
                ) : (
                  <>
                    <Bell className="h-4 w-4" />
                    Send Emergency Broadcast
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-6">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Broadcast History
                </CardTitle>
                <CardDescription>View your past emergency broadcasts and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border p-6 text-center">
                  <p className="text-muted-foreground">No broadcast history available</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="gestures" className="mt-6">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-primary" />
                Custom Trigger Gestures
              </CardTitle>
              <CardDescription>Configure custom gestures to quickly trigger emergency features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <p className="text-sm">
                  Custom triggers allow you to activate safety features discreetly without accessing your phone screen.
                  Configure the gestures below to match your preferences.
                </p>
              </div>

              <div className="space-y-4">
                {triggerGestures.map((gesture) => (
                  <div key={gesture.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <h4 className="font-medium">{gesture.name}</h4>
                      <p className="text-sm text-muted-foreground">{gesture.description}</p>
                      <Badge variant="outline" className="mt-2 bg-primary/10 text-primary">
                        {gesture.action}
                      </Badge>
                    </div>
                    <Switch checked={gesture.enabled} />
                  </div>
                ))}
              </div>

              <div className="rounded-lg border border-dashed border-muted-foreground/30 p-4 text-center">
                <Button variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Custom Gesture
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save Gesture Settings</Button>
            </CardFooter>
          </Card>

          <div className="mt-6">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="h-5 w-5 text-primary" />
                  Connectivity Settings
                </CardTitle>
                <CardDescription>Configure how triggers work when you lose connectivity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h4 className="font-medium">Offline Mode Triggers</h4>
                    <p className="text-sm text-muted-foreground">
                      Allow triggers to work even when device has no internet connection
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h4 className="font-medium">Low Battery Mode</h4>
                    <p className="text-sm text-muted-foreground">
                      Keep triggers active even when battery is critically low
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Link href="/signal-loss">
                  <Button variant="outline" className="w-full gap-2">
                    <WifiOff className="h-4 w-4" />
                    Configure Signal Loss Protocol
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Testimonial section */}
      <div className="mt-12 rounded-lg border border-primary/20 bg-primary/5 p-6 safety-glow">
        <div className="flex flex-col items-center text-center">
          <Quote className="mb-4 h-8 w-8 text-primary/40" />
          <p className="mb-4 text-lg italic">
            "The Emergency Toolkit saved my life when I was in a dangerous situation. With just one tap, I was able to
            alert my family and they knew exactly where to find me."
          </p>
          <Avatar className="mb-2 h-12 w-12 border-2 border-primary/20">
            <AvatarImage src="/placeholder.svg?height=100&width=100" alt="Sarah M." />
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <p className="font-medium">Sarah M.</p>
          <p className="text-sm text-muted-foreground">SafeNet User</p>
        </div>
      </div>
    </div>
  )
}
