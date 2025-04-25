"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, MapPin, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function MapView() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [markers, setMarkers] = useState<
    Array<{
      id: number
      type: "safe" | "caution" | "danger" | "user"
      position: { x: number; y: number }
      pulse?: boolean
      name?: string
      description?: string
    }>
  >([])
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null)
  const [filter, setFilter] = useState<string | null>(null)

  useEffect(() => {
    // Simulate map loading and API call to backend
    const loadMap = async () => {
      try {
        // This would be your actual API call
        // const response = await fetch('/api/map/markers');
        // const data = await response.json();
        // setMarkers(data.markers);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Generate sample markers (this would come from your backend)
        const sampleMarkers = [
          // User location
          {
            id: 1,
            type: "user",
            position: { x: 50, y: 50 },
            pulse: true,
            name: "Your Location",
            description: "This is your current location",
          },
          // Safe zones
          {
            id: 2,
            type: "safe",
            position: { x: 30, y: 30 },
            name: "Police Station",
            description: "24/7 police station with emergency services",
          },
          {
            id: 3,
            type: "safe",
            position: { x: 70, y: 40 },
            name: "SafeWalk Zone",
            description: "Well-lit area with regular security patrols",
          },
          {
            id: 4,
            type: "safe",
            position: { x: 60, y: 70 },
            name: "Community Center",
            description: "Public facility with security personnel",
          },
          // Caution areas
          {
            id: 5,
            type: "caution",
            position: { x: 20, y: 60 },
            name: "Dimly Lit Street",
            description: "Limited visibility at night, use caution",
          },
          {
            id: 6,
            type: "caution",
            position: { x: 80, y: 30 },
            name: "Construction Zone",
            description: "Active construction with limited pedestrian access",
          },
          // Danger zones
          {
            id: 7,
            type: "danger",
            position: { x: 40, y: 80 },
            name: "Recent Incident Area",
            description: "Multiple incidents reported in the last 48 hours",
          },
          {
            id: 8,
            type: "danger",
            position: { x: 85, y: 65 },
            name: "High Risk Zone",
            description: "Avoid this area, especially at night",
          },
        ]

        setMarkers(sampleMarkers)
        setIsLoaded(true)
      } catch (error) {
        console.error("Error loading map data:", error)
        // Handle error state
      }
    }

    loadMap()
  }, [])

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case "safe":
        return <Shield className="h-4 w-4" />
      case "caution":
      case "danger":
        return <AlertTriangle className="h-4 w-4" />
      case "user":
        return <MapPin className="h-4 w-4" />
      default:
        return null
    }
  }

  const getMarkerColor = (type: string) => {
    switch (type) {
      case "safe":
        return "bg-green-100 text-green-700"
      case "caution":
        return "bg-yellow-100 text-yellow-700"
      case "danger":
        return "bg-red-100 text-red-700"
      case "user":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const filteredMarkers = filter
    ? markers.filter((marker) => marker.type === filter || marker.type === "user")
    : markers

  // Function to report an incident (would connect to your backend)
  const reportIncident = async () => {
    try {
      // This would be your actual API call
      // const response = await fetch('/api/incidents/report', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     location: { /* Get user location */ },
      //     description: "User reported incident",
      //     timestamp: new Date().toISOString(),
      //   }),
      // });

      // if (!response.ok) throw new Error('Failed to report incident');

      alert("Incident reported successfully. Authorities have been notified.")
    } catch (error) {
      console.error("Failed to report incident:", error)
      alert("Failed to report incident. Please try again.")
    }
  }

  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-lg shadow-md">
      {/* Map background */}
      <div ref={mapRef} className="h-full w-full bg-[url('/placeholder.svg?height=600&width=800')] bg-cover bg-center">
        {/* Map grid overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />

        {/* Map markers */}
        {isLoaded &&
          filteredMarkers.map((marker) => (
            <motion.div
              key={marker.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: marker.id * 0.1,
              }}
              className="absolute"
              style={{
                left: `${marker.position.x}%`,
                top: `${marker.position.y}%`,
                transform: "translate(-50%, -50%)",
                zIndex: selectedMarker === marker.id ? 10 : 1,
              }}
              onClick={() => setSelectedMarker(selectedMarker === marker.id ? null : marker.id)}
            >
              <div className="relative">
                {marker.pulse && (
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0.2, 0.7] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="absolute -inset-3 rounded-full bg-blue-500/30"
                  />
                )}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full shadow-md cursor-pointer",
                    getMarkerColor(marker.type),
                  )}
                >
                  {getMarkerIcon(marker.type)}
                </motion.div>

                {/* Marker info popup */}
                {selectedMarker === marker.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute left-1/2 top-full z-10 mt-2 w-48 -translate-x-1/2 rounded-md bg-white p-3 shadow-lg"
                  >
                    <h3 className="font-medium">{marker.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{marker.description}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}

        {/* Map loading overlay */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="mb-3 h-10 w-10 rounded-full border-4 border-primary border-t-transparent"
              />
              <p className="text-sm">Loading map data...</p>
            </div>
          </div>
        )}
      </div>

      {/* Map controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-background shadow-md"
        >
          +
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-background shadow-md"
        >
          -
        </motion.button>
      </div>

      {/* Filter controls */}
      <div className="absolute left-4 top-4 flex gap-2">
        <Button
          size="sm"
          variant={filter === null ? "default" : "outline"}
          onClick={() => setFilter(null)}
          className="text-xs"
        >
          All
        </Button>
        <Button
          size="sm"
          variant={filter === "safe" ? "default" : "outline"}
          onClick={() => setFilter("safe")}
          className="bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800 text-xs"
        >
          Safe
        </Button>
        <Button
          size="sm"
          variant={filter === "caution" ? "default" : "outline"}
          onClick={() => setFilter("caution")}
          className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 hover:text-yellow-800 text-xs"
        >
          Caution
        </Button>
        <Button
          size="sm"
          variant={filter === "danger" ? "default" : "outline"}
          onClick={() => setFilter("danger")}
          className="bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800 text-xs"
        >
          Danger
        </Button>
      </div>

      {/* Report incident button */}
      <div className="absolute bottom-4 left-4">
        <Button onClick={reportIncident} className="bg-primary hover:bg-primary/90 text-white" size="sm">
          Report Incident
        </Button>
      </div>

      {/* Map attribution */}
      <div className="absolute bottom-2 right-2 text-xs text-muted-foreground opacity-70">
        SafeNet Map © {new Date().getFullYear()}
      </div>
    </div>
  )
}
