"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, BookOpen, CheckCircle, ChevronLeft, ChevronRight, Clock, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample training scenarios
const scenarios = [
  {
    id: 1,
    title: "Street Harassment",
    description: "You're walking alone and someone starts following you closely and making comments.",
    options: [
      { id: "a", text: "Confront the person directly", correct: false },
      { id: "b", text: "Move to a crowded, well-lit area", correct: true },
      { id: "c", text: "Ignore it and keep walking in the same direction", correct: false },
      { id: "d", text: "Run away immediately", correct: false },
    ],
    explanation:
      "Moving to a crowded, well-lit area increases your safety. Confrontation can escalate the situation, while ignoring it may allow it to continue. Running might trigger a chase response.",
    difficulty: "beginner",
  },
  {
    id: 2,
    title: "Public Transportation Safety",
    description:
      "You're on a bus that's nearly empty late at night, and a stranger sits next to you despite many open seats.",
    options: [
      { id: "a", text: "Stay where you are to avoid seeming rude", correct: false },
      { id: "b", text: "Get off at the next stop even if it's not yours", correct: false },
      { id: "c", text: "Move to another seat near the driver", correct: true },
      { id: "d", text: "Immediately call someone", correct: false },
    ],
    explanation:
      "Moving to another seat near the driver maintains your safety while keeping you on your route. The driver adds a layer of security and witnesses.",
    difficulty: "beginner",
  },
  {
    id: 3,
    title: "Rideshare Verification",
    description: "Your rideshare arrives, but something seems off about the driver or vehicle.",
    options: [
      { id: "a", text: "Get in quickly to avoid the wait", correct: false },
      { id: "b", text: "Ask the driver to confirm your name first", correct: false },
      { id: "c", text: "Verify the license plate, car model, and driver's name before entering", correct: true },
      { id: "d", text: "Cancel the ride after the driver arrives", correct: false },
    ],
    explanation:
      "Always verify the license plate, car model, and driver's name before entering a rideshare. Asking the driver to confirm your name isn't reliable as they might guess or have obtained it elsewhere.",
    difficulty: "intermediate",
  },
  {
    id: 4,
    title: "Drink Safety",
    description: "You're at a social gathering and someone offers to get you a drink.",
    options: [
      { id: "a", text: "Accept and thank them for their kindness", correct: false },
      { id: "b", text: "Decline and get your own drink", correct: true },
      { id: "c", text: "Accept but don't drink it", correct: false },
      { id: "d", text: "Ask someone else to get you a drink instead", correct: false },
    ],
    explanation:
      "Always get your own drinks and keep them in sight. This eliminates the risk of tampering. Accepting but not drinking still leaves you in an awkward situation.",
    difficulty: "intermediate",
  },
  {
    id: 5,
    title: "Emergency Response",
    description: "You believe you're in immediate danger with no clear escape route.",
    options: [
      { id: "a", text: "Stay quiet and hope the situation resolves itself", correct: false },
      { id: "b", text: "Use your phone discreetly if possible", correct: false },
      { id: "c", text: "Activate the SOS feature on your phone or SafeNet app", correct: true },
      { id: "d", text: "Try to reason with the potential threat", correct: false },
    ],
    explanation:
      "In immediate danger, activating an SOS feature alerts authorities and emergency contacts with your location. This is the fastest way to get help when direct escape isn't possible.",
    difficulty: "advanced",
  },
]

// Sample badges
const badges = [
  {
    id: 1,
    name: "First Steps",
    description: "Complete your first training scenario",
    icon: <BookOpen className="h-4 w-4" />,
    unlocked: true,
  },
  {
    id: 2,
    name: "Quick Thinker",
    description: "Complete 5 scenarios in under 10 minutes",
    icon: <Clock className="h-4 w-4" />,
    unlocked: false,
  },
  {
    id: 3,
    name: "Safety Expert",
    description: "Get 10 scenarios correct in a row",
    icon: <Shield className="h-4 w-4" />,
    unlocked: false,
  },
  {
    id: 4,
    name: "Master Protector",
    description: "Complete all advanced scenarios",
    icon: <Award className="h-4 w-4" />,
    unlocked: false,
  },
]

