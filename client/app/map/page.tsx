"use client"

import { useState, useEffect } from "react"
import MapView from "@/components/map-view"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, MapPin, Shield } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function MapPage() {
  const [activeTab, setActiveTab] = useState("map")
  const [showLegend, setShowLegend] = useState(true)
  const [filters, setFilters] = useState({
    safeZones: true,
    cautionAreas: true,
    dangerZones: true,
    recentReports: true,
  })

  // Simulate loading map markers
  const [loadingMarkers, setLoadingMarkers] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingMarkers(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const toggleFilter = (filter: keyof typeof filters) => {
    setFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }))
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex flex-col gap-2"
      >
        <h1 className="text-3xl font-bold">Safety Map</h1>
        <p className="text-muted-foreground">View safety markers and share your location with trusted contacts</p>
      </motion.div>

      <Tabs defaultValue="map" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <TabsList className="mb-4 grid w-full grid-cols-2">
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="share">Location Sharing</TabsTrigger>
          </TabsList>
        </motion.div>

        <TabsContent value="map" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:col-span-3"
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <MapView />

                  {/* Map loading overlay */}
                  {loadingMarkers && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                      <div className="flex flex-col items-center">
                        <div className="mb-4 flex items-center justify-center">
                          <motion.div
                            animate={{
                              scale: [1, 1.2, 1],
                              rotate: [0, 180, 360],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut",
                            }}
                            className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent"
                          />
                        </div>
                        <p className="text-sm font-medium">Loading safety data...</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
              <motion.div variants={item}>
                <Card
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    showLegend ? "opacity-100" : "opacity-70 hover:opacity-100",
                  )}
                >
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Legend</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() => setShowLegend(!showLegend)}
                    >
                      {showLegend ? "-" : "+"}
                    </Button>
                  </CardHeader>

                  {showLegend && (
                    <CardContent className="space-y-2">
                      <motion.div variants={item} className="flex items-center gap-2">
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        >
                          <Shield className="h-3 w-3" />
                        </motion.div>
                        <span className="text-xs">Safe Zone</span>
                      </motion.div>

                      <motion.div variants={item} className="flex items-center gap-2">
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                        >
                          <AlertTriangle className="h-3 w-3" />
                        </motion.div>
                        <span className="text-xs">Caution Area</span>
                      </motion.div>

                      <motion.div variants={item} className="flex items-center gap-2">
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                        >
                          <AlertTriangle className="h-3 w-3" />
                        </motion.div>
                        <span className="text-xs">Danger Zone</span>
                      </motion.div>

                      <motion.div variants={item} className="flex items-center gap-2">
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                        >
                          <MapPin className="h-3 w-3" />
                        </motion.div>
                        <span className="text-xs">Your Location</span>
                      </motion.div>
                    </CardContent>
                  )}
                </Card>
              </motion.div>

              <motion.div variants={item}>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Filters</CardTitle>
                    <CardDescription className="text-xs">Show or hide map markers</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <motion.div whileHover={{ x: 5 }} className="flex items-center justify-between">
                      <span className="text-xs">Safe Zones</span>
                      <Button
                        variant={filters.safeZones ? "default" : "outline"}
                        size="sm"
                        className={cn(
                          "h-7 text-xs transition-all",
                          filters.safeZones && "bg-green-600 hover:bg-green-700",
                        )}
                        onClick={() => toggleFilter("safeZones")}
                      >
                        {filters.safeZones ? "Showing" : "Hidden"}
                      </Button>
                    </motion.div>

                    <motion.div whileHover={{ x: 5 }} className="flex items-center justify-between">
                      <span className="text-xs">Caution Areas</span>
                      <Button
                        variant={filters.cautionAreas ? "default" : "outline"}
                        size="sm"
                        className={cn(
                          "h-7 text-xs transition-all",
                          filters.cautionAreas && "bg-yellow-600 hover:bg-yellow-700",
                        )}
                        onClick={() => toggleFilter("cautionAreas")}
                      >
                        {filters.cautionAreas ? "Showing" : "Hidden"}
                      </Button>
                    </motion.div>

                    <motion.div whileHover={{ x: 5 }} className="flex items-center justify-between">
                      <span className="text-xs">Danger Zones</span>
                      <Button
                        variant={filters.dangerZones ? "default" : "outline"}
                        size="sm"
                        className={cn(
                          "h-7 text-xs transition-all",
                          filters.dangerZones && "bg-red-600 hover:bg-red-700",
                        )}
                        onClick={() => toggleFilter("dangerZones")}
                      >
                        {filters.dangerZones ? "Showing" : "Hidden"}
                      </Button>
                    </motion.div>

                    <motion.div whileHover={{ x: 5 }} className="flex items-center justify-between">
                      <span className="text-xs">Recent Reports</span>
                      <Button
                        variant={filters.recentReports ? "default" : "outline"}
                        size="sm"
                        className={cn(
                          "h-7 text-xs transition-all",
                          filters.recentReports && "bg-blue-600 hover:bg-blue-700",
                        )}
                        onClick={() => toggleFilter("recentReports")}
                      >
                        {filters.recentReports ? "Showing" : "Hidden"}
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="share" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>Real-time Location Sharing</CardTitle>
                <CardDescription>Share your location with trusted contacts for a specific duration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="rounded-lg border p-4"
                >
                  <p className="mb-2 text-sm font-medium">Current Status</p>
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="h-3 w-3 rounded-full bg-green-500"
                    />
                    <p className="text-sm">Location sharing is active</p>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Your location is being shared with 3 trusted contacts
                  </p>
                </motion.div>

                <div className="grid gap-4 md:grid-cols-2">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="default" className="w-full">
                      Share Location for 1 Hour
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" className="w-full">
                      Stop Sharing
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
