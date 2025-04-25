"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, MapPin } from "lucide-react"

type RouteMapProps = {
  showRoute?: boolean
}

export default function RouteMap({ showRoute = false }: RouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [mapError, setMapError] = useState(false)

  useEffect(() => {
    // Simulating Google Maps integration
    const initMap = async () => {
      try {
        // Simulate loading delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        if (mapRef.current) {
          // For demo purposes, we'll just show a static map
          const mapElement = mapRef.current
          mapElement.style.backgroundImage = "url('/placeholder.svg?height=600&width=800')"
          mapElement.style.backgroundSize = "cover"
          mapElement.style.backgroundPosition = "center"

          setLoading(false)
        }
      } catch (error) {
        console.error("Error loading map:", error)
        setMapError(true)
        setLoading(false)
      }
    }

    initMap()
  }, [])

  if (mapError) {
    return (
      <Card className="flex h-[400px] items-center justify-center">
        <CardContent className="text-center">
          <p>Unable to load map. Please check your connection and try again.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-lg">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <Skeleton className="h-full w-full" />
        </div>
      )}
      <div ref={mapRef} className="h-full w-full" style={{ display: loading ? "none" : "block" }} />

      {showRoute && !loading && (
        <>
          {/* Simulated route markers */}
          <div className="absolute left-[20%] top-[30%] z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <MapPin className="h-4 w-4" />
          </div>

          <div className="absolute left-[60%] top-[60%] z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <MapPin className="h-4 w-4" />
          </div>

          {/* Danger zone indicators */}
          <Badge
            variant="outline"
            className="absolute left-[40%] top-[45%] z-10 flex items-center gap-1 bg-red-100/80 text-red-700 backdrop-blur-sm dark:bg-red-900/80 dark:text-red-300"
          >
            <AlertTriangle className="h-3 w-3" /> High Risk Area
          </Badge>

          <Badge
            variant="outline"
            className="absolute left-[30%] top-[55%] z-10 flex items-center gap-1 bg-yellow-100/80 text-yellow-700 backdrop-blur-sm dark:bg-yellow-900/80 dark:text-yellow-300"
          >
            <AlertTriangle className="h-3 w-3" /> Caution Area
          </Badge>

          {/* Heat map overlay simulation */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-yellow-500/20 to-red-500/30 opacity-60" />
        </>
      )}
    </div>
  )
}
