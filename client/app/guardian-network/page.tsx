"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Check,
  Clock,
  Eye,
  MapPin,
  MessageSquare,
  Phone,
  Search,
  Shield,
  ThumbsUp,
  User,
  UserCheck,
  UserPlus,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

// Sample guardians data
const guardians = [
  {
    id: 1,
    name: "Emma Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Police Officer",
    verified: true,
    distance: "0.3 miles",
    rating: 4.8,
    reviews: 24,
    status: "active",
    lastActive: "2 mins ago",
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Security Guard",
    verified: true,
    distance: "0.5 miles",
    rating: 4.5,
    reviews: 18,
    status: "active",
    lastActive: "Just now",
  },
  {
    id: 3,
    name: "Sarah Williams",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Community Volunteer",
    verified: false,
    distance: "0.8 miles",
    rating: 4.2,
    reviews: 7,
    status: "inactive",
    lastActive: "15 mins ago",
  },
  {
    id: 4,
    name: "David Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Security Professional",
    verified: true,
    distance: "1.2 miles",
    rating: 4.9,
    reviews: 32,
    status: "active",
    lastActive: "5 mins ago",
  },
]

export default function GuardianNetworkPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("nearby")
  const [volunteerMode, setVolunteerMode] = useState(false)
  const [showGuardianDetails, setShowGuardianDetails] = useState(false)
  const [selectedGuardian, setSelectedGuardian] = useState<number | null>(null)
  const [isLocationShared, setIsLocationShared] = useState(false)
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

  const handleViewGuardianDetails = (id: number) => {
    setSelectedGuardian(id)
    setShowGuardianDetails(true)
  }

  const filteredGuardians = guardians.filter((guardian) => {
    if (
      searchQuery &&
      !guardian.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !guardian.role.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false
    return true
  })

  const selectedGuardianData = selectedGuardian ? guardians.find((g) => g.id === selectedGuardian) : null

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Guardian Network</h1>
        <p className="text-muted-foreground">Connect with verified safety volunteers in your area</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value)} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-2 sm:w-[200px]">
            <TabsTrigger value="nearby">Nearby</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search guardians..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="gap-1 shrink-0" onClick={() => setVolunteerMode(!volunteerMode)}>
            {volunteerMode ? (
              <>
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline">View Mode</span>
              </>
            ) : (
              <>
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Volunteer</span>
              </>
            )}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {volunteerMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <Card className="border-primary/50 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Volunteer Mode
                </CardTitle>
                <CardDescription>You are now visible to others as a safety volunteer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
                      <UserCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Active Status</h3>
                      <p className="text-sm text-muted-foreground">You are visible to others nearby</p>
                    </div>
                  </div>
                  <Switch checked={true} disabled />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Location Sharing</h3>
                      <p className="text-sm text-muted-foreground">Share your location with people in need</p>
                    </div>
                  </div>
                  <Switch checked={isLocationShared} onCheckedChange={setIsLocationShared} />
                </div>

                <div className="rounded-lg border p-3">
                  <h3 className="mb-2 font-medium">Your Guardian Profile</h3>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your profile" />
                      <AvatarFallback>YP</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="font-medium">You</p>
                        <Badge
                          variant="outline"
                          className="ml-1 h-5 bg-blue-100 px-1 text-[10px] text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                        >
                          <Check className="mr-[2px] h-2 w-2" />
                          New Volunteer
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Joined just now</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setVolunteerMode(false)}>
                  Exit Volunteer Mode
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-6 md:grid-cols-3">
        <div className={cn("space-y-4", activeTab === "map" ? "md:col-span-1" : "md:col-span-3")}>
          {activeTab === "nearby" && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredGuardians.map((guardian) => (
                <Card
                  key={guardian.id}
                  className={cn(
                    "transition-all hover:border-primary/50 hover:shadow-md",
                    guardian.status === "inactive" && "opacity-70",
                  )}
                >
                  <CardContent className="p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={guardian.avatar || "/placeholder.svg"} alt={guardian.name} />
                          <AvatarFallback>{guardian.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-1">
                            <p className="font-medium">{guardian.name}</p>
                            {guardian.verified && (
                              <Badge
                                variant="outline"
                                className="ml-1 h-4 bg-blue-100 px-1 text-[10px] text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                              >
                                <Check className="mr-[2px] h-2 w-2" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{guardian.role}</p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          guardian.status === "active"
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
                        )}
                      >
                        {guardian.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </div>

                    <div className="mb-3 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span>{guardian.distance}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3 text-yellow-500" />
                        <span>
                          {guardian.rating} ({guardian.reviews})
                        </span>
                      </div>
                    </div>

                    <div className="mb-3 flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Last active: {guardian.lastActive}</span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-1"
                        onClick={() => handleViewGuardianDetails(guardian.id)}
                      >
                        <User className="h-3 w-3" />
                        Profile
                      </Button>
                      <Button size="sm" className="flex-1 gap-1">
                        <MessageSquare className="h-3 w-3" />
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredGuardians.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="mb-4 rounded-full bg-muted p-3">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mb-1 font-medium">No guardians found</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {searchQuery ? "No guardians match your search criteria" : "There are no guardians in your area yet"}
                </p>
                <Button className="gap-1">
                  <UserPlus className="h-4 w-4" />
                  Become a Volunteer
                </Button>
              </CardContent>
            </Card>
          )}

          <AnimatePresence>
            {showGuardianDetails && selectedGuardianData && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>Guardian Profile</CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => setShowGuardianDetails(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription>Detailed information about this guardian</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-16 w-16">
                        <AvatarImage
                          src={selectedGuardianData.avatar || "/placeholder.svg"}
                          alt={selectedGuardianData.name}
                        />
                        <AvatarFallback>{selectedGuardianData.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-1">
                          <h3 className="text-lg font-medium">{selectedGuardianData.name}</h3>
                          {selectedGuardianData.verified && (
                            <Badge
                              variant="outline"
                              className="ml-1 bg-blue-100 px-1 text-xs text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                            >
                              <Check className="mr-1 h-3 w-3" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground">{selectedGuardianData.role}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-lg border p-3 text-center">
                        <div className="text-xs text-muted-foreground">Rating</div>
                        <div className="flex items-center justify-center gap-1">
                          <ThumbsUp className="h-4 w-4 text-yellow-500" />
                          <span className="text-lg font-medium">{selectedGuardianData.rating}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">{selectedGuardianData.reviews} reviews</div>
                      </div>
                      <div className="rounded-lg border p-3 text-center">
                        <div className="text-xs text-muted-foreground">Distance</div>
                        <div className="flex items-center justify-center gap-1">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="text-lg font-medium">{selectedGuardianData.distance}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">from your location</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Verification Details</h3>
                      <div className="rounded-lg border p-3">
                        <div className="mb-2 flex items-center gap-2">
                          <Shield className="h-5 w-5 text-green-500" />
                          <span className="font-medium">Identity Verified</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          This guardian has been verified by our team and has provided proper identification.
                        </p>
                      </div>
                      {selectedGuardianData.role === "Police Officer" && (
                        <div className="rounded-lg border p-3">
                          <div className="mb-2 flex items-center gap-2">
                            <Shield className="h-5 w-5 text-blue-500" />
                            <span className="font-medium">Law Enforcement</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            This guardian is a verified law enforcement officer.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Recent Reviews</h3>
                      <div className="space-y-2">
                        <div className="rounded-md border p-2">
                          <div className="mb-1 flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback>JD</AvatarFallback>
                              </Avatar>
                              <span className="text-xs font-medium">Jane Doe</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="h-3 w-3 text-yellow-500" />
                              <ThumbsUp className="h-3 w-3 text-yellow-500" />
                              <ThumbsUp className="h-3 w-3 text-yellow-500" />
                              <ThumbsUp className="h-3 w-3 text-yellow-500" />
                              <ThumbsUp className="h-3 w-3 text-yellow-500" />
                            </div>
                          </div>
                          <p className="text-xs">
                            "Very helpful and responsive. Made me feel safe walking home at night."
                          </p>
                        </div>
                        <div className="rounded-md border p-2">
                          <div className="mb-1 flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback>MS</AvatarFallback>
                              </Avatar>
                              <span className="text-xs font-medium">Mark Smith</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="h-3 w-3 text-yellow-500" />
                              <ThumbsUp className="h-3 w-3 text-yellow-500" />
                              <ThumbsUp className="h-3 w-3 text-yellow-500" />
                              <ThumbsUp className="h-3 w-3 text-yellow-500" />
                              <ThumbsUp className="h-3 w-3 text-muted-foreground" />
                            </div>
                          </div>
                          <p className="text-xs">"Quick to respond and very professional. Would recommend."</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" className="flex-1 gap-1">
                      <Phone className="h-4 w-4" />
                      Call
                    </Button>
                    <Button className="flex-1 gap-1">
                      <MessageSquare className="h-4 w-4" />
                      Message
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {activeTab === "map" && (
          <div className="md:col-span-2">
            <Card className="overflow-hidden">
              <div className="relative h-[500px] w-full">
                <div ref={mapRef} className="h-full w-full" />

                {/* Guardian markers */}
                {filteredGuardians.map((guardian) => (
                  <motion.div
                    key={guardian.id}
                    className="absolute z-10"
                    style={{
                      left: `${20 + guardian.id * 15}%`,
                      top: `${30 + guardian.id * 10}%`,
                    }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => handleViewGuardianDetails(guardian.id)}
                  >
                    <motion.div
                      className={cn(
                        "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-white shadow-lg",
                        guardian.verified ? "bg-blue-500 text-white" : "bg-green-500 text-white",
                        guardian.status === "inactive" && "opacity-60",
                      )}
                      whileHover={{ scale: 1.1 }}
                      animate={guardian.lastActive === "Just now" ? { scale: [1, 1.1, 1] } : {}}
                      transition={
                        guardian.lastActive === "Just now" ? { duration: 2, repeat: Number.POSITIVE_INFINITY } : {}
                      }
                    >
                      <Shield className="h-5 w-5" />
                    </motion.div>

                    {/* Pulse effect for active guardians */}
                    {guardian.status === "active" && (
                      <motion.div
                        className="absolute -inset-2 rounded-full bg-blue-500/20"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0.2, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                    )}

                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-md bg-background/80 px-2 py-1 text-xs backdrop-blur-sm">
                      {guardian.name.split(" ")[0]}
                    </div>
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
                    <div className="absolute -inset-4 rounded-full bg-pink-500/20 animate-ping" />
                    <div className="relative h-4 w-4 rounded-full bg-pink-500 ring-4 ring-pink-500/50" />
                  </div>
                </motion.div>

                {/* Map legend */}
                <div className="absolute left-4 top-4 rounded-lg bg-background/80 p-3 shadow-lg backdrop-blur-sm">
                  <h3 className="mb-2 text-sm font-medium">Guardian Legend</h3>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500" />
                      <span className="text-xs">Verified Guardian</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <span className="text-xs">Community Volunteer</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-pink-500" />
                      <span className="text-xs">Your Location</span>
                    </div>
                  </div>
                </div>

                {/* Call to action */}
                {!volunteerMode && (
                  <div className="absolute bottom-4 left-1/2 z-10 w-4/5 -translate-x-1/2 rounded-lg bg-background/90 p-4 text-center shadow-lg backdrop-blur-sm">
                    <h3 className="mb-2 font-medium">Be a Guardian for Others</h3>
                    <p className="mb-3 text-sm text-muted-foreground">
                      Join our network of safety volunteers and help make your community safer for women
                    </p>
                    <Button className="gap-1" onClick={() => setVolunteerMode(true)}>
                      <Shield className="h-4 w-4" />
                      Become a Guardian
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
