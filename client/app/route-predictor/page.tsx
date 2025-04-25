"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, MapPin, Navigation, RotateCcw, Search } from "lucide-react"
import RouteMap from "@/components/route-map"

export default function RoutePredictorPage() {
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [searchPerformed, setSearchPerformed] = useState(false)
  const [safetyLevel, setSafetyLevel] = useState(85)
  const [timeOfDay, setTimeOfDay] = useState("now")

  const handleSearch = () => {
    if (origin && destination) {
      setSearchPerformed(true)
    }
  }

  const handleReset = () => {
    setOrigin("")
    setDestination("")
    setSearchPerformed(false)
    setSafetyLevel(85)
    setTimeOfDay("now")
  }

  const getSafetyColor = (level: number) => {
    if (level >= 80) return "text-green-500"
    if (level >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getSafetyText = (level: number) => {
    if (level >= 80) return "Safe"
    if (level >= 60) return "Use Caution"
    return "High Risk"
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">AI Route Predictor</h1>
        <p className="text-muted-foreground">Find the safest route to your destination with AI risk assessment</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Route Planner</CardTitle>
            <CardDescription>Enter your origin and destination</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="origin">Starting Point</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="origin"
                  placeholder="Your current location"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <div className="relative">
                <Navigation className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="destination"
                  placeholder="Where are you going?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Time of Travel</Label>
              <Tabs defaultValue={timeOfDay} onValueChange={setTimeOfDay} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="now">Now</TabsTrigger>
                  <TabsTrigger value="day">Day</TabsTrigger>
                  <TabsTrigger value="night">Night</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="pt-4">
              <Button onClick={handleSearch} className="w-full" disabled={!origin || !destination}>
                <Search className="mr-2 h-4 w-4" />
                Find Safe Route
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="p-0">
            <RouteMap showRoute={searchPerformed} />
          </CardContent>
          {searchPerformed && (
            <CardFooter className="flex flex-col items-start border-t p-4">
              <div className="mb-4 flex w-full items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Route Safety Analysis</h3>
                  <p className="text-sm text-muted-foreground">Based on historical data and current conditions</p>
                </div>
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>

              <div className="mb-4 grid w-full gap-4 md:grid-cols-3">
                <div className="rounded-lg border p-3">
                  <div className="mb-1 text-sm font-medium">Overall Safety</div>
                  <div className="flex items-center gap-2">
                    <span className={`text-2xl font-bold ${getSafetyColor(safetyLevel)}`}>{safetyLevel}%</span>
                    <Badge variant="outline" className={`${getSafetyColor(safetyLevel)} bg-background`}>
                      {getSafetyText(safetyLevel)}
                    </Badge>
                  </div>
                </div>

                <div className="rounded-lg border p-3">
                  <div className="mb-1 text-sm font-medium">Estimated Time</div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-2xl font-bold">18 min</span>
                  </div>
                </div>

                <div className="rounded-lg border p-3">
                  <div className="mb-1 text-sm font-medium">Risk Areas</div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <span className="text-2xl font-bold">2</span>
                  </div>
                </div>
              </div>

              <div className="w-full space-y-3">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <Label>Lighting Conditions</Label>
                    <span className="text-sm font-medium">Good</span>
                  </div>
                  <Slider defaultValue={[75]} max={100} step={1} className="w-full" />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <Label>Pedestrian Traffic</Label>
                    <span className="text-sm font-medium">Moderate</span>
                  </div>
                  <Slider defaultValue={[60]} max={100} step={1} className="w-full" />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <Label>Police Presence</Label>
                    <span className="text-sm font-medium">Low</span>
                  </div>
                  <Slider defaultValue={[30]} max={100} step={1} className="w-full" />
                </div>
              </div>

              <div className="mt-4 w-full">
                <Button className="w-full">Start Navigation with Safety Alerts</Button>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  )
}