export default function TrainingPage() {
  const [currentScenario, setCurrentScenario] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [progress, setProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("scenarios")
  const [completedScenarios, setCompletedScenarios] = useState<number[]>([])

  const handleOptionSelect = (optionId: string) => {
    if (isAnswered) return
    setSelectedOption(optionId)
    setIsAnswered(true)

    // Update progress
    const newProgress = Math.round(((currentScenario + 1) / scenarios.length) * 100)
    setProgress(newProgress)

    // Mark scenario as completed
    if (!completedScenarios.includes(scenarios[currentScenario].id)) {
      setCompletedScenarios([...completedScenarios, scenarios[currentScenario].id])
    }
  }

  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1)
      setSelectedOption(null)
      setIsAnswered(false)
    }
  }

  const handlePrevious = () => {
    if (currentScenario > 0) {
      setCurrentScenario(currentScenario - 1)
      setSelectedOption(null)
      setIsAnswered(false)
    }
  }

  const isCorrect = (optionId: string) => {
    return scenarios[currentScenario].options.find((option) => option.id === optionId)?.correct
  }

  const scenario = scenarios[currentScenario]

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Safety Training</h1>
        <p className="text-muted-foreground">Learn how to respond in various safety scenarios</p>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="font-medium">Panic Protocol Training</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {completedScenarios.length} of {scenarios.length} completed
          </span>
          <Progress value={progress} className="w-40" />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="scenarios">Training Scenarios</TabsTrigger>
          <TabsTrigger value="badges">Your Badges</TabsTrigger>
        </TabsList>

        <TabsContent value="scenarios" className="mt-6">
          <Card className="mx-auto max-w-3xl overflow-hidden">
            <CardHeader className="relative border-b bg-muted/50">
              <Badge variant="outline" className="absolute right-6 top-6 bg-background">
                {scenario.difficulty.charAt(0).toUpperCase() + scenario.difficulty.slice(1)}
              </Badge>
              <CardTitle>
                Scenario {currentScenario + 1}: {scenario.title}
              </CardTitle>
              <CardDescription>Choose the best response to this situation</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-6 rounded-lg bg-muted p-4">
                <p>{scenario.description}</p>
              </div>

              <div className="space-y-3">
                {scenario.options.map((option) => (
                  <Button
                    key={option.id}
                    variant="outline"
                    className={cn(
                      "flex w-full justify-start p-4 text-left",
                      isAnswered && option.id === selectedOption && isCorrect(option.id)
                        ? "border-green-500 bg-green-50 text-green-700 hover:bg-green-50 dark:bg-green-900/20 dark:text-green-400"
                        : isAnswered && option.id === selectedOption
                          ? "border-red-500 bg-red-50 text-red-700 hover:bg-red-50 dark:bg-red-900/20 dark:text-red-400"
                          : isAnswered && isCorrect(option.id)
                            ? "border-green-500 bg-background text-foreground hover:bg-background"
                            : "",
                    )}
                    onClick={() => handleOptionSelect(option.id)}
                    disabled={isAnswered && option.id !== selectedOption}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border">
                        {option.id.toUpperCase()}
                      </div>
                      <div>{option.text}</div>
                    </div>
                  </Button>
                ))}
              </div>

              {isAnswered && (
                <div className="mt-6 rounded-lg border-l-4 border-primary bg-primary/5 p-4">
                  <h4 className="mb-2 font-medium">Explanation</h4>
                  <p>{scenario.explanation}</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between border-t bg-muted/30 p-4">
              <Button variant="outline" onClick={handlePrevious} disabled={currentScenario === 0}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button onClick={handleNext} disabled={currentScenario === scenarios.length - 1 || !isAnswered}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="badges" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {badges.map((badge) => (
              <Card
                key={badge.id}
                className={cn("overflow-hidden transition-all duration-300", !badge.unlocked && "opacity-60 grayscale")}
              >
                <CardHeader className="border-b bg-muted/50 pb-2">
                  <CardTitle className="text-lg">{badge.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">
                    <div
                      className={cn(
                        "flex h-20 w-20 items-center justify-center rounded-full",
                        badge.unlocked ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
                      )}
                    >
                      {badge.icon ? (
                        React.cloneElement(badge.icon as React.ReactElement, {
                          className: "h-10 w-10",
                        })
                      ) : (
                        <Award className="h-10 w-10" />
                      )}
                    </div>
                  </div>
                  <p className="text-center text-sm">{badge.description}</p>
                </CardContent>
                <CardFooter className="border-t bg-muted/30 p-2">
                  <div className="flex w-full items-center justify-center">
                    {badge.unlocked ? (
                      <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                        <CheckCircle className="h-3 w-3" /> Unlocked
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">Locked</span>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
