"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  AlertTriangle,
  Battery,
  Clock,
  MapPin,
  Phone,
  Power,
  RefreshCw,
  Settings,
  Signal,
  Smartphone,
  Wifi,
  WifiOff,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export default function SignalLossPage() {
  const [connectionStatus, setConnectionStatus] = useState<"online" | "offline" | "weak">("online")
  const [batteryLevel, setBatteryLevel] = useState(78)
  const [lastSeen, setLastSeen] = useState(new Date())
  const [showOfflineAlert, setShowOfflineAlert] = useState(false)
  const [offlineSosEnabled, setOfflineSosEnabled] = useState(true)
  const [lowBatteryMode, setLowBatteryMode] = useState(true)
  const [activeTab, setActiveTab] = useState("status")
  const [signalStrength, setSignalStrength] = useState(4)

  // Simulate connection changes
  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.random()
      if (random < 0.1) {
        setConnectionStatus("offline")
        setShowOfflineAlert(true)
        setLastSeen(new Date())
      } else if (random < 0.3) {
        setConnectionStatus("weak")
      } else {
        setConnectionStatus("online")
      }

      // Simulate battery drain
      setBatteryLevel((prev) => Math.max(prev - Math.floor(Math.random() * 2), 5))

      // Simulate signal strength changes
      if (connectionStatus !== "offline") {
        setSignalStrength(Math.max(1, Math.floor(Math.random() * 5)))
      } else {
        setSignalStrength(0)
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [connectionStatus])

  const formatLastSeen = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return "Just now"
    if (diffMins === 1) return "1 minute ago"
    if (diffMins < 60) return `${diffMins} minutes ago`

    const diffHours = Math.floor(diffMins / 60)
    if (diffHours === 1) return "1 hour ago"
    if (diffHours < 24) return `${diffHours} hours ago`

    const diffDays = Math.floor(diffHours / 24)
    if (diffDays === 1) return "Yesterday"
    return `${diffDays} days ago`
  }

  const getBatteryColor = () => {
    if (batteryLevel <= 20) return "text-red-500"
    if (batteryLevel <= 40) return "text-yellow-500"
    return "text-green-500"
  }

  const getConnectionStatusColor = () => {
    if (connectionStatus === "offline") return "text-red-500"
    if (connectionStatus === "weak") return "text-yellow-500"
    return "text-green-500"
  }

  const getConnectionStatusText = () => {
    if (connectionStatus === "offline") return "Offline"
    if (connectionStatus === "weak") return "Weak Connection"
    return "Online"
  }

  const renderSignalBars = () => {
    return (
      <div className="flex h-4 items-end gap-[2px]">
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className={cn(
              "w-1 rounded-sm transition-all duration-300",
              bar <= signalStrength ? "bg-green-500 dark:bg-green-400" : "bg-gray-200 dark:bg-gray-700",
              bar === 1 ? "h-1" : bar === 2 ? "h-2" : bar === 3 ? "h-3" : "h-4",
            )}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Signal Loss Protocol</h1>
        <p className="text-muted-foreground">Stay safe even when your connection drops</p>
      </div>

      <AnimatePresence>
        {showOfflineAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 shadow-lg dark:border-red-900 dark:bg-red-900/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300">
                  <WifiOff className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Connection Lost</h3>
                  <p className="text-sm">
                    Your device lost connection. Offline SOS mode is {offlineSosEnabled ? "enabled" : "disabled"}.
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setShowOfflineAlert(false)}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Connection Status</CardTitle>
            <CardDescription>Your device's current connection status and last seen information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                {connectionStatus === "online" ? (
                  <Wifi className="h-5 w-5 text-green-500" />
                ) : connectionStatus === "weak" ? (
                  <Signal className="h-5 w-5 text-yellow-500" />
                ) : (
                  <WifiOff className="h-5 w-5 text-red-500" />
                )}
                <div>
                  <h3 className="font-medium">Network Status</h3>
                  <p className={cn("text-sm", getConnectionStatusColor())}>{getConnectionStatusText()}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="mb-1 text-sm font-medium">Signal Strength</div>
                {renderSignalBars()}
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">Last Seen</h3>
                    <p className="text-sm text-muted-foreground">{formatLastSeen(lastSeen)}</p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    connectionStatus === "online"
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : connectionStatus === "weak"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                        : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
                  )}
                >
                  {connectionStatus === "online"
                    ? "Active Now"
                    : connectionStatus === "weak"
                      ? "Weak Signal"
                      : "Offline"}
                </Badge>
              </div>

              <div className="relative h-32 w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                <div className="h-full w-full bg-[url('/placeholder.svg?height=150&width=400')] bg-cover bg-center">
                  <div className="absolute bottom-2 right-2 rounded-md bg-background/80 px-2 py-1 text-xs backdrop-blur-sm">
                    Last known location
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Battery className={cn("h-5 w-5", getBatteryColor())} />
                  <div>
                    <h3 className="font-medium">Battery Status</h3>
                    <p className="text-sm text-muted-foreground">
                      {batteryLevel <= 20 ? "Low Battery" : batteryLevel <= 40 ? "Moderate" : "Good"}
                    </p>
                  </div>
                </div>
                <span className={cn("text-lg font-bold", getBatteryColor())}>{batteryLevel}%</span>
              </div>
              <Progress
                value={batteryLevel}
                className={cn(
                  "h-2",
                  batteryLevel <= 20
                    ? "bg-red-200 dark:bg-red-950"
                    : batteryLevel <= 40
                      ? "bg-yellow-200 dark:bg-yellow-950"
                      : "bg-green-200 dark:bg-green-950",
                )}
              />
              {batteryLevel <= 20 && (
                <p className="mt-2 text-xs text-red-500">
                  Warning: Low battery may affect emergency features. Please charge your device.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Offline SOS Settings</CardTitle>
              <CardDescription>Configure how your device behaves during signal loss</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="status">Status</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="status" className="space-y-4 pt-4">
                  <div
                    className={cn(
                      "flex items-center justify-between rounded-lg border p-4",
                      offlineSosEnabled
                        ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20"
                        : "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-900/20",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full",
                          offlineSosEnabled
                            ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                            : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300",
                        )}
                      >
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Offline SOS</h3>
                        <p className="text-sm">
                          {offlineSosEnabled
                            ? "Ready to send emergency alerts even without connection"
                            : "Disabled - Enable for offline emergency alerts"}
                        </p>
                      </div>
                    </div>
                    <Switch checked={offlineSosEnabled} onCheckedChange={setOfflineSosEnabled} />
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 font-medium">How to Trigger Offline SOS</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          1
                        </div>
                        <p className="text-sm">
                          Press the power button 5 times in quick succession to activate emergency mode
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          2
                        </div>
                        <p className="text-sm">
                          Hold volume up + power for 3 seconds to send your last known location to emergency contacts
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          3
                        </div>
                        <p className="text-sm">
                          When connection is restored, all pending alerts will be sent automatically
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Last Known Location</h3>
                    </div>
                    <p className="mb-2 text-sm">
                      Your last location is cached and will be shared with emergency contacts if needed
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Updated: {formatLastSeen(lastSeen)}</span>
                      <Button variant="outline" size="sm" className="h-8 text-xs">
                        Update Now
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4 pt-4">
                  <div className="space-y-4 rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="offline-sos" className="font-medium">
                          Offline SOS Mode
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Enable emergency features when device loses connection
                        </p>
                      </div>
                      <Switch id="offline-sos" checked={offlineSosEnabled} onCheckedChange={setOfflineSosEnabled} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="low-battery" className="font-medium">
                          Low Battery Mode
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Preserve battery for emergency features when battery is low
                        </p>
                      </div>
                      <Switch id="low-battery" checked={lowBatteryMode} onCheckedChange={setLowBatteryMode} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="location-cache" className="font-medium">
                          Location Caching
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Store location data when offline for emergency use
                        </p>
                      </div>
                      <Switch id="location-cache" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="auto-reconnect" className="font-medium">
                          Auto-Reconnect
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Automatically try to restore connection when lost
                        </p>
                      </div>
                      <Switch id="auto-reconnect" defaultChecked />
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="mb-3 font-medium">Offline SOS Trigger Method</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="power-button" name="trigger-method" defaultChecked />
                        <Label htmlFor="power-button" className="text-sm">
                          Power button (press 5 times)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="volume-power" name="trigger-method" />
                        <Label htmlFor="volume-power" className="text-sm">
                          Volume up + Power button
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="custom-gesture" name="trigger-method" />
                        <Label htmlFor="custom-gesture" className="text-sm">
                          Custom gesture
                        </Label>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="border-t p-4">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-muted-foreground">Test your offline SOS regularly</span>
                </div>
                <Button variant="outline" size="sm" className="gap-1">
                  <Settings className="h-3 w-3" />
                  Advanced
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Device Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="mb-4 flex h-32 w-20 flex-col items-center justify-center rounded-xl border-2 border-primary/20 bg-background p-2 shadow-md">
                  <motion.div
                    animate={{
                      opacity: connectionStatus === "offline" ? [1, 0.5, 1] : 1,
                    }}
                    transition={{ duration: 2, repeat: connectionStatus === "offline" ? Number.POSITIVE_INFINITY : 0 }}
                    className="mb-2 flex h-3 w-12 items-center justify-center rounded-sm bg-primary/10"
                  >
                    <div className="h-1 w-3 rounded-sm bg-primary" />
                  </motion.div>
                  <div className="flex h-20 w-full flex-col items-center justify-center rounded-lg border border-primary/20 bg-background">
                    <Smartphone className="h-8 w-8 text-primary/50" />
                    {connectionStatus === "offline" ? (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        className="mt-2 h-2 w-2 rounded-full bg-red-500"
                      />
                    ) : (
                      <div className="mt-2 h-2 w-2 rounded-full bg-green-500" />
                    )}
                  </div>
                  <motion.div
                    animate={{
                      opacity: connectionStatus === "offline" ? [1, 0.5, 1] : 1,
                    }}
                    transition={{ duration: 2, repeat: connectionStatus === "offline" ? Number.POSITIVE_INFINITY : 0 }}
                    className="mt-2 flex h-3 w-12 items-center justify-center rounded-sm bg-primary/10"
                  >
                    <div className="h-1 w-3 rounded-sm bg-primary" />
                  </motion.div>
                </div>

                <div className="grid w-full grid-cols-2 gap-2">
                  <div className="rounded-lg border p-2 text-center">
                    <div className="text-xs text-muted-foreground">Network</div>
                    <div className="flex items-center justify-center gap-1">
                      {connectionStatus === "online" ? (
                        <Wifi className="h-4 w-4 text-green-500" />
                      ) : connectionStatus === "weak" ? (
                        <Signal className="h-4 w-4 text-yellow-500" />
                      ) : (
                        <WifiOff className="h-4 w-4 text-red-500" />
                      )}
                      <span className="text-sm font-medium">{getConnectionStatusText()}</span>
                    </div>
                  </div>

                  <div className="rounded-lg border p-2 text-center">
                    <div className="text-xs text-muted-foreground">Power</div>
                    <div className="flex items-center justify-center gap-1">
                      <Power className={cn("h-4 w-4", getBatteryColor())} />
                      <span className="text-sm font-medium">{batteryLevel}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <Button variant="outline" className="w-full gap-1">
                <RefreshCw className="h-4 w-4" />
                Refresh Status
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
