"use client"

import { useEffect, useRef, useState } from "react"
import SosButton from "@/components/sos-button"
import SafetyTips from "@/components/safety-tips"
import RecentReports from "@/components/recent-reports"
import { Button } from "@/components/ui/button"
import { ArrowRight, Award, Shield } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

export default function Home() {
  const particlesRef = useRef<HTMLDivElement>(null)
  const [safetyScore, setSafetyScore] = useState<number | null>(null)
  const [showAchievement, setShowAchievement] = useState(false)
  const { toast } = useToast()

  // Create animated particles effect
  useEffect(() => {
    if (!particlesRef.current) return

    const container = particlesRef.current
    const particleCount = 20

    // Clear any existing particles
    container.innerHTML = ""

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.classList.add("particle")

      // Random size between 3-8px
      const size = Math.random() * 5 + 3
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`

      // Random position
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`

      // Random animation duration and delay
      const duration = Math.random() * 20 + 10
      const delay = Math.random() * 5
      particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`

      container.appendChild(particle)
    }

    return () => {
      container.innerHTML = ""
    }
  }, [])

  // Simulate fetching safety score from backend
  useEffect(() => {
    const fetchSafetyScore = async () => {
      try {
        // This would be your actual API call
        // const response = await fetch('/api/user/safety-score');
        // const data = await response.json();
        // setSafetyScore(data.score);

        // Simulating API response
        setTimeout(() => {
          const score = Math.floor(Math.random() * 20) + 80 // Random score between 80-100
          setSafetyScore(score)

          // Show achievement notification if score is high
          if (score > 90) {
            setShowAchievement(true)
            createConfetti()

            setTimeout(() => {
              setShowAchievement(false)
            }, 5000)
          }
        }, 1500)
      } catch (error) {
        console.error("Failed to fetch safety score:", error)
      }
    }

    fetchSafetyScore()
  }, [])

  // Create confetti effect for achievements
  const createConfetti = () => {
    const confettiCount = 100
    const container = document.body

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div")
      confetti.classList.add("confetti")

      // Random position
      confetti.style.left = `${Math.random() * 100}vw`

      // Random color
      const colors = ["#f472b6", "#ec4899", "#fb7185", "#e11d48", "#be123c"]
      confetti.style.setProperty("--confetti-color", colors[Math.floor(Math.random() * colors.length)])

      // Random size
      const size = Math.random() * 8 + 5
      confetti.style.width = `${size}px`
      confetti.style.height = `${size}px`

      // Random rotation
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`

      // Random fall duration
      confetti.style.setProperty("--fall-duration", `${Math.random() * 3 + 2}s`)

      container.appendChild(confetti)

      // Remove confetti after animation
      setTimeout(() => {
        confetti.remove()
      }, 5000)
    }
  }

  return (
    <div className="container relative mx-auto px-4 pb-24 pt-6 md:pt-12">
      {/* Animated particles background */}
      <div ref={particlesRef} className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" />

      <section className="mb-12 flex flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
        >
          Welcome to <span className="text-glow gradient-text">SafeNet</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 max-w-2xl text-lg text-muted-foreground"
        >
          Your personal safety companion. We're on a mission to empower women with tools for safety, confidence, and
          peace of mind wherever they go.
        </motion.p>

        {safetyScore !== null && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="mb-6 flex items-center justify-center gap-2 rounded-full bg-primary/10 px-4 py-2"
          >
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-medium">
              Your Safety Score: <span className="text-primary">{safetyScore}</span>
            </span>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="gap-2 bg-gradient-to-r from-pink-500 to-primary hover:from-pink-600 hover:to-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Link href="/map">
              View Safety Map <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-primary hover:bg-primary/10 transition-all duration-300 animate-border"
          >
            <Link href="/contacts">Manage Emergency Contacts</Link>
          </Button>
        </motion.div>
      </section>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: 0.6,
        }}
        className="mb-12 flex justify-center"
      >
        <SosButton />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="grid gap-8 md:grid-cols-2"
      >
        <div className="card-hover">
          <SafetyTips />
        </div>
        <div className="card-hover">
          <RecentReports />
        </div>
      </motion.div>

      <div className="fixed bottom-6 right-6 md:hidden">
        <SosButton size="small" />
      </div>

      {/* Achievement notification */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 md:bottom-auto md:left-auto md:right-6 md:top-20 md:translate-x-0 z-50 flex items-center gap-3 rounded-lg bg-white p-4 shadow-lg"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
              <Award className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-medium">Achievement Unlocked!</h3>
              <p className="text-sm text-muted-foreground">Safety Expert: Score above 90</p>
            </div>
            <button className="ml-2 rounded-full p-1 hover:bg-muted" onClick={() => setShowAchievement(false)}>
              <span className="sr-only">Dismiss</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
