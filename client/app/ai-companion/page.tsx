"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, Send, Mic, Volume2, User } from "lucide-react"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export default function AICompanionPage() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your SafeNet AI companion. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Simulate AI response
  const simulateResponse = (userMessage: string) => {
    setIsTyping(true)

    // Determine response based on user input keywords
    let responseContent = ""
    const lowerCaseMessage = userMessage.toLowerCase()

    if (
      lowerCaseMessage.includes("scared") ||
      lowerCaseMessage.includes("afraid") ||
      lowerCaseMessage.includes("nervous")
    ) {
      responseContent =
        "It's completely normal to feel scared sometimes. Remember to take deep breaths and focus on your surroundings. Would you like me to guide you through a calming exercise?"
    } else if (lowerCaseMessage.includes("help") || lowerCaseMessage.includes("emergency")) {
      responseContent =
        "If you're in immediate danger, please use the SOS button. I can help you contact your emergency contacts or guide you to the nearest safe location."
    } else if (
      lowerCaseMessage.includes("route") ||
      lowerCaseMessage.includes("safe path") ||
      lowerCaseMessage.includes("directions")
    ) {
      responseContent =
        "I can help you find the safest route to your destination. Would you like me to analyze nearby areas and suggest the safest path?"
    } else if (lowerCaseMessage.includes("check") || lowerCaseMessage.includes("check-in")) {
      responseContent =
        "I'll set up regular check-ins during your journey. How frequently would you like me to check in with you?"
    } else if (
      lowerCaseMessage.includes("hi") ||
      lowerCaseMessage.includes("hello") ||
      lowerCaseMessage.includes("hey")
    ) {
      responseContent = "Hello! I'm here to help keep you safe and provide support. How are you feeling today?"
    } else {
      responseContent =
        "I'm here to support you. Would you like me to help with finding a safe route, setting up check-ins, or providing safety tips?"
    }

    // Simulate typing delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: responseContent,
          role: "assistant",
          timestamp: new Date(),
        },
      ])
      setIsTyping(false)
    }, 1500)
  }

  const handleSendMessage = () => {
    if (!input.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInput("")
    simulateResponse(input)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">AI Companion</h1>
        <p className="text-muted-foreground">Your personal safety assistant and emotional support</p>
      </div>

      <Card className="mx-auto max-w-2xl">
        <CardHeader className="border-b">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 bg-primary/10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="AI Companion" />
              <AvatarFallback className="bg-primary/10 text-primary">
                <Bot className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>SafeNet Companion</CardTitle>
              <CardDescription>Always here to help and support you</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[400px] overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("mb-4 flex", message.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-2",
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                  )}
                >
                  <div className="flex items-center gap-2">
                    {message.role === "assistant" && <Bot className="h-4 w-4 shrink-0" />}
                    <p>{message.content}</p>
                    {message.role === "user" && <User className="h-4 w-4 shrink-0" />}
                  </div>
                  <div className="mt-1 text-right text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="mb-4 flex justify-start">
                <div className="max-w-[80%] rounded-lg bg-muted px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    <div className="flex gap-1">
                      <span className="animate-bounce">●</span>
                      <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
                        ●
                      </span>
                      <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
                        ●
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <CardFooter className="border-t p-3">
          <div className="flex w-full items-center gap-2">
            <Button variant="outline" size="icon" className="shrink-0">
              <Mic className="h-4 w-4" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button variant="outline" size="icon" className="shrink-0">
              <Volume2 className="h-4 w-4" />
            </Button>
            <Button onClick={handleSendMessage} disabled={!input.trim()} size="icon" className="shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
