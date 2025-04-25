"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertTriangle, Bell, Calendar, Check, Clock, MapPin, Plus, RotateCcw, User, UserPlus, X } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SafeWalkPage() {
  const [walkDate, setWalkDate] = useState("")
  const [walkTime, setWalkTime] = useState("")
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [estimatedDuration, setEstimatedDuration] = useState("20")
  const [selectedContacts, setSelectedContacts] = useState<string[]>(["contact1"])
  const [autoAlert, setAutoAlert] = useState(true)
  const [scheduledWalks, setScheduledWalks] = useState([
    {
      id: 1,
      date: "Today",
      time: "7:30 PM",
      origin: "Home",
      destination: "Gym",
      duration: "25 min",
      contacts: ["contact1", "contact2"],
      status: "upcoming",
    },
    {
      id: 2,
      date: "Tomorrow",
      time: "8:00 AM",
      origin: "Home",
      destination: "Work",
      duration: "35 min",
      contacts: ["contact1"],
      status: "upcoming",
    },
    {
      id: 3,
      date: "Yesterday",
      time: "9:15 PM",
      origin: "Friend's House",
      destination: "Home",
      duration: "20 min",
      contacts: ["contact2"],
      status: "completed",
    },
  ])

  const contacts = [
    { id: "contact1", name: "Emma Johnson", relationship: "Sister", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "contact2", name: "Michael Chen", relationship: "Friend", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "contact3", name: "Sarah Williams", relationship: "Roommate", avatar: "/placeholder.svg?height=40&width=40" },
  ]

  const handleToggleContact = (contactId: string) => {
    setSelectedContacts((prev) =>
      prev.includes(contactId) ? prev.filter((id) => id !== contactId) : [...prev, contactId],
    )
  }

  const handleScheduleWalk = () => {
    if (!walkDate || !walkTime || !origin || !destination) return

    const newWalk = {
      id: Date.now(),
      date: walkDate,
      time: walkTime,
      origin,
      destination,
      duration: `${estimatedDuration} min`,
      contacts: selectedContacts,
      status: "upcoming" as const,
    }

    setScheduledWalks([newWalk, ...scheduledWalks])

    // Reset form
    setWalkDate("")
    setWalkTime("")
    setOrigin("")
    setDestination("")
    setEstimatedDuration("20")
    setSelectedContacts(["contact1"])
  }

  const handleCancelWalk = (id: number) => {
    setScheduledWalks(scheduledWalks.filter((walk) => walk.id !== id))
  }

  const handleCompleteWalk = (id: number) => {
    setScheduledWalks(scheduledWalks.map((walk) => (walk.id === id ? { ...walk, status: "completed" as const } : walk)))
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Scheduled Safe Walk</h1>
        <p className="text-muted-foreground">Plan your walks and keep trusted contacts informed</p>
      </div>

      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="schedule">Schedule Walk</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming & History</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Plan Your Safe Walk</CardTitle>
              <CardDescription>Schedule a walk and notify your trusted contacts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="walk-date">Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="walk-date"
                      type="date"
                      className="pl-10"
                      value={walkDate}
                      onChange={(e) => setWalkDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="walk-time">Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="walk-time"
                      type="time"
                      className="pl-10"
                      value={walkTime}
                      onChange={(e) => setWalkTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="origin">Starting Point</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="origin"
                    placeholder="Enter your starting location"
                    className="pl-10"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="destination"
                    placeholder="Enter your destination"
                    className="pl-10"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Estimated Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="5"
                  max="180"
                  value={estimatedDuration}
                  onChange={(e) => setEstimatedDuration(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  SafeNet will alert your contacts if you don't check in after this time
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Notify These Contacts</Label>
                  <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                    <UserPlus className="h-3 w-3" />
                    Add New
                  </Button>
                </div>

                <div className="space-y-2">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={cn(
                        "flex items-center justify-between rounded-lg border p-3 transition-all",
                        selectedContacts.includes(contact.id) ? "border-primary bg-primary/5" : "hover:bg-muted/50",
                      )}
                      onClick={() => handleToggleContact(contact.id)}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{contact.name}</p>
                          <p className="text-xs text-muted-foreground">{contact.relationship}</p>
                        </div>
                      </div>
                      <div
                        className={cn(
                          "flex h-5 w-5 items-center justify-center rounded-full border",
                          selectedContacts.includes(contact.id)
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-muted-foreground",
                        )}
                      >
                        {selectedContacts.includes(contact.id) && <Check className="h-3 w-3" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Automatic Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      Send alerts if you don't check in after the estimated duration
                    </p>
                  </div>
                </div>
                <Switch checked={autoAlert} onCheckedChange={setAutoAlert} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-4">
              <Button variant="outline" className="flex-1">
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <Button
                className="flex-1"
                onClick={handleScheduleWalk}
                disabled={!walkDate || !walkTime || !origin || !destination || selectedContacts.length === 0}
              >
                Schedule Walk
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6">
          <div className="space-y-6">
            <div>
              <h2 className="mb-4 text-xl font-bold">Upcoming Walks</h2>
              {scheduledWalks.filter((walk) => walk.status === "upcoming").length > 0 ? (
                <div className="space-y-4">
                  {scheduledWalks
                    .filter((walk) => walk.status === "upcoming")
                    .map((walk) => (
                      <Card key={walk.id}>
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="border-b p-4 md:border-b-0 md:border-r md:p-6">
                              <div className="mb-2 flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-primary" />
                                <span className="font-medium">{walk.date}</span>
                                <span className="text-muted-foreground">•</span>
                                <Clock className="h-4 w-4 text-primary" />
                                <span className="font-medium">{walk.time}</span>
                              </div>
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="bg-primary/10 text-primary">
                                    From
                                  </Badge>
                                  <span>{walk.origin}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="bg-primary/10 text-primary">
                                    To
                                  </Badge>
                                  <span>{walk.destination}</span>
                                </div>
                              </div>
                            </div>

                            <div className="p-4 md:p-6">
                              <div className="mb-2 flex items-center justify-between">
                                <span className="text-sm font-medium">Duration: {walk.duration}</span>
                                <Badge variant="outline">Upcoming</Badge>
                              </div>
                              <div className="mb-4">
                                <p className="text-sm text-muted-foreground">Notifying:</p>
                                <div className="mt-1 flex -space-x-2">
                                  {walk.contacts.map((contactId) => {
                                    const contact = contacts.find((c) => c.id === contactId)
                                    return (
                                      <Avatar key={contactId} className="h-6 w-6 border-2 border-background">
                                        <AvatarImage src={contact?.avatar || "/placeholder.svg"} alt={contact?.name} />
                                        <AvatarFallback className="text-xs">{contact?.name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                    )
                                  })}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1"
                                  onClick={() => handleCancelWalk(walk.id)}
                                >
                                  <X className="mr-1 h-3 w-3" />
                                  Cancel
                                </Button>
                                <Button size="sm" className="flex-1" onClick={() => handleCompleteWalk(walk.id)}>
                                  <Check className="mr-1 h-3 w-3" />
                                  Complete
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <div className="mb-4 rounded-full bg-muted p-3">
                      <Calendar className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="mb-1 font-medium">No upcoming walks</h3>
                    <p className="text-sm text-muted-foreground">
                      Schedule a safe walk to keep your trusted contacts informed
                    </p>
                    <Button className="mt-4 gap-1">
                      <Plus className="h-4 w-4" />
                      Schedule Walk
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            <div>
              <h2 className="mb-4 text-xl font-bold">Walk History</h2>
              {scheduledWalks.filter((walk) => walk.status === "completed").length > 0 ? (
                <div className="space-y-4">
                  {scheduledWalks
                    .filter((walk) => walk.status === "completed")
                    .map((walk) => (
                      <Card key={walk.id} className="opacity-70">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="mb-2 flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{walk.date}</span>
                                <span className="text-muted-foreground">•</span>
                                <Clock className="h-4 w-4" />
                                <span>{walk.time}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <span>{walk.origin}</span>
                                <AlertTriangle className="h-3 w-3" />
                                <span>{walk.destination}</span>
                              </div>
                            </div>
                            <Badge
                              variant="outline"
                              className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                            >
                              Completed
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">No walk history yet</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
