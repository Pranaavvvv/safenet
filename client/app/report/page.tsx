"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Camera, MapPin, Upload } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ReportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [useCurrentLocation, setUseCurrentLocation] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)

      // Reset form after showing success message
      setTimeout(() => {
        setSubmitted(false)
      }, 3000)
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Report an Incident</h1>
        <p className="text-muted-foreground">Submit details about safety concerns or incidents in your area</p>
      </div>

      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>Incident Report Form</CardTitle>
          <CardDescription>
            Your report will be kept confidential and used to improve safety in the area
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="incident-type">Incident Type</Label>
              <select
                id="incident-type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select incident type</option>
                <option value="harassment">Harassment</option>
                <option value="theft">Theft</option>
                <option value="assault">Assault</option>
                <option value="suspicious">Suspicious Activity</option>
                <option value="unsafe-area">Unsafe Area</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Describe what happened..." className="min-h-32" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date & Time</Label>
              <Input id="date" type="datetime-local" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="location">Location</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="use-current-location"
                    checked={useCurrentLocation}
                    onCheckedChange={(checked) => {
                      if (typeof checked === "boolean") {
                        setUseCurrentLocation(checked)
                      }
                    }}
                  />
                  <label
                    htmlFor="use-current-location"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Use current location
                  </label>
                </div>
              </div>
              <div className="relative">
                <Input id="location" placeholder="Enter location" disabled={useCurrentLocation} />
                <MapPin className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
              {useCurrentLocation && (
                <p className="text-xs text-muted-foreground">Your current location will be used for this report</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="photos">Upload Photos</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-input bg-muted/50 p-4 text-center hover:bg-muted">
                  <Camera className="mb-2 h-8 w-8 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Take Photo</p>
                </div>
                <div className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-input bg-muted/50 p-4 text-center hover:bg-muted">
                  <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Upload Photo</p>
                  <input type="file" className="hidden" accept="image/*" multiple />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="anonymous" />
              <label
                htmlFor="anonymous"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Submit anonymously
              </label>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          </CardFooter>
        </form>
        <div
          className={cn(
            "fixed bottom-0 left-0 right-0 bg-green-600 p-4 text-center text-white transition-transform duration-300",
            submitted ? "translate-y-0" : "translate-y-full",
          )}
        >
          Report submitted successfully. Thank you for helping keep the community safe.
        </div>
      </Card>
    </div>
  )
}
