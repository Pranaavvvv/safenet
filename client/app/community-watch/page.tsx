"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertTriangle,
  Camera,
  Clock,
  Filter,
  Heart,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  Share2,
  Shield,
  ThumbsUp,
  User,
  X,
  RefreshCw,
  Check,
  Minus,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

// Sample community reports
const initialReports = [
  {
    id: 1,
    user: {
      name: "Emma Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    type: "harassment",
    description: "Someone following me on Main Street near the coffee shop. Wearing dark jacket and jeans.",
    location: "Main Street & 5th Avenue",
    coordinates: { lat: 40.7128, lng: -74.006 },
    time: "10 minutes ago",
    likes: 5,
    comments: 2,
    status: "active",
    severity: "medium",
  },
  {
    id: 2,
    user: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    type: "suspicious",
    description:
      "Suspicious person loitering around the ATM for over 30 minutes. Appears to be watching people withdraw money.",
    location: "Downtown Bank Plaza",
    coordinates: { lat: 40.7138, lng: -74.013 },
    time: "25 minutes ago",
    likes: 8,
    comments: 4,
    status: "active",
    severity: "high",
  },
  {
    id: 3,
    user: {
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    type: "unsafe",
    description: "Street lights are out on Cedar Lane between 10th and 12th Street. Very dark and feels unsafe.",
    location: "Cedar Lane",
    coordinates: { lat: 40.7118, lng: -74.009 },
    time: "2 hours ago",
    likes: 15,
    comments: 7,
    status: "verified",
    severity: "medium",
  },
  {
    id: 4,
    user: {
      name: "David Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    type: "theft",
    description: "Just witnessed someone's bag being snatched at the bus stop. Suspect ran north on Park Avenue.",
    location: "Central Bus Terminal",
    coordinates: { lat: 40.7148, lng: -74.003 },
    time: "1 hour ago",
    likes: 12,
    comments: 6,
    status: "resolved",
    severity: "high",
  },
]

type ReportType = "all" | "harassment" | "suspicious" | "unsafe" | "theft"

export default function CommunityWatchPage() {
  const [reports, setReports] = useState(initialReports)
  const [activeTab, setActiveTab] = useState<"feed" | "map">("feed")
  const [filterType, setFilterType] = useState<ReportType>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewReportForm, setShowNewReportForm] = useState(false)
  const [newReportText, setNewReportText] = useState("")
  const [newReportType, setNewReportType] = useState<string>("harassment")
  const [newReportLocation, setNewReportLocation] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showNewReportAlert, setShowNewReportAlert] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)

  // Simulate map loading
  useEffect(() => {
    if (mapRef.current && activeTab === "map") {
      // For demo purposes, we'll just show a static map
      const mapElement = mapRef.current
      mapElement.style.backgroundImage = "url('/placeholder.svg?height=600&width=800')"
      mapElement.style.backgroundSize = "cover"
      mapElement.style.backgroundPosition = "center"
    }
  }, [activeTab])

  // Simulate new report coming in
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newReport = {
          id: Date.now(),
          user: {
            name: "Anonymous User",
            avatar: "/placeholder.svg?height=40&width=40",
            verified: false,
          },
          type: ["harassment", "suspicious", "unsafe", "theft"][Math.floor(Math.random() * 4)] as string,
          description: "New incident reported in your area. Please stay alert.",
          location: "Near your location",
          coordinates: { lat: 40.7128 + Math.random() * 0.01, lng: -74.006 + Math.random() * 0.01 },
          time: "Just now",
          likes: 0,
          comments: 0,
          status: "active",
          severity: ["low", "medium", "high"][Math.floor(Math.random() * 3)] as string,
        }

        setReports((prev) => [newReport, ...prev])
        setShowNewReportAlert(true)

        setTimeout(() => {
          setShowNewReportAlert(false)
        }, 5000)
      }
    }, 45000) // Simulate a new report roughly every 45 seconds (30% chance)

    return () => clearInterval(interval)
  }, [])

  const handleSubmitReport = () => {
    if (!newReportText || !newReportType) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newReport = {
        id: Date.now(),
        user: {
          name: "You",
          avatar: "/placeholder.svg?height=40&width=40",
          verified: false,
        },
        type: newReportType,
        description: newReportText,
        location: newReportLocation || "Current Location",
        coordinates: { lat: 40.7128, lng: -74.006 },
        time: "Just now",
        likes: 0,
        comments: 0,
        status: "active",
        severity: "medium",
      }

      setReports([newReport, ...reports])
      setNewReportText("")
      setNewReportType("harassment")
      setNewReportLocation("")
      setShowNewReportForm(false)
      setIsSubmitting(false)
    }, 1500)
  }

  const handleLikeReport = (id: number) => {
    setReports(reports.map((report) => (report.id === id ? { ...report, likes: report.likes + 1 } : report)))
  }

  const filteredReports = reports.filter((report) => {
    if (filterType !== "all" && report.type !== filterType) return false
    if (
      searchQuery &&
      !report.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !report.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false
    return true
  })

  const getReportTypeColor = (type: string) => {
    switch (type) {
      case "harassment":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
      case "suspicious":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
      case "unsafe":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
      case "theft":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getReportTypeIcon = (type: string) => {
    switch (type) {
      case "harassment":
        return <AlertTriangle className="h-3 w-3" />
      case "suspicious":
        return <User className="h-3 w-3" />
      case "unsafe":
        return <Shield className="h-3 w-3" />
      case "theft":
        return <AlertTriangle className="h-3 w-3" />
      default:
        return <AlertTriangle className="h-3 w-3" />
    }
  }

  const getReportStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
            Active
          </Badge>
        )
      case "verified":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
            Verified
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
            Resolved
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Community Watch</h1>
        <p className="text-muted-foreground">Stay informed about safety incidents in your area</p>
      </div>

      <AnimatePresence>
        {showNewReportAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 shadow-lg dark:border-blue-900 dark:bg-blue-900/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">New Report Nearby</h3>
                  <p className="text-sm">A new safety incident has been reported in your area</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setShowNewReportAlert(false)}
              >
                <ThumbsUp className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs
          defaultValue={activeTab}
          onValueChange={(value) => setActiveTab(value as "feed" | "map")}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid w-full grid-cols-2 sm:w-[200px]">
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search reports..."
              className="pl-10 pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          <Button variant="outline" size="icon" className="shrink-0">
            <Filter className="h-4 w-4" />
          </Button>
          <Button className="gap-1 shrink-0" onClick={() => setShowNewReportForm(true)}>
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Report</span>
          </Button>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <Badge
          variant="outline"
          className={cn(
            "cursor-pointer",
            filterType === "all" ? "bg-primary/10 text-primary" : "bg-muted hover:bg-muted/80",
          )}
          onClick={() => setFilterType("all")}
        >
          All Reports
        </Badge>
        <Badge
          variant="outline"
          className={cn(
            "cursor-pointer",
            filterType === "harassment"
              ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
              : "bg-muted hover:bg-muted/80",
          )}
          onClick={() => setFilterType("harassment")}
        >
          <AlertTriangle className="mr-1 h-3 w-3" />
          Harassment
        </Badge>
        <Badge
          variant="outline"
          className={cn(
            "cursor-pointer",
            filterType === "suspicious"
              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
              : "bg-muted hover:bg-muted/80",
          )}
          onClick={() => setFilterType("suspicious")}
        >
          <User className="mr-1 h-3 w-3" />
          Suspicious
        </Badge>
        <Badge
          variant="outline"
          className={cn(
            "cursor-pointer",
            filterType === "unsafe"
              ? "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
              : "bg-muted hover:bg-muted/80",
          )}
          onClick={() => setFilterType("unsafe")}
        >
          <Shield className="mr-1 h-3 w-3" />
          Unsafe Area
        </Badge>
        <Badge
          variant="outline"
          className={cn(
            "cursor-pointer",
            filterType === "theft"
              ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
              : "bg-muted hover:bg-muted/80",
          )}
          onClick={() => setFilterType("theft")}
        >
          <AlertTriangle className="mr-1 h-3 w-3" />
          Theft
        </Badge>
      </div>

      <AnimatePresence>
        {showNewReportForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Report an Incident</CardTitle>
                <CardDescription>Share safety concerns with the community</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Incident Type</Label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start",
                        newReportType === "harassment" &&
                          "border-red-500 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300",
                      )}
                      onClick={() => setNewReportType("harassment")}
                    >
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Harassment
                    </Button>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start",
                        newReportType === "suspicious" &&
                          "border-yellow-500 bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300",
                      )}
                      onClick={() => setNewReportType("suspicious")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Suspicious
                    </Button>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start",
                        newReportType === "unsafe" &&
                          "border-orange-500 bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300",
                      )}
                      onClick={() => setNewReportType("unsafe")}
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Unsafe Area
                    </Button>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start",
                        newReportType === "theft" &&
                          "border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300",
                      )}
                      onClick={() => setNewReportType("theft")}
                    >
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Theft
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="report-description">Description</Label>
                  <Textarea
                    id="report-description"
                    placeholder="Describe what happened, who was involved, and any other relevant details..."
                    className="min-h-[100px]"
                    value={newReportText}
                    onChange={(e) => setNewReportText(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="report-location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="report-location"
                      placeholder="Enter location or use current location"
                      className="pl-10"
                      value={newReportLocation}
                      onChange={(e) => setNewReportLocation(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Camera className="h-4 w-4" />
                    Add Photo
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <MapPin className="h-4 w-4" />
                    Current Location
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between gap-2">
                <Button variant="outline" onClick={() => setShowNewReportForm(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitReport} disabled={!newReportText || isSubmitting} className="gap-1">
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </motion.div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Report
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {activeTab === "feed" ? (
        <div className="space-y-4">
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <motion.div
                key={report.id}
                initial={report.time === "Just now" ? { opacity: 0, y: -20 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  className={cn(
                    report.time === "Just now" &&
                      "border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-900/10",
                    report.status === "resolved" && "opacity-75",
                  )}
                >
                  <CardContent className="p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={report.user.avatar || "/placeholder.svg"} alt={report.user.name} />
                          <AvatarFallback>{report.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium">{report.user.name}</span>
                          {report.user.verified && (
                            <Badge
                              variant="outline"
                              className="ml-1 h-4 bg-blue-100 px-1 text-[10px] text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                            >
                              <Check className="mr-[2px] h-2 w-2" />
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={cn("flex items-center gap-1", getReportTypeColor(report.type))}
                        >
                          {getReportTypeIcon(report.type)}
                          {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                        </Badge>
                        {getReportStatusBadge(report.status)}
                      </div>
                    </div>

                    <p className="mb-3 text-sm">{report.description}</p>

                    <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{report.location}</span>
                      <span>•</span>
                      <Clock className="h-3 w-3" />
                      <span>{report.time}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1 px-2 text-xs"
                          onClick={() => handleLikeReport(report.id)}
                        >
                          <Heart className={cn("h-3 w-3", report.likes > 0 && "fill-red-500 text-red-500")} />
                          <span>{report.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 gap-1 px-2 text-xs">
                          <MessageCircle className="h-3 w-3" />
                          <span>{report.comments}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 gap-1 px-2 text-xs">
                          <Share2 className="h-3 w-3" />
                          <span>Share</span>
                        </Button>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="mb-4 rounded-full bg-muted p-3">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mb-1 font-medium">No reports found</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {searchQuery ? "No reports match your search criteria" : "There are no reports in your area yet"}
                </p>
                <Button className="gap-1" onClick={() => setShowNewReportForm(true)}>
                  <Plus className="h-4 w-4" />
                  Report an Incident
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <Card className="overflow-hidden">
          <div className="relative h-[500px] w-full">
            <div ref={mapRef} className="h-full w-full" />

            {/* Map pins for reports */}
            {filteredReports.map((report) => (
              <motion.div
                key={report.id}
                className="absolute z-10"
                style={{
                  left: `${(report.coordinates.lng + 74.006) * 1000}%`,
                  top: `${(report.coordinates.lat - 40.7128) * 1000}%`,
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full shadow-lg",
                    report.type === "harassment"
                      ? "bg-red-500 text-white"
                      : report.type === "suspicious"
                        ? "bg-yellow-500 text-white"
                        : report.type === "unsafe"
                          ? "bg-orange-500 text-white"
                          : "bg-purple-500 text-white",
                  )}
                  whileHover={{ scale: 1.1 }}
                  animate={report.time === "Just now" ? { scale: [1, 1.2, 1] } : {}}
                  transition={report.time === "Just now" ? { duration: 2, repeat: Number.POSITIVE_INFINITY } : {}}
                >
                  {getReportTypeIcon(report.type)}
                  <span className="sr-only">{report.type}</span>
                </motion.div>

                {/* Pulse effect for new reports */}
                {report.time === "Just now" && (
                  <motion.div
                    className={cn(
                      "absolute -inset-4 rounded-full",
                      report.type === "harassment"
                        ? "bg-red-500/20"
                        : report.type === "suspicious"
                          ? "bg-yellow-500/20"
                          : report.type === "unsafe"
                            ? "bg-orange-500/20"
                            : "bg-purple-500/20",
                    )}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0.2, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                )}
              </motion.div>
            ))}

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

            {/* Map controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full shadow-lg">
                <Plus className="h-5 w-5" />
              </Button>
              <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full shadow-lg">
                <Minus className="h-5 w-5" />
              </Button>
              <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full shadow-lg">
                <MapPin className="h-5 w-5" />
              </Button>
            </div>

            {/* Legend */}
            <div className="absolute left-4 top-4 rounded-lg bg-background/80 p-3 shadow-lg backdrop-blur-sm">
              <h3 className="mb-2 text-sm font-medium">Map Legend</h3>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="text-xs">Harassment</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <span className="text-xs">Suspicious</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-orange-500" />
                  <span className="text-xs">Unsafe Area</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-purple-500" />
                  <span className="text-xs">Theft</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500" />
                  <span className="text-xs">Your Location</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
