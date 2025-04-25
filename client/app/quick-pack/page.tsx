"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  Battery,
  Bell,
  ChevronDown,
  ChevronUp,
  Flashlight,
  Key,
  MapPin,
  Phone,
  Plus,
  Shield,
  Smartphone,
  Sparkles,
  Wallet,
} from "lucide-react"
import { cn } from "@/lib/utils"

type ChecklistItem = {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  category: "essential" | "recommended" | "optional"
  checked: boolean
}

export default function QuickPackPage() {
  const [items, setItems] = useState<ChecklistItem[]>([
    {
      id: "phone",
      name: "Phone",
      icon: <Smartphone className="h-5 w-5" />,
      description: "Fully charged with emergency contacts saved",
      category: "essential",
      checked: true,
    },
    {
      id: "powerbank",
      name: "Power Bank",
      icon: <Battery className="h-5 w-5" />,
      description: "Portable charger for your devices",
      category: "essential",
      checked: false,
    },
    {
      id: "id",
      name: "ID Card",
      icon: <Key className="h-5 w-5" />,
      description: "Government-issued identification",
      category: "essential",
      checked: true,
    },
    {
      id: "cash",
      name: "Emergency Cash",
      icon: <Wallet className="h-5 w-5" />,
      description: "Small amount of cash for emergencies",
      category: "essential",
      checked: false,
    },
    {
      id: "whistle",
      name: "Safety Whistle",
      icon: <Bell className="h-5 w-5" />,
      description: "Loud whistle to attract attention",
      category: "recommended",
      checked: false,
    },
    {
      id: "pepperspray",
      name: "Pepper Spray",
      icon: <Sparkles className="h-5 w-5" />,
      description: "Legal self-defense tool",
      category: "recommended",
      checked: false,
    },
    {
      id: "flashlight",
      name: "Mini Flashlight",
      icon: <Flashlight className="h-5 w-5" />,
      description: "Small light source for dark areas",
      category: "recommended",
      checked: false,
    },
    {
      id: "tracker",
      name: "Personal Tracker",
      icon: <MapPin className="h-5 w-5" />,
      description: "GPS tracking device for emergencies",
      category: "optional",
      checked: false,
    },
    {
      id: "alarmdevice",
      name: "Personal Alarm",
      icon: <AlertTriangle className="h-5 w-5" />,
      description: "Loud alarm to deter threats",
      category: "optional",
      checked: false,
    },
  ])

  const [activeCategory, setActiveCategory] = useState<"all" | "essential" | "recommended" | "optional">("all")
  const [expandedItems, setExpandedItems] = useState<string[]>(["essential"])

  const handleToggleItem = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)))
  }

  const handleToggleExpand = (value: string) => {
    setExpandedItems((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  const filteredItems = activeCategory === "all" ? items : items.filter((item) => item.category === activeCategory)

  const essentialItems = items.filter((item) => item.category === "essential")
  const recommendedItems = items.filter((item) => item.category === "recommended")
  const optionalItems = items.filter((item) => item.category === "optional")

  const getCompletionPercentage = (categoryItems: ChecklistItem[]) => {
    if (categoryItems.length === 0) return 0
    const checkedCount = categoryItems.filter((item) => item.checked).length
    return Math.round((checkedCount / categoryItems.length) * 100)
  }

  const totalCompletion = getCompletionPercentage(items)
  const essentialCompletion = getCompletionPercentage(essentialItems)
  const recommendedCompletion = getCompletionPercentage(recommendedItems)
  const optionalCompletion = getCompletionPercentage(optionalItems)

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Quick Pack Checklist</h1>
        <p className="text-muted-foreground">Essential items to carry for your safety</p>
      </div>

      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2 text-primary">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Safety Essentials</CardTitle>
                <CardDescription>Items to keep with you for personal safety</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              <span
                className={cn(
                  totalCompletion >= 70
                    ? "text-green-600 dark:text-green-400"
                    : totalCompletion >= 40
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-red-600 dark:text-red-400",
                )}
              >
                {totalCompletion}%
              </span>{" "}
              Complete
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="all" onValueChange={(value) => setActiveCategory(value as any)} className="w-full">
            <div className="border-b px-6 py-2">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="essential">Essential</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                <TabsTrigger value="optional">Optional</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="divide-y">
                <div
                  className="flex cursor-pointer items-center justify-between p-4 hover:bg-muted/50"
                  onClick={() => handleToggleExpand("essential")}
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
                      Essential
                    </Badge>
                    <span className="text-sm font-medium">Must-have items</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{essentialCompletion}%</span>
                    {expandedItems.includes("essential") ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </div>

                {expandedItems.includes("essential") &&
                  essentialItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 transition-all hover:bg-muted/30">
                      <Checkbox
                        id={item.id}
                        checked={item.checked}
                        onCheckedChange={() => handleToggleItem(item.id)}
                        className="h-5 w-5"
                      />
                      <div className="flex flex-1 items-center gap-3">
                        <div
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-full",
                            item.checked ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
                          )}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <Label htmlFor={item.id} className="font-medium">
                            {item.name}
                          </Label>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                <div
                  className="flex cursor-pointer items-center justify-between p-4 hover:bg-muted/50"
                  onClick={() => handleToggleExpand("recommended")}
                >
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                    >
                      Recommended
                    </Badge>
                    <span className="text-sm font-medium">Strongly advised items</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{recommendedCompletion}%</span>
                    {expandedItems.includes("recommended") ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </div>

                {expandedItems.includes("recommended") &&
                  recommendedItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 transition-all hover:bg-muted/30">
                      <Checkbox
                        id={item.id}
                        checked={item.checked}
                        onCheckedChange={() => handleToggleItem(item.id)}
                        className="h-5 w-5"
                      />
                      <div className="flex flex-1 items-center gap-3">
                        <div
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-full",
                            item.checked ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
                          )}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <Label htmlFor={item.id} className="font-medium">
                            {item.name}
                          </Label>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                <div
                  className="flex cursor-pointer items-center justify-between p-4 hover:bg-muted/50"
                  onClick={() => handleToggleExpand("optional")}
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                      Optional
                    </Badge>
                    <span className="text-sm font-medium">Additional safety items</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{optionalCompletion}%</span>
                    {expandedItems.includes("optional") ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </div>

                {expandedItems.includes("optional") &&
                  optionalItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 transition-all hover:bg-muted/30">
                      <Checkbox
                        id={item.id}
                        checked={item.checked}
                        onCheckedChange={() => handleToggleItem(item.id)}
                        className="h-5 w-5"
                      />
                      <div className="flex flex-1 items-center gap-3">
                        <div
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-full",
                            item.checked ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
                          )}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <Label htmlFor={item.id} className="font-medium">
                            {item.name}
                          </Label>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="essential" className="mt-0">
              <div className="divide-y">
                {essentialItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 transition-all hover:bg-muted/30">
                    <Checkbox
                      id={`${item.id}-essential`}
                      checked={item.checked}
                      onCheckedChange={() => handleToggleItem(item.id)}
                      className="h-5 w-5"
                    />
                    <div className="flex flex-1 items-center gap-3">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full",
                          item.checked ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
                        )}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <Label htmlFor={`${item.id}-essential`} className="font-medium">
                          {item.name}
                        </Label>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recommended" className="mt-0">
              <div className="divide-y">
                {recommendedItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 transition-all hover:bg-muted/30">
                    <Checkbox
                      id={`${item.id}-recommended`}
                      checked={item.checked}
                      onCheckedChange={() => handleToggleItem(item.id)}
                      className="h-5 w-5"
                    />
                    <div className="flex flex-1 items-center gap-3">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full",
                          item.checked ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
                        )}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <Label htmlFor={`${item.id}-recommended`} className="font-medium">
                          {item.name}
                        </Label>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="optional" className="mt-0">
              <div className="divide-y">
                {optionalItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 transition-all hover:bg-muted/30">
                    <Checkbox
                      id={`${item.id}-optional`}
                      checked={item.checked}
                      onCheckedChange={() => handleToggleItem(item.id)}
                      className="h-5 w-5"
                    />
                    <div className="flex flex-1 items-center gap-3">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full",
                          item.checked ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
                        )}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <Label htmlFor={`${item.id}-optional`} className="font-medium">
                          {item.name}
                        </Label>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-4">
          <Button variant="outline" className="gap-1">
            <Plus className="h-4 w-4" />
            Add Custom Item
          </Button>
          <Button className="gap-1">
            <Phone className="h-4 w-4" />
            Share Checklist
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
