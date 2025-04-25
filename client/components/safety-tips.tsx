"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Lightbulb } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const safetyTips = [
  {
    id: 1,
    title: "Trust Your Instincts",
    description:
      "If a situation feels unsafe, it probably is. Don't ignore your intuition - it's your natural defense mechanism.",
    category: "general",
  },
  {
    id: 2,
    title: "Share Your Location",
    description:
      "Let trusted contacts know your whereabouts when traveling alone, especially at night or in unfamiliar areas.",
    category: "travel",
  },
  {
    id: 3,
    title: "Stay Alert in Public",
    description: "Avoid using headphones or being distracted by your phone in isolated areas or when walking alone.",
    category: "public",
  },
  {
    id: 4,
    title: "Use Well-Lit Routes",
    description:
      "Stick to well-lit, populated paths even if they're slightly longer. Avoid shortcuts through isolated areas.",
    category: "travel",
  },
  {
    id: 5,
    title: "Check Rideshare Details",
    description: "Always verify the license plate, car model, and driver's name before entering a rideshare vehicle.",
    category: "travel",
  },
]

export default function SafetyTips() {
  const [currentTip, setCurrentTip] = useState(0)
  const [direction, setDirection] = useState(0)

  const handleNext = () => {
    setDirection(1)
    setCurrentTip((prev) => (prev === safetyTips.length - 1 ? 0 : prev + 1))
  }

  const handlePrevious = () => {
    setDirection(-1)
    setCurrentTip((prev) => (prev === 0 ? safetyTips.length - 1 : prev - 1))
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "general":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "travel":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "public":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const tip = safetyTips[currentTip]

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/50 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, 15, 0, -15, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 5 }}
            >
              <Lightbulb className="h-5 w-5 text-primary" />
            </motion.div>
            Safety Tips
          </CardTitle>
          <Badge variant="outline" className={cn(getCategoryColor(tip.category))}>
            {tip.category.charAt(0).toUpperCase() + tip.category.slice(1)}
          </Badge>
        </div>
        <CardDescription>Essential safety advice to keep you protected</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative overflow-hidden px-6 py-6">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={tip.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -200 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="min-h-[120px]"
            >
              <h3 className="mb-2 text-xl font-bold">{tip.title}</h3>
              <p className="text-muted-foreground">{tip.description}</p>
            </motion.div>
          </AnimatePresence>

          {/* Decorative elements */}
          <motion.div
            className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-primary/5"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-secondary/5"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>

        <div className="flex items-center justify-between border-t bg-muted/30 p-2">
          <Button variant="ghost" size="icon" onClick={handlePrevious}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex gap-1">
            {safetyTips.map((_, index) => (
              <motion.div
                key={index}
                className={cn("h-1.5 w-1.5 rounded-full", index === currentTip ? "bg-primary" : "bg-primary/30")}
                animate={index === currentTip ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.5 }}
              />
            ))}
          </div>
          <Button variant="ghost" size="icon" onClick={handleNext}>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
