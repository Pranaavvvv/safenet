"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Activity,
  AlertCircle,
  Bot,
  Calendar,
  Camera,
  CheckSquare,
  Lock,
  MapPin,
  Menu,
  Phone,
  QrCode,
  RotateCcw,
  Shield,
  Siren,
  UserCircle,
  X,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { motion, AnimatePresence } from "framer-motion"

const routes = [
  {
    name: "Dashboard",
    path: "/",
    icon: <Shield className="h-5 w-5" />,
  },
  {
    name: "Map",
    path: "/map",
    icon: <MapPin className="h-5 w-5" />,
  },
  {
    name: "Route Predictor",
    path: "/route-predictor",
    icon: <RotateCcw className="h-5 w-5" />,
  },
  {
    name: "Emergency Contacts",
    path: "/contacts",
    icon: <Phone className="h-5 w-5" />,
  },
  {
    name: "Report",
    path: "/report",
    icon: <AlertCircle className="h-5 w-5" />,
  },
  {
    name: "AI Companion",
    path: "/ai-companion",
    icon: <Bot className="h-5 w-5" />,
  },
  {
    name: "Training",
    path: "/training",
    icon: <Activity className="h-5 w-5" />,
  },
  {
    name: "Emergency Recorder",
    path: "/emergency-recorder",
    icon: <Camera className="h-5 w-5" />,
  },
  {
    name: "Quick Pack",
    path: "/quick-pack",
    icon: <CheckSquare className="h-5 w-5" />,
  },
  {
    name: "QR Code",
    path: "/qr-code",
    icon: <QrCode className="h-5 w-5" />,
  },
  {
    name: "Safe Walk",
    path: "/safe-walk",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    name: "Wellness",
    path: "/wellness",
    icon: <Activity className="h-5 w-5" />,
  },
  {
    name: "Public Mode",
    path: "/public-mode",
    icon: <Lock className="h-5 w-5" />,
  },
  {
    name: "Emergency Toolkit",
    path: "/emergency-toolkit",
    icon: <Siren className="h-5 w-5" />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <UserCircle className="h-5 w-5" />,
  },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300",
        scrolled && "shadow-md",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <div className="flex items-center gap-2 px-2">
                <Link href="/" className="flex items-center gap-2 font-bold" onClick={() => setOpen(false)}>
                  <motion.div initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ duration: 1 }}>
                    <Shield className="h-6 w-6 text-primary" />
                  </motion.div>
                  <span className="gradient-text">SafeNet</span>
                </Link>
                <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setOpen(false)}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              <nav className="mt-8 flex flex-col gap-4">
                <AnimatePresence>
                  {routes.map((route, index) => (
                    <motion.div
                      key={route.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={route.path}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground",
                          pathname === route.path && "bg-primary/10 font-medium text-primary",
                        )}
                      >
                        <motion.div whileHover={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.5 }}>
                          {route.icon}
                        </motion.div>
                        {route.name}
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2 font-bold">
            <motion.div whileHover={{ scale: 1.1, rotate: 10 }} className="safety-glow rounded-full p-1">
              <Shield className="h-6 w-6 text-primary" />
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden md:inline-block gradient-text"
            >
              SafeNet
            </motion.span>
          </Link>
        </div>
        <nav className="hidden md:flex md:items-center md:gap-6">
          {routes.slice(0, 6).map((route, index) => (
            <motion.div
              key={route.path}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <Link
                href={route.path}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground relative",
                  pathname === route.path && "text-primary",
                )}
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {route.icon}
                </motion.div>
                <span>{route.name}</span>

                {/* Animated underline for active link */}
                {pathname === route.path && (
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary"
                    layoutId="navbar-underline"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </nav>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2"
        >
          <ThemeToggle />
        </motion.div>
      </div>
    </motion.header>
  )
}
