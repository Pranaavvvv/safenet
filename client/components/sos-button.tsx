"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Phone } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

type SosButtonProps = {
  size?: "default" | "small"
}

export default function SosButton({ size = "default" }: SosButtonProps) {
  const [isPressed, setIsPressed] = useState(false)
  const [holdProgress, setHoldProgress] = useState(0)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const { toast } = useToast()

  const handleHoldStart = () => {
    setIsPressed(true)
    let progress = 0
    const interval = setInterval(() => {
      progress += 4
      setHoldProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setIsPressed(false)
        setHoldProgress(0)
        setShowConfirmation(true)

        // This would be where you call your backend API
        triggerEmergencyAlert()

        setTimeout(() => setShowConfirmation(false), 3000)
      }
    }, 100)

    const cleanup = () => {
      clearInterval(interval)
      setIsPressed(false)
      setHoldProgress(0)
    }

    document.addEventListener("mouseup", cleanup, { once: true })
    document.addEventListener("touchend", cleanup, { once: true })
  }

  // This function would call your backend API
  const triggerEmergencyAlert = async () => {
    try {
      // Example of how you would integrate with your backend
      // const response = await fetch('/api/emergency/trigger', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     timestamp: new Date().toISOString(),
      //     location: { /* Get user location */ },
      //   }),
      // });

      // if (!response.ok) throw new Error('Failed to send emergency alert');

      toast({
        title: "Emergency Alert Sent",
        description: "Your emergency contacts have been notified of your situation.",
      })
    } catch (error) {
      console.error("Failed to send emergency alert:", error)
      toast({
        title: "Alert Failed",
        description: "Unable to send emergency alert. Please try again or call emergency services directly.",
        variant: "destructive",
      })
    }
  }

  const buttonSize = size === "small" ? "h-14 w-14" : "h-24 w-24 sm:h-32 sm:w-32"
  const iconSize = size === "small" ? "h-6 w-6" : "h-10 w-10 sm:h-12 sm:w-12"
  const textSize = size === "small" ? "text-xs" : "text-sm sm:text-base"

  return (
    <div className="relative">
      {/* Ripple effect */}
      <AnimatePresence>
        {isPressed && (
          <>
            <motion.div
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/20"
              style={{ width: size === "small" ? 56 : 96, height: size === "small" ? 56 : 96 }}
            />
            <motion.div
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, delay: 0.2, repeat: Number.POSITIVE_INFINITY }}
              className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/30"
              style={{ width: size === "small" ? 56 : 96, height: size === "small" ? 56 : 96 }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Progress ring */}
      <svg
        className={cn(
          "absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 rotate-90",
          size === "small" ? "h-16 w-16" : "h-28 w-28 sm:h-36 sm:w-36",
        )}
      >
        <motion.circle
          cx="50%"
          cy="50%"
          r={size === "small" ? "27" : "45"}
          strokeWidth={size === "small" ? "4" : "6"}
          stroke="hsl(var(--primary))"
          fill="none"
          strokeDasharray="100 100"
          initial={{ strokeDashoffset: 100 }}
          animate={{ strokeDashoffset: 100 - holdProgress }}
          className="transition-all"
        />
      </svg>

      {/* Main SOS button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={cn("relative", buttonSize)}>
        <Button
          variant="destructive"
          className={cn("h-full w-full rounded-full p-0 shadow-lg", isPressed ? "bg-red-600" : "")}
          onMouseDown={handleHoldStart}
          onTouchStart={handleHoldStart}
        >
          <div className="flex flex-col items-center justify-center gap-1">
            <motion.div
              animate={isPressed ? { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] } : {}}
              transition={{ duration: 0.5, repeat: isPressed ? Number.POSITIVE_INFINITY : 0 }}
            >
              {isPressed ? (
                <Phone className={cn("text-white", iconSize)} />
              ) : (
                <AlertTriangle className={cn("text-white", iconSize)} />
              )}
            </motion.div>
            <span className={cn("font-bold text-white", textSize)}>{isPressed ? "HOLD" : "SOS"}</span>
          </div>
        </Button>
      </motion.div>

      {/* Confirmation popup */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-1/2 top-full z-50 mt-4 w-64 -translate-x-1/2 rounded-lg bg-green-100 p-4 text-center text-green-800 shadow-lg"
          >
            <p className="font-medium">Emergency alert sent!</p>
            <p className="text-sm">Your emergency contacts have been notified</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
