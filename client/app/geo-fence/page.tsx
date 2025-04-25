"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  AlertTriangle,
  Bell,
  ChevronDown,
  Home,
  Layers,
  MapPin,
  Plus,
  Save,
  Search,
  Settings,
  Shield,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export default function GeoFencePage() {
  const [activeTab, setActiveTab] = useState("map")
  const [searchQuery, setSearchQuery] = useState("")
  const [isInSafeZone, setIsInSafeZone] = useState(true)
  const [showZoneAlert, setShowZoneAlert] = useState(false)
  const [zoneRadius, setZoneRadius] = useState(300)
  const [mapZoom, setMapZoom] = useState(15)
  const [showAddZoneForm, setShowAddZoneForm] = useState(false)
  const [autoAlerts, setAutoAlerts] = useState(true)
  const mapRef = useRef<HTMLDivElement>(null)

  // Simulate entering/exiting zones
  useEffect(() => {
    const interval = setInterval(() => {
      const newStatus = Math.random() > 0.7
      if (newStatus !== isInSafeZone) {
        setIsInSafeZone(newStatus)
        setShowZoneAlert(true)
        setTimeout(() => setShowZoneAlert(false), 5000)
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [isInSafeZone])

  // Simulate map loading
  useEffect(() => {
    if (mapRef.current) {
      // For demo purposes, we'll just show a static map
      const mapElement = mapRef.current
      mapElement.style.backgroundImage = "url('/placeholder.svg?height=600&width=800')"
      mapElement.style.backgroundSize = "cover"
      mapElement.style.backgroundPosition = "center"
    }
  }, [])

  const handleZoneRadiusChange = (value: number[]) => {
    setZoneRadius(value[0])
  }

  const handleMapZoomChange = (value: number[]) => {
    setMapZoom(value[0])
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Geo-Fenced Zones</h1>
        <p className="text-muted-foreground">Create safe and danger zones with automatic alerts</p>
      </div>

      <AnimatePresence>
        {showZoneAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "mb-6 rounded-lg border p-4 shadow-lg",
              isInSafeZone
                ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20"
                : "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-900/20",
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isInSafeZone ? (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
                    <Shield className="h-5 w-5" />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                )}
                <div>
                  <h3 className="font-medium">{isInSafeZone ? "Entered Safe Zone" : "Warning: Entered Danger Zone"}</h3>
                  <p className="text-sm">
                    {isInSafeZone
                      ? "You are now in a designated safe area"
                      : "You have entered an area marked as potentially unsafe"}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setShowZoneAlert(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="overflow-hidden">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex items-center justify-between border-b px-4">
                <TabsList className="my-2">
                  <TabsTrigger value="map">Map View</TabsTrigger>
                  <TabsTrigger value="list">Zone List</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setMapZoom(Math.min(mapZoom + 1, 20))}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setMapZoom(Math.max(mapZoom - 1, 10))}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Layers className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <TabsContent value="map" className="m-0">
                <div className="relative h-[500px] w-full overflow-hidden">
                  <div ref={mapRef} className="h-full w-full" />

                  {/* Simulated Safe Zone */}
                  <div
                    className="absolute left-1/4 top-1/3 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-green-500/50"
                    style={{
                      width: `${zoneRadius}px`,
                      height: `${zoneRadius}px`,
                      background: "radial-gradient(circle, rgba(34,197,94,0.2) 0%, rgba(34,197,94,0) 70%)",
                      boxShadow: "0 0 20px rgba(34,197,94,0.3)",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-green-500/30"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </div>

                  {/* Simulated Danger Zone */}
                  <div
                    className="absolute right-1/4 top-2/3 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-red-500/50"
                    style={{
                      width: `${zoneRadius * 0.8}px`,
                      height: `${zoneRadius * 0.8}px`,
                      background: "radial-gradient(circle, rgba(239,68,68,0.2) 0%, rgba(239,68,68,0) 70%)",
                      boxShadow: "0 0 20px rgba(239,68,68,0.3)",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-red-500/30"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </div>

                  {/* Current Location Marker */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="relative">
                      <div className="absolute -inset-4 rounded-full bg-blue-500/20 animate-ping" />
                      <div className="relative h-4 w-4 rounded-full bg-blue-500 ring-4 ring-blue-500/50" />
                    </div>
                  </motion.div>
                </div>
              </TabsContent>

              <TabsContent value="list" className="m-0 max-h-[500px] overflow-y-auto">
                <div className="divide-y">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
                        <Home className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Home</h3>
                        <p className="text-sm text-muted-foreground">123 Main Street</p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    >
                      Safe Zone
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Work</h3>
                        <p className="text-sm text-muted-foreground">456 Office Plaza</p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    >
                      Safe Zone
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Downtown Alley</h3>
                        <p className="text-sm text-muted-foreground">789 Back Street</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
                      Danger Zone
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Subway Station</h3>
                        <p className="text-sm text-muted-foreground">Central Line</p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                    >
                      Caution Zone
                    </Badge>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Zone Settings</CardTitle>
              <CardDescription>Configure your geo-fenced zones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search for a location..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Zone Radius</Label>
                  <span className="text-sm">{zoneRadius}m</span>
                </div>
                <Slider
                  defaultValue={[zoneRadius]}
                  min={50}
                  max={1000}
                  step={10}
                  onValueChange={handleZoneRadiusChange}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Map Zoom</Label>
                  <span className="text-sm">{mapZoom}x</span>
                </div>
                <Slider defaultValue={[mapZoom]} min={10} max={20} step={1} onValueChange={handleMapZoomChange} />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-primary" />
                  <Label htmlFor="auto-alerts" className="text-sm font-medium">
                    Automatic Zone Alerts
                  </Label>
                </div>
                <Switch id="auto-alerts" checked={autoAlerts} onCheckedChange={setAutoAlerts} />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-2" onClick={() => setShowAddZoneForm(!showAddZoneForm)}>
                <Plus className="h-4 w-4" />
                Add New Zone
              </Button>
            </CardFooter>
          </Card>

          <AnimatePresence>
            {showAddZoneForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Add New Zone</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="zone-name">Zone Name</Label>
                      <Input id="zone-name" placeholder="E.g., Home, Work, School" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zone-address">Address</Label>
                      <Input id="zone-address" placeholder="Enter address or drop pin on map" />
                    </div>

                    <div className="space-y-2">
                      <Label>Zone Type</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          variant="outline"
                          className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 dark:border-green-900 dark:bg-green-900/20 dark:text-green-300 dark:hover:bg-green-900/30"
                        >
                          Safe
                        </Button>
                        <Button
                          variant="outline"
                          className="border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 hover:text-yellow-800 dark:border-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-300 dark:hover:bg-yellow-900/30"
                        >
                          Caution
                        </Button>
                        <Button
                          variant="outline"
                          className="border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800 dark:border-red-900 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/30"
                        >
                          Danger
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => setShowAddZoneForm(false)}>
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                    <Button className="flex-1">
                      <Save className="mr-2 h-4 w-4" />
                      Save Zone
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="h-4 w-4" />
                Advanced Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notify-entry" className="text-sm">
                  Notify on zone entry
                </Label>
                <Switch id="notify-entry" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notify-exit" className="text-sm">
                  Notify on zone exit
                </Label>
                <Switch id="notify-exit" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="background-tracking" className="text-sm">
                  Background tracking
                </Label>
                <Switch id="background-tracking" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="share-zones" className="text-sm">
                  Share zones with trusted contacts
                </Label>
                <Switch id="share-zones" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
