"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, UserPlus } from "lucide-react"
import { Switch } from "@/components/ui/switch"

// Sample emergency contacts data
const initialContacts = [
  {
    id: 1,
    name: "Emma Johnson",
    phone: "+1 (555) 123-4567",
    relationship: "Sister",
    priority: true,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Michael Chen",
    phone: "+1 (555) 987-6543",
    relationship: "Friend",
    priority: true,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Sarah Williams",
    phone: "+1 (555) 234-5678",
    relationship: "Roommate",
    priority: false,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function ContactsPage() {
  const [contacts, setContacts] = useState(initialContacts)
  const [showAddForm, setShowAddForm] = useState(false)

  const handleTogglePriority = (id: number) => {
    setContacts(contacts.map((contact) => (contact.id === id ? { ...contact, priority: !contact.priority } : contact)))
  }

  const handleDeleteContact = (id: number) => {
    setContacts(contacts.filter((contact) => contact.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Emergency Contacts</h1>
          <p className="text-muted-foreground">Manage your trusted contacts for emergency situations</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Contact
        </Button>
      </div>

      {showAddForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Contact</CardTitle>
            <CardDescription>Add someone you trust to be notified in case of emergency</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="Enter phone number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="relationship">Relationship</Label>
                <Input id="relationship" placeholder="E.g. Friend, Family, etc." />
              </div>
              <div className="flex items-end space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="priority" />
                  <Label htmlFor="priority">Priority Contact</Label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
            <Button>Save Contact</Button>
          </CardFooter>
        </Card>
      )}

      <div className="space-y-4">
        {contacts.map((contact) => (
          <Card key={contact.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                  <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium">{contact.name}</h3>
                    {contact.priority && (
                      <Badge variant="outline" className="ml-2 bg-primary/10 text-primary">
                        Priority
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{contact.phone}</p>
                  <p className="text-xs text-muted-foreground">{contact.relationship}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" onClick={() => handleTogglePriority(contact.id)}>
                  <Switch checked={contact.priority} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteContact(contact.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
