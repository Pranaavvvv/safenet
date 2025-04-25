"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Activity, Heart, Pause, Play, RefreshCw, SkipBack, SkipForward, Volume2, VolumeX, Wind } from "lucide-react"
import { cn } from "@/lib/utils"

export default function WellnessPage() {
  const [activeBreathingStep, setActiveBreathingStep] = useState(0)
  const [isBreathingActive, setIsBreathingActive] = useState(false)
  const [breathingCycles, setBreathingCycles] = useState(0)
  const [volume, setVolume] = useState(70)
  const [isMuted, setIsMuted] = useState(false)
  const [activeAudio, setActiveAudio] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const breathingTimerRef = useRef<NodeJS.Timeout | null>(null)

  const breathingSteps = [
    { name: "Inhale", duration: 4000, instruction: "Breathe in slowly through your nose" },
    { name: "Hold", duration: 4000, instruction: "Hold your breath" },
    { name: "Exhale", duration: 6000, instruction: "Breathe out slowly through your mouth" },
    { name: "Rest", duration: 2000, instruction: "Pause briefly" },
  ]

  const audioTracks = [
    { id: "nature", name: "Nature Sounds", duration: "5:20" },
    { id: "meditation", name: "Guided Meditation", duration: "10:15" },
    { id: "calming", name: "Calming Music", duration: "8:45" },
  ]

  useEffect(() => {
    return () => {
      if (breathingTimerRef.current) {
        clearTimeout(breathingTimerRef.current)
      }
    }
  }, [])

  const startBreathingExercise = () => {
    setIsBreathingActive(true)
    setActiveBreathingStep(0)
    setBreathingCycles(0)

    const runBreathingCycle = (step: number) => {
      setActiveBreathingStep(step)

      breathingTimerRef.current = setTimeout(() => {
        const nextStep = (step + 1) % breathingSteps.length

        if (nextStep === 0) {
          setBreathingCycles((prev) => prev + 1)
        }

        if (isBreathingActive) {
          runBreathingCycle(nextStep)
        }
      }, breathingSteps[step].duration)
    }

    runBreathingCycle(0)
  }

  const stopBreathingExercise = () => {
    setIsBreathingActive(false)
    if (breathingTimerRef.current) {
      clearTimeout(breathingTimerRef.current)
      breathingTimerRef.current = null
    }
  }

  const toggleAudio = (trackId: string) => {
    if (activeAudio === trackId) {
      setActiveAudio(null)
      if (audioRef.current) {
        audioRef.current.pause()
      }
    } else {
      setActiveAudio(trackId)
      // In a real app, we would play the actual audio file
      if (audioRef.current) {
        audioRef.current.src = `/placeholder-audio-${trackId}.mp3`
        audioRef.current.play()
      }
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Anxiety & Health Support</h1>
        <p className="text-muted-foreground">Tools to help you manage stress and anxiety</p>
      </div>

      <Tabs defaultValue="breathing" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="breathing">Breathing Exercises</TabsTrigger>
          <TabsTrigger value="sounds">Calming Sounds</TabsTrigger>
        </TabsList>

        <TabsContent value="breathing" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Guided Breathing</CardTitle>
              <CardDescription>Follow the animation to regulate your breathing and reduce anxiety</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="mb-8 flex h-48 w-48 items-center justify-center">
                <div
                  className={cn(
                    "relative flex h-32 w-32 items-center justify-center rounded-full bg-primary/10 transition-all duration-1000",
                    activeBreathingStep === 0 && "animate-pulse h-48 w-48",
                    activeBreathingStep === 1 && "h-48 w-48",
                    activeBreathingStep === 2 && "animate-pulse h-32 w-32",
                    activeBreathingStep === 3 && "h-32 w-32",
                  )}
                >
                  <Wind
                    className={cn(
                      "h-12 w-12 text-primary transition-all duration-500",
                      activeBreathingStep === 0 && "scale-150 opacity-80",
                      activeBreathingStep === 1 && "scale-150 opacity-80",
                      activeBreathingStep === 2 && "scale-100 opacity-60",
                      activeBreathingStep === 3 && "scale-100 opacity-60",
                    )}
                  />
                </div>
              </div>

              <div className="mb-6 w-full text-center">
                <h3 className="mb-1 text-xl font-bold">
                  {isBreathingActive ? breathingSteps[activeBreathingStep].name : "Ready to begin"}
                </h3>
                <p className="text-muted-foreground">
                  {isBreathingActive
                    ? breathingSteps[activeBreathingStep].instruction
                    : "Press start to begin the breathing exercise"}
                </p>
                {isBreathingActive && (
                  <div className="mt-2">
                    <span className="text-sm font-medium">Cycles completed: {breathingCycles}</span>
                  </div>
                )}
              </div>

              <div className="flex w-full justify-center gap-4">
                {isBreathingActive ? (
                  <Button variant="destructive" size="lg" className="gap-2" onClick={stopBreathingExercise}>
                    <Pause className="h-4 w-4" />
                    Stop
                  </Button>
                ) : (
                  <Button size="lg" className="gap-2" onClick={startBreathingExercise}>
                    <Play className="h-4 w-4" />
                    Start
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2"
                  onClick={() => {
                    stopBreathingExercise()
                    setActiveBreathingStep(0)
                    setBreathingCycles(0)
                  }}
                >
                  <RefreshCw className="h-4 w-4" />
                  Reset
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col border-t p-4">
              <div className="mb-2 flex w-full items-center justify-between">
                <span className="text-sm font-medium">Benefits of Deep Breathing</span>
                <Heart className="h-4 w-4 text-red-500" />
              </div>
              <ul className="w-full space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Reduces stress and anxiety</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Lowers heart rate and blood pressure</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Improves focus and clarity</span>
                </li>
              </ul>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="sounds" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Calming Audio</CardTitle>
              <CardDescription>Listen to soothing sounds to help you relax and reduce anxiety</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 space-y-4">
                {audioTracks.map((track) => (
                  <div
                    key={track.id}
                    className={cn(
                      "flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-all hover:bg-muted/50",
                      activeAudio === track.id && "border-primary bg-primary/5",
                    )}
                    onClick={() => toggleAudio(track.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full",
                          activeAudio === track.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        {activeAudio === track.id ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="font-medium">{track.name}</p>
                        <p className="text-xs text-muted-foreground">{track.duration}</p>
                      </div>
                    </div>
                    {activeAudio === track.id && (
                      <div className="flex w-24 items-center gap-1">
                        <div className="h-1 w-1 animate-pulse rounded-full bg-primary"></div>
                        <div
                          className="h-3 w-1 animate-pulse rounded-full bg-primary"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="h-2 w-1 animate-pulse rounded-full bg-primary"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="h-4 w-1 animate-pulse rounded-full bg-primary"
                          style={{ animationDelay: "0.3s" }}
                        ></div>
                        <div
                          className="h-2 w-1 animate-pulse rounded-full bg-primary"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                        <div
                          className="h-3 w-1 animate-pulse rounded-full bg-primary"
                          style={{ animationDelay: "0.5s" }}
                        ></div>
                        <div
                          className="h-1 w-1 animate-pulse rounded-full bg-primary"
                          style={{ animationDelay: "0.6s" }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {activeAudio && (
                <div className="rounded-lg border p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <SkipBack className="h-4 w-4" />
                      </Button>
                      <Button size="icon" className="h-10 w-10" onClick={() => toggleAudio(activeAudio)}>
                        <Pause className="h-5 w-5" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <SkipForward className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleMute}>
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </Button>
                      <Slider
                        defaultValue={[volume]}
                        max={100}
                        step={1}
                        className="w-24"
                        onValueChange={handleVolumeChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>1:24</span>
                      <span>4:56</span>
                    </div>
                    <Progress value={25} className="h-1.5" />
                  </div>
                </div>
              )}

              <audio ref={audioRef} className="hidden" />
            </CardContent>
            <CardFooter className="flex flex-col border-t p-4">
              <div className="mb-2 flex w-full items-center justify-between">
                <span className="text-sm font-medium">Benefits of Sound Therapy</span>
                <Activity className="h-4 w-4 text-primary" />
              </div>
              <ul className="w-full space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Masks distracting noises</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Promotes relaxation and better sleep</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Reduces stress and anxiety symptoms</span>
                </li>
              </ul>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
