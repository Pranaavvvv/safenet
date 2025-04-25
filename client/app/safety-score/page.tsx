"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import {
  AlertTriangle,
  Calendar,
  Clock,
  Info,
  MapPin,
  Moon,
  Search,
  Share2,
  Star,
  Sun,
  ThumbsUp,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export default function SafetyScorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("map")
  const [timeOfDay, setTimeOfDay] = useState<"morning" | "afternoon" | "evening" | "night">("afternoon")
  const [safetyScore, setSafetyScore] = useState(4.2)
  const [showLocationDetails, setShowLocationDetails] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [timeSliderValue, setTimeSliderValue] = useState(14) // 2 PM
  const mapRef = useRef<HTMLDivElement>(null)

  // Sample safety data
  const safetyData = {
    morning: 4.8,
    afternoon: 4.2,
    evening: 3.5,
    night: 2.7,
  }

  const safetyFactors = [
    { name: "Street Lighting", score: 3.8, weight: "High" },
    { name: "Police Presence", score: 4.2, weight: "Medium" },
    { name: "Reported Incidents", score: 2.5, weight: "High" },
    { name: "Pedestrian Traffic", score: 4.0, weight: "Medium" },
    { name: "Public Transportation", score: 4.5, weight: "Low" },
  ]

  const nearbyLocations = [
    { name: "Central Park", score: 4.5, distance: "0.5 miles" },
    { name: "Downtown Mall", score: 3.8, distance: "0.8 miles" },
    { name: "University Campus", score: 4.7, distance: "1.2 miles" },
    { name: "Subway Station", score: 3.2, distance: "0.3 miles" },
  ]

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

  // Update safety score based on time of day
  useEffect(() => {
    setSafetyScore(safetyData[timeOfDay])
  }, [timeOfDay])

  // Update time of day based on slider
  useEffect(() => {
    if (timeSliderValue >= 6 && timeSliderValue < 12) {
      setTimeOfDay("morning")
    } else if (timeSliderValue >= 12 && timeSliderValue < 17) {
      setTimeOfDay("afternoon")
    } else if (timeSliderValue >= 17 && timeSliderValue < 21) {
      setTimeOfDay("evening")
    } else {
      setTimeOfDay("night")
    }
  }, [timeSliderValue])

  const handleTimeSliderChange = (value: number[]) => {
    setTimeSliderValue(value[0])
  }

  const formatTimeFromHour = (hour: number) => {
    if (hour === 0) return "12 AM"
    if (hour === 12) return "12 PM"
    return hour < 12 ? `${hour} AM` : `${hour - 12} PM`
  }

  const getSafetyColor = (score: number) => {
    if (score >= 4.5) return "text-green-500"
    if (score >= 3.5) return "text-green-400"
    if (score >= 2.5) return "text-yellow-500"
    return "text-red-500"
  }

  const getSafetyText = (score: number) => {
    if (score >= 4.5) return "Very Safe"
    if (score >= 3.5) return "Safe"
    if (score >= 2.5) return "Use Caution"
    return "Unsafe"
  }

  const getSafetyProgressColor = (score: number) => {
    if (score >= 4.5) return "bg-green-500"
    if (score >= 3.5) return "bg-green-400"
    if (score >= 2.5) return "bg-yellow-500"
    return "bg-red-500"
  }

  const renderStars = (score: number) => {
    const fullStars = Math.floor(score)
    const hasHalfStar = score - fullStars >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star className="h-4 w-4 text-muted" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="h-4 w-4 text-muted" />
        ))}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Safety Score</h1>
        <p className="text-muted-foreground">Explore safety ratings for different areas and times</p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search for a location..."
            className="pl-10 pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <MapPin className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="overflow-hidden">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex items-center justify-between border-b px-4">
                <TabsList className="my-2">
                  <TabsTrigger value="map">Map View</TabsTrigger>
                  <TabsTrigger value="list">Nearby Areas</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="gap-1 text-xs">
                    <Share2 className="h-3 w-3" />
                    Share
                  </Button>
                </div>
              </div>

              <TabsContent value="map" className="m-0">
                <div className="relative h-[500px] w-full overflow-hidden">
                  <div ref={mapRef} className="h-full w-full" />

                  {/* Heat map overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        timeOfDay === "morning"
                          ? "radial-gradient(circle at 50% 50%, rgba(34,197,94,0.3) 0%, rgba(34,197,94,0.1) 50%, rgba(239,68,68,0.1) 100%)"
                          : timeOfDay === "afternoon"
                            ? "radial-gradient(circle at 50% 50%, rgba(34,197,94,0.3) 0%, rgba(234,179,8,0.2) 70%, rgba(239,68,68,0.1) 100%)"
                            : timeOfDay === "evening"
                              ? "radial-gradient(circle at 50% 50%, rgba(234,179,8,0.3) 0%, rgba(234,179,8,0.2) 50%, rgba(239,68,68,0.2) 100%)"
                              : "radial-gradient(circle at 50% 50%, rgba(234,179,8,0.2) 0%, rgba(239,68,68,0.3) 70%, rgba(239,68,68,0.4) 100%)",
                    }}
                  />

                  {/* Safety score indicators */}
                  <div className="absolute left-1/4 top-1/3 z-10">
                    <motion.div
                      className="flex flex-col items-center"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => {
                        setSelectedLocation("Downtown")
                        setShowLocationDetails(true)
                      }}
                    >
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-green-500 text-white shadow-lg",
                          timeOfDay === "night" && "bg-yellow-500",
                        )}
                      >
                        <span className="text-sm font-bold">4.7</span>
                      </div>
                      <div className="mt-1 rounded-md bg-background/80 px-2 py-1 text-xs backdrop-blur-sm">
                        Downtown
                      </div>
                    </motion.div>
                  </div>

                  <div className="absolute right-1/4 top-1/2 z-10">
                    <motion.div
                      className="flex flex-col items-center"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => {
                        setSelectedLocation("Riverside")
                        setShowLocationDetails(true)
                      }}
                    >
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-green-400 text-white shadow-lg",
                          timeOfDay === "evening" && "bg-yellow-500",
                          timeOfDay === "night" && "bg-red-500",
                        )}
                      >
                        <span className="text-sm font-bold">3.8</span>
                      </div>
                      <div className="mt-1 rounded-md bg-background/80 px-2 py-1 text-xs backdrop-blur-sm">
                        Riverside
                      </div>
                    </motion.div>
                  </div>

                  <div className="absolute bottom-1/4 left-1/3 z-10">
                    <motion.div
                      className="flex flex-col items-center"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => {
                        setSelectedLocation("Station Area")
                        setShowLocationDetails(true)
                      }}
                    >
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-yellow-500 text-white shadow-lg",
                          timeOfDay === "night" && "bg-red-500",
                        )}
                      >
                        <span className="text-sm font-bold">3.2</span>
                      </div>
                      <div className="mt-1 rounded-md bg-background/80 px-2 py-1 text-xs backdrop-blur-sm">
                        Station Area
                      </div>
                    </motion.div>
                  </div>

                  {/* Current location marker */}
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

                  {/* Time slider */}
                  <div className="absolute bottom-4 left-1/2 z-10 w-4/5 -translate-x-1/2 rounded-lg bg-background/80 p-4 backdrop-blur-sm">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Time of Day</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {timeOfDay === "morning" || timeOfDay === "afternoon" ? (
                          <Sun className="h-4 w-4 text-yellow-500" />
                        ) : (
                          <Moon className="h-4 w-4 text-blue-500" />
                        )}
                        <span className="text-sm font-medium">{formatTimeFromHour(timeSliderValue)}</span>
                      </div>
                    </div>
                    <Slider
                      defaultValue={[timeSliderValue]}
                      min={0}
                      max={23}
                      step={1}
                      onValueChange={handleTimeSliderChange}
                      className="w-full"
                    />
                    <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                      <span>12 AM</span>
                      <span>6 AM</span>
                      <span>12 PM</span>
                      <span>6 PM</span>
                      <span>11 PM</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="list" className="m-0 max-h-[500px] overflow-y-auto">
                <div className="divide-y">
                  {nearbyLocations.map((location) => (
                    <div
                      key={location.name}
                      className="flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-muted/50"
                      onClick={() => {
                        setSelectedLocation(location.name)
                        setShowLocationDetails(true)
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-full text-white",
                            location.score >= 4.5
                              ? "bg-green-500"
                              : location.score >= 3.5
                                ? "bg-green-400"
                                : location.score >= 2.5
                                  ? "bg-yellow-500"
                                  : "bg-red-500",
                          )}
                        >
                          <span className="text-sm font-bold">{location.score.toFixed(1)}</span>
                        </div>
                        <div>
                          <h3 className="font-medium">{location.name}</h3>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{location.distance}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="mb-1">{renderStars(location.score)}</div>
                        <Badge
                          variant="outline"
                          className={cn(
                            location.score >= 4.5
                              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                              : location.score >= 3.5
                                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                : location.score >= 2.5
                                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                                  : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
                          )}
                        >
                          {getSafetyText(location.score)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Area Safety</CardTitle>
              <CardDescription>Safety score for your current location</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="relative mb-2 flex h-32 w-32 items-center justify-center">
                  <div
                    className={cn(
                      "absolute inset-0 rounded-full",
                      safetyScore >= 4.5
                        ? "bg-green-100 dark:bg-green-900/30"
                        : safetyScore >= 3.5
                          ? "bg-green-50 dark:bg-green-900/20"
                          : safetyScore >= 2.5
                            ? "bg-yellow-50 dark:bg-yellow-900/20"
                            : "bg-red-50 dark:bg-red-900/20",
                    )}
                  />
                  <motion.div
                    className={cn(
                      "flex h-24 w-24 items-center justify-center rounded-full text-white",
                      safetyScore >= 4.5
                        ? "bg-green-500"
                        : safetyScore >= 3.5
                          ? "bg-green-400"
                          : safetyScore >= 2.5
                            ? "bg-yellow-500"
                            : "bg-red-500",
                    )}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-bold">{safetyScore.toFixed(1)}</span>
                      <span className="text-xs">out of 5</span>
                    </div>
                  </motion.div>
                </div>
                <div className="mb-1 text-center text-lg font-medium">{getSafetyText(safetyScore)}</div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {timeOfDay === "morning"
                      ? "Morning (6 AM - 12 PM)"
                      : timeOfDay === "afternoon"
                        ? "Afternoon (12 PM - 5 PM)"
                        : timeOfDay === "evening"
                          ? "Evening (5 PM - 9 PM)"
                          : "Night (9 PM - 6 AM)"}
                  </span>
                </div>
              </div>

              <div className="space-y-3 rounded-lg border p-3">
                <h3 className="text-sm font-medium">Safety Factors</h3>
                {safetyFactors.map((factor) => (
                  <div key={factor.name} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-xs">{factor.name}</span>
                        <Badge variant="outline" className="ml-1 h-4 px-1 text-[10px]">
                          {factor.weight}
                        </Badge>
                      </div>
                      <span className={cn("text-xs font-medium", getSafetyColor(factor.score))}>
                        {factor.score.toFixed(1)}
                      </span>
                    </div>
                    <Progress
                      value={factor.score * 20}
                      className="h-1.5"
                      indicatorClassName={getSafetyProgressColor(factor.score)}
                    />
                  </div>
                ))}
              </div>

              <div className="rounded-lg border p-3">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-sm font-medium">Safety by Time</h3>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div
                    className={cn(
                      "flex flex-col items-center rounded-md p-2 transition-colors",
                      timeOfDay === "morning" && "bg-primary/10",
                    )}
                    onClick={() => setTimeOfDay("morning")}
                  >
                    <Sun className="mb-1 h-4 w-4 text-yellow-500" />
                    <span className="text-xs">Morning</span>
                    <span className={cn("text-xs font-medium", getSafetyColor(safetyData.morning))}>
                      {safetyData.morning.toFixed(1)}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "flex flex-col items-center rounded-md p-2 transition-colors",
                      timeOfDay === "afternoon" && "bg-primary/10",
                    )}
                    onClick={() => setTimeOfDay("afternoon")}
                  >
                    <Sun className="mb-1 h-4 w-4 text-yellow-500" />
                    <span className="text-xs">Afternoon</span>
                    <span className={cn("text-xs font-medium", getSafetyColor(safetyData.afternoon))}>
                      {safetyData.afternoon.toFixed(1)}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "flex flex-col items-center rounded-md p-2 transition-colors",
                      timeOfDay === "evening" && "bg-primary/10",
                    )}
                    onClick={() => setTimeOfDay("evening")}
                  >
                    <Moon className="mb-1 h-4 w-4 text-blue-500" />
                    <span className="text-xs">Evening</span>
                    <span className={cn("text-xs font-medium", getSafetyColor(safetyData.evening))}>
                      {safetyData.evening.toFixed(1)}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "flex flex-col items-center rounded-md p-2 transition-colors",
                      timeOfDay === "night" && "bg-primary/10",
                    )}
                    onClick={() => setTimeOfDay("night")}
                  >
                    <Moon className="mb-1 h-4 w-4 text-blue-500" />
                    <span className="text-xs">Night</span>
                    <span className={cn("text-xs font-medium", getSafetyColor(safetyData.night))}>
                      {safetyData.night.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" className="gap-1">
                <ThumbsUp className="h-4 w-4" />
                Accurate
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <AlertTriangle className="h-4 w-4" />
                Report Issue
              </Button>
            </CardFooter>
          </Card>

          <AnimatePresence>
            {showLocationDetails && selectedLocation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>{selectedLocation}</CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => setShowLocationDetails(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription>Detailed safety information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-full text-white",
                            "bg-green-500",
                          )}
                        >
                          <span className="text-sm font-bold">4.2</span>
                        </div>
                        <div>
                          <div className="font-medium">Overall Safety</div>
                          <div className="text-xs text-muted-foreground">Based on 128 reports</div>
                        </div>
                      </div>
                      <div>{renderStars(4.2)}</div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Recent Reports</h3>
                      <div className="space-y-2">
                        <div className="rounded-md border p-2 text-xs">
                          <div className="mb-1 flex items-center justify-between">
                            <Badge
                              variant="outline"
                              className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                            >
                              Suspicious
                            </Badge>
                            <span className="text-muted-foreground">2 days ago</span>
                          </div>
                          <p>Suspicious person loitering near the entrance in the evening.</p>
                        </div>
                        <div className="rounded-md border p-2 text-xs">
                          <div className="mb-1 flex items-center justify-between">
                            <Badge
                              variant="outline"
                              className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                            >
                              Theft
                            </Badge>
                            <span className="text-muted-foreground">1 week ago</span>
                          </div>
                          <p>Phone snatched from someone sitting at the outdoor cafe.</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Safety Tips</h3>
                      <ul className="space-y-1 text-xs">
                        <li className="flex items-start gap-1">
                          <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
                          <span>Avoid walking alone at night in this area</span>
                        </li>
                        <li className="flex items-start gap-1">
                          <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
                          <span>Stay in well-lit areas and main streets</span>
                        </li>
                        <li className="flex items-start gap-1">
                          <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
                          <span>Keep valuables out of sight when in public</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full gap-1">
                      <MapPin className="h-4 w-4" />
                      Get Directions
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
