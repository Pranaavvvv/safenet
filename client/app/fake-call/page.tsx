"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import {
  Bell,
  Check,
  Clock,
  Edit,
  ImageIcon,
  Mic,
  Phone,
  PhoneCall,
  PhoneIncoming,
  PhoneOff,
  Save,
  Timer,
  User,
  Volume2,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export default function FakeCallPage() {
  const [activeTab, setActiveTab] = useState("setup")
  const [callerName, setCallerName] = useState("Mom")
  const [callerImage, setCallerImage] = useState("/placeholder.svg?height=100&width=100")
  const [callDelay, setCallDelay] = useState(10)
  const [ringtoneVolume, setRingtoneVolume] = useState(80)
  const [vibration, setVibration] = useState(true)
  const [autoAnswer, setAutoAnswer] = useState(false)
  const [callDuration, setCallDuration] = useState(30)
  const [isCallActive, setIsCallActive] = useState(false)
  const [isCallIncoming, setIsCallIncoming] = useState(false)
  const [callTimer, setCallTimer] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedRingtone, setSelectedRingtone] = useState("default")
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  const handleStartFakeCall = () => {
    setActiveTab("preview")

    // Start the countdown for the incoming call
    timerRef.current = setTimeout(() => {
      setIsCallIncoming(true)

      // Play ringtone
      if (audioRef.current) {
        audioRef.current.volume = ringtoneVolume / 100
        audioRef.current.play()
      }

      // Auto-answer if enabled
      if (autoAnswer) {
        timerRef.current = setTimeout(() => {
          handleAnswerCall()
        }, 3000)
      }
    }, callDelay * 1000)
  }

  const handleAnswerCall = () => {
    setIsCallIncoming(false)
    setIsCallActive(true)

    if (audioRef.current) {
      audioRef.current.pause()
    }

    // Start call timer
    let seconds = 0
    timerRef.current = setInterval(() => {
      seconds++
      setCallTimer(seconds)

      if (seconds >= callDuration) {
        handleEndCall()
      }
    }, 1000)
  }

  const handleEndCall = () => {
    setIsCallActive(false)
    setIsCallIncoming(false)
    setCallTimer(0)

    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  const formatCallTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Fake Call Generator</h1>
        <p className="text-muted-foreground">Create realistic fake calls to help you in uncomfortable situations</p>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="setup" disabled={isCallIncoming || isCallActive}>
            Setup Call
          </TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Caller Information</CardTitle>
                <CardDescription>Customize who appears to be calling you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={callerImage || "/placeholder.svg"} alt={callerName} />
                    <AvatarFallback className="text-lg">{callerName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Label htmlFor="caller-name">Caller Name</Label>
                    <div className="relative">
                      <Input
                        id="caller-name"
                        value={callerName}
                        onChange={(e) => setCallerName(e.target.value)}
                        className="pr-10"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {isEditing && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3 rounded-lg border p-3"
                    >
                      <div className="text-sm font-medium">Select Caller Image</div>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          "/placeholder.svg?height=100&width=100",
                          "/placeholder.svg?height=100&width=100",
                          "/placeholder.svg?height=100&width=100",
                          "/placeholder.svg?height=100&width=100",
                        ].map((img, i) => (
                          <div
                            key={i}
                            className={cn(
                              "cursor-pointer overflow-hidden rounded-lg border-2 transition-all",
                              callerImage === img ? "border-primary" : "border-transparent hover:border-primary/50",
                            )}
                            onClick={() => setCallerImage(img)}
                          >
                            <img
                              src={img || "/placeholder.svg"}
                              alt={`Caller ${i + 1}`}
                              className="aspect-square h-full w-full object-cover"
                            />
                          </div>
                        ))}
                        <div className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/20 hover:border-primary/50">
                          <ImageIcon className="h-6 w-6 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button size="sm" className="gap-1" onClick={() => setIsEditing(false)}>
                          <Save className="h-3 w-3" />
                          Save
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-2">
                  <Label>Ringtone</Label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={selectedRingtone}
                    onChange={(e) => setSelectedRingtone(e.target.value)}
                  >
                    <option value="default">Default Ringtone</option>
                    <option value="classic">Classic Phone</option>
                    <option value="digital">Digital</option>
                    <option value="marimba">Marimba (iPhone)</option>
                    <option value="samsung">Over the Horizon (Samsung)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Ringtone Volume</Label>
                    <span className="text-sm">{ringtoneVolume}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                    <Slider
                      defaultValue={[ringtoneVolume]}
                      max={100}
                      step={1}
                      onValueChange={(value) => setRingtoneVolume(value[0])}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="vibration" className="text-sm font-medium">
                      Vibration
                    </Label>
                  </div>
                  <Switch id="vibration" checked={vibration} onCheckedChange={setVibration} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Call Settings</CardTitle>
                <CardDescription>Configure how the fake call behaves</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Call Delay</Label>
                    <span className="text-sm">{callDelay} seconds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <Slider
                      defaultValue={[callDelay]}
                      min={5}
                      max={60}
                      step={5}
                      onValueChange={(value) => setCallDelay(value[0])}
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">The call will start ringing after {callDelay} seconds</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Call Duration</Label>
                    <span className="text-sm">{callDuration} seconds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Timer className="h-4 w-4 text-muted-foreground" />
                    <Slider
                      defaultValue={[callDuration]}
                      min={15}
                      max={120}
                      step={15}
                      onValueChange={(value) => setCallDuration(value[0])}
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    The call will automatically end after {callDuration} seconds
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-answer" className="font-medium">
                      Auto-Answer
                    </Label>
                    <p className="text-xs text-muted-foreground">Automatically answer the call after a few rings</p>
                  </div>
                  <Switch id="auto-answer" checked={autoAnswer} onCheckedChange={setAutoAnswer} />
                </div>

                <div className="rounded-lg border p-3">
                  <h3 className="mb-2 text-sm font-medium">Quick Presets</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCallerName("Mom")
                        setCallDelay(10)
                        setCallDuration(60)
                      }}
                    >
                      Mom Calling
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCallerName("Boss")
                        setCallDelay(15)
                        setCallDuration(45)
                      }}
                    >
                      Work Call
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCallerName("Emergency")
                        setCallDelay(5)
                        setCallDuration(30)
                        setRingtoneVolume(100)
                      }}
                    >
                      Emergency
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCallerName("Unknown")
                        setCallDelay(20)
                        setCallDuration(30)
                      }}
                    >
                      Unknown Number
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-2" onClick={handleStartFakeCall}>
                  <PhoneCall className="h-4 w-4" />
                  Start Fake Call
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="mt-6">
          <div className="mx-auto max-w-md">
            <Card className="overflow-hidden">
              <div className="relative bg-gradient-to-b from-primary/20 to-background p-6">
                <div className="absolute right-4 top-4">
                  {!isCallIncoming && !isCallActive && (
                    <div className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                      {callDelay > 0 ? `Call in ${callDelay}s` : "Ready to ring"}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-center">
                  <Avatar className="mb-4 h-24 w-24 border-4 border-background">
                    <AvatarImage src={callerImage || "/placeholder.svg"} alt={callerName} />
                    <AvatarFallback className="text-3xl">{callerName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="mb-1 text-2xl font-bold">{callerName}</h2>
                  {isCallIncoming && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <PhoneIncoming className="h-3 w-3" />
                      <span>Incoming call</span>
                    </div>
                  )}
                  {isCallActive && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{formatCallTime(callTimer)}</span>
                    </div>
                  )}
                </div>
              </div>

              {isCallIncoming && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6">
                  <div className="mb-8 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
                    >
                      <Phone className="h-8 w-8 text-primary" />
                    </motion.div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center">
                      <motion.div
                        whileTap={{ scale: 0.95 }}
                        className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white shadow-lg"
                        onClick={handleEndCall}
                      >
                        <PhoneOff className="h-6 w-6" />
                      </motion.div>
                      <span className="text-sm">Decline</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <motion.div
                        whileTap={{ scale: 0.95 }}
                        className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg"
                        onClick={handleAnswerCall}
                      >
                        <Phone className="h-6 w-6" />
                      </motion.div>
                      <span className="text-sm">Answer</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {isCallActive && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center">
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                        <Mic className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <span className="text-xs">Mute</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                        <Volume2 className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <span className="text-xs">Speaker</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <span className="text-xs">Contacts</span>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white shadow-lg"
                      onClick={handleEndCall}
                    >
                      <PhoneOff className="h-6 w-6" />
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {!isCallIncoming && !isCallActive && (
                <CardContent className="p-6">
                  <div className="mb-4 rounded-lg border p-3 text-center">
                    <p className="text-sm">
                      {callDelay > 0
                        ? `Your fake call will start ringing in ${callDelay} seconds`
                        : "Press the button below to start the fake call immediately"}
                    </p>
                  </div>
                  <div className="flex justify-center gap-4">
                    <Button variant="outline" onClick={() => setActiveTab("setup")}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Settings
                    </Button>
                    <Button onClick={handleStartFakeCall}>
                      <PhoneCall className="mr-2 h-4 w-4" />
                      Call Now
                    </Button>
                  </div>
                </CardContent>
              )}

              <CardFooter className="border-t bg-muted/20 p-3">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-muted-foreground">Realistic call simulation</span>
                  </div>
                  {!isCallIncoming && !isCallActive && (
                    <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setActiveTab("setup")}>
                      <X className="mr-1 h-3 w-3" />
                      Cancel
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Hidden audio element for ringtone */}
          <audio
            ref={audioRef}
            src="/ringtone.mp3" // This would be a real ringtone file in a production app
            loop
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
