"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Shield, Sparkles, Award, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AboutUsPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Former security professional with a passion for women's safety. Started SafeNet after her own experience with harassment.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Maya Patel",
      role: "Head of Technology",
      bio: "Tech innovator focused on creating accessible safety solutions for women from all walks of life.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Olivia Chen",
      role: "Community Director",
      bio: "Advocate for women's rights with extensive experience building support networks and safety communities.",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Our Mission</h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
          SafeNet was born from a simple yet powerful idea: every woman deserves to feel safe, confident, and empowered
          in their daily lives. We're building technology with heart to protect our sisters, mothers, daughters, and
          friends.
        </p>
      </motion.div>

      <div className="mb-20 grid gap-8 md:grid-cols-3">
        {[
          {
            icon: <Shield className="h-10 w-10 text-primary" />,
            title: "Protection",
            description: "We provide tools that offer real-time protection and emergency response when needed most.",
          },
          {
            icon: <Heart className="h-10 w-10 text-primary" />,
            title: "Compassion",
            description: "Our approach is built on understanding the unique safety concerns women face every day.",
          },
          {
            icon: <Sparkles className="h-10 w-10 text-primary" />,
            title: "Empowerment",
            description: "We don't just protect - we empower women to move through the world with confidence.",
          },
        ].map((item, i) => (
          <motion.div key={i} custom={i} variants={fadeIn} initial="hidden" animate="visible">
            <Card className="h-full border-primary/20 transition-all hover:border-primary/50 hover:shadow-md">
              <CardHeader>
                <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">{item.icon}</div>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold">Our Story</h2>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-lg">
              SafeNet began in 2023 when our founder, Sarah, experienced a frightening situation walking home one night.
              Despite having a phone, she realized there was no easy way to quickly alert loved ones or get help.
            </p>
            <p className="mb-4 text-lg">
              That night sparked a mission: to create technology that could have made a difference in that moment of
              vulnerability - not just for her, but for all women.
            </p>
            <p className="text-lg">
              Today, SafeNet has grown into a comprehensive safety platform with a community of guardians, all united by
              the belief that technology can and should help protect those we care about most.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="mb-20">
        <h2 className="mb-8 text-center text-3xl font-bold">Meet Our Team</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {teamMembers.map((member, i) => (
            <motion.div key={i} custom={i} variants={fadeIn} initial="hidden" animate="visible">
              <Card className="overflow-hidden border-primary/20 transition-all hover:border-primary/50 hover:shadow-md">
                <div className="aspect-square w-full overflow-hidden bg-muted">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="rounded-lg bg-primary/5 p-8 text-center border border-primary/20 safety-glow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Award className="mx-auto mb-4 h-12 w-12 text-primary" />
        <h2 className="mb-4 text-2xl font-bold">Join Our Mission</h2>
        <p className="mx-auto mb-6 max-w-2xl text-lg">
          We believe in a world where every woman can walk without fear, travel with confidence, and live with the
          freedom they deserve. Join us in making this vision a reality.
        </p>
        <Button
          asChild
          size="lg"
          className="gap-2 bg-gradient-to-r from-pink-500 to-primary hover:from-pink-600 hover:to-primary/90 transition-all duration-300"
        >
          <Link href="/guardian-network">
            Become a Guardian <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}
