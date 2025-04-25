"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"

export default function TestimonialsPage() {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai, India",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "SafeNet has completely changed how I feel walking home at night. The SOS feature gave me the confidence to take that evening class I'd been avoiding for months.",
      feature: "SOS Button",
      rating: 5,
    },
    {
      id: 2,
      name: "Jessica Williams",
      location: "Chicago, USA",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "After moving to a new city, the safety map helped me identify which areas to avoid. When I had to walk through a less safe neighborhood, the Guardian Network connected me with a volunteer who walked me home safely.",
      feature: "Guardian Network",
      rating: 5,
    },
    {
      id: 3,
      name: "Mei Lin",
      location: "Singapore",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "The fake call feature helped me escape an uncomfortable situation with a persistent stranger. It looked so realistic that he immediately backed off when my 'mom' called.",
      feature: "Fake Call",
      rating: 5,
    },
    {
      id: 4,
      name: "Sophia Rodriguez",
      location: "Mexico City, Mexico",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "I use the Safe Walk feature every time I take public transport late at night. My family can track my journey in real-time, which gives all of us peace of mind.",
      feature: "Safe Walk",
      rating: 5,
    },
    {
      id: 5,
      name: "Amara Okafor",
      location: "Lagos, Nigeria",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "The emergency recorder automatically captured evidence when I was being followed. I shared it with authorities and they were able to identify the person. This app doesn't just make you feel safe - it actually helps create justice.",
      feature: "Emergency Recorder",
      rating: 5,
    },
  ]

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Real Stories from Real Women</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Hear from women around the world whose lives have been impacted by SafeNet's protection and empowerment.
        </p>
      </div>

      <div className="relative mx-auto max-w-4xl">
        <div className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 md:-left-12">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full border-primary/20 bg-background/80 backdrop-blur-sm"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </div>

        <div className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 md:-right-12">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full border-primary/20 bg-background/80 backdrop-blur-sm"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        <div className="relative h-[500px] overflow-hidden rounded-xl border border-primary/20 bg-primary/5 p-8 safety-glow">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex h-full flex-col items-center justify-center"
            >
              <Quote className="mb-6 h-12 w-12 text-primary/40" />

              <p className="mb-8 text-center text-xl font-medium italic md:text-2xl">
                "{testimonials[activeIndex].quote}"
              </p>

              <div className="flex flex-col items-center">
                <Avatar className="mb-3 h-16 w-16 border-2 border-primary/20">
                  <AvatarImage
                    src={testimonials[activeIndex].image || "/placeholder.svg"}
                    alt={testimonials[activeIndex].name}
                  />
                  <AvatarFallback>{testimonials[activeIndex].name.charAt(0)}</AvatarFallback>
                </Avatar>

                <h3 className="text-lg font-bold">{testimonials[activeIndex].name}</h3>
                <p className="mb-2 text-sm text-muted-foreground">{testimonials[activeIndex].location}</p>

                <Badge variant="outline" className="mb-3 bg-primary/10 text-primary">
                  {testimonials[activeIndex].feature}
                </Badge>

                <div className="flex">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex justify-center space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                index === activeIndex ? "w-6 bg-primary" : "bg-primary/30"
              }`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>

      <div className="mt-20 grid gap-6 md:grid-cols-3">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="rounded-full bg-primary/10 p-2">
                <Star className="h-5 w-5 text-primary" />
              </div>
              Global Impact
            </CardTitle>
            <CardDescription>Reaching women worldwide</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">500,000+</div>
            <p className="text-muted-foreground">Women using SafeNet across 45 countries</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="rounded-full bg-primary/10 p-2">
                <Star className="h-5 w-5 text-primary" />
              </div>
              Emergency Responses
            </CardTitle>
            <CardDescription>Real emergencies addressed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">12,500+</div>
            <p className="text-muted-foreground">Successful emergency responses coordinated</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="rounded-full bg-primary/10 p-2">
                <Star className="h-5 w-5 text-primary" />
              </div>
              Guardian Network
            </CardTitle>
            <CardDescription>Community protection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">75,000+</div>
            <p className="text-muted-foreground">Volunteer guardians providing community support</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-20 rounded-lg border border-primary/20 bg-primary/5 p-8 text-center safety-glow">
        <h2 className="mb-4 text-2xl font-bold">Share Your SafeNet Story</h2>
        <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
          Has SafeNet made a difference in your life? We'd love to hear your story and share it with our community to
          inspire others.
        </p>
        <Button className="bg-gradient-to-r from-pink-500 to-primary hover:from-pink-600 hover:to-primary/90 transition-all duration-300">
          Submit Your Story
        </Button>
      </div>
    </div>
  )
}
