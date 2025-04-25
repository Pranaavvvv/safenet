"use client"

import { useState, useEffect } from "react"

type LocationData = {
  latitude: number | null
  longitude: number | null
  accuracy: number | null
  loading: boolean
  error: string | null
}

export function useLocation() {
  const [location, setLocation] = useState<LocationData>({
    latitude: null,
    longitude: null,
    accuracy: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        loading: false,
        error: "Geolocation is not supported by your browser",
      }))
      return
    }

    const handleSuccess = (position: GeolocationPosition) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        loading: false,
        error: null,
      })
    }

    const handleError = (error: GeolocationPositionError) => {
      setLocation((prev) => ({
        ...prev,
        loading: false,
        error: error.message,
      }))
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }

    // Get initial location
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options)

    // Set up continuous watching of location
    const watchId = navigator.geolocation.watchPosition(handleSuccess, handleError, options)

    // Clean up
    return () => {
      navigator.geolocation.clearWatch(watchId)
    }
  }, [])

  return location
}
