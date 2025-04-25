"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, MapPin, MoreHorizontal } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const reports = [
  {
    id: 1,
    title: "Suspicious Activity",
    location: "Central Park, West Side",
    time: "Today, 2:30 PM",
    severity: "medium",
    description: "Individual following people and acting erratically near the fountain area.",
  },
  {
    id: 2,
    title: "Street Harassment",
    location: "Main St & 5th Avenue",
    time: "Yesterday, 7:15 PM",
    severity: "high",
    description: "Group of men catcalling and following women leaving the shopping center.",
  },
  {
    id: 3,
    title: "Poor Lighting",
    location: "Riverside Walking Path",
    time: "2 days ago, 9:45 PM",
    severity: "low",
    description: "Several street lights out along the north section of the walking path.",
  },
]

export default function RecentReports() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "medium":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/50 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 5 }}
            >
              <AlertTriangle className="h-5 w-5 text-primary" />
            </motion.div>
            Recent Reports
          </CardTitle>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
        <CardDescription>Recent safety incidents reported in your area</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <motion.div variants={container} initial="hidden" animate="show" className="divide-y">
          {reports.map((report) => (
            <motion.div
              key={report.id}
              variants={item}
              className="group relative overflow-hidden p-4 transition-all hover:bg-muted/50"
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-medium">{report.title}</h3>
                <Badge variant="outline" className={cn(getSeverityColor(report.severity))}>
                  {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)}
                </Badge>
              </div>
              <p className="mb-3 text-sm text-muted-foreground">{report.description}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{report.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{report.time}</span>
                </div>
              </div>

              {/* Animated highlight effect on hover */}
              <motion.div
                className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100"
                initial={{ x: -200 }}
                whileHover={{ x: 400 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </motion.div>
          ))}
        </motion.div>
        <div className="flex justify-center border-t bg-muted/30 p-2">
          <Button variant="ghost" size="sm" className="text-xs">
            View All Reports
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
