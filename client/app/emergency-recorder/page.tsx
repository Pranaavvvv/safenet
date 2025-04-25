"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Camera, CloudUpload, Mic, Pause, Play, Save, Video } from "lucide-react"
import { cn } from "@/lib/utils"

export default function EmergencyRecorderPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingType, setRecordingType] = useState<"video" | "audio">("video")
  const [recordingTime, setRecordingTime] = useState(0)
  const [cloudSave, setCloudSave] = useState(true)
  const [recordingsList, setRecordingsList] = useState<
    Array<{
      id: number
      type: "video" | "audio"
      duration: string
      date: string
      size: string
      uploaded: boolean
    }>
  >([
    {
      id: 1,
      type: "video",
      duration: "0:48",
      date: "Today, 2:15 PM",
      size: "12.4 MB",
      uploaded: true,
    },
    {
      id: 2,
      type: "audio",
      duration: "1:23",
      date: "Yesterday, 8:30 PM",
      size: "3.2 MB",
      uploaded: true,
    },
  ])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const handleStartRecording = () => {
    setIsRecording(true)
    setRecordingTime(0)

    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1)
    }, 1000)

    // Simulate camera preview
    if (videoRef.current) {
      // In a real app, we would use:
      // navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      //   .then(stream => {
      //     videoRef.current.srcObject = stream;
      //   })

      // For demo purposes, we'll just show a placeholder
      videoRef.current.poster = "/placeholder.svg?height=400&width=600"
    }
  }

  const handleStopRecording = () => {
    setIsRecording(false)

    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    // Add the new recording to the list
    const minutes = Math.floor(recordingTime / 60)
    const seconds = recordingTime % 60
    const duration = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`

    const newRecording = {
      id: Date.now(),
      type: recordingType,
      duration,
      date: "Just now",
      size: `${Math.floor(Math.random() * 10) + 1}.${Math.floor(Math.random() * 9) + 1} MB`,
      uploaded: cloudSave,
    }

    setRecordingsList([newRecording, ...recordingsList])
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Emergency Recorder</h1>
        <p className="text-muted-foreground">Automatically record audio and video during emergency situations</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recording Preview</CardTitle>
            <CardDescription>
              {isRecording
                ? `Recording ${recordingType}... ${formatTime(recordingTime)}`
                : "Press record to start capturing"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                poster="/placeholder.svg?height=400&width=600"
                muted
                playsInline
              />

              {isRecording && (
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/70 px-3 py-1 text-white">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-red-500"></div>
                  <span className="text-xs font-medium">REC</span>
                  <span className="text-xs">{formatTime(recordingTime)}</span>
                </div>
              )}

              {recordingType === "audio" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Mic className="h-16 w-16 text-white opacity-30" />
                  {isRecording && (
                    <div className="mt-4 flex items-center gap-4">
                      <div className="h-1 w-12 rounded-full bg-primary/30"></div>
                      <div className="h-3 w-12 rounded-full bg-primary/60"></div>
                      <div className="h-6 w-12 rounded-full bg-primary"></div>
                      <div className="h-4 w-12 rounded-full bg-primary/80"></div>
                      <div className="h-2 w-12 rounded-full bg-primary/40"></div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 p-6">
            <div className="flex w-full items-center justify-between">
              <Tabs
                value={recordingType}
                onValueChange={(value) => setRecordingType(value as "video" | "audio")}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="video" disabled={isRecording}>
                    <Video className="mr-2 h-4 w-4" />
                    Video
                  </TabsTrigger>
                  <TabsTrigger value="audio" disabled={isRecording}>
                    <Mic className="mr-2 h-4 w-4" />
                    Audio Only
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex w-full items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch id="cloud-save" checked={cloudSave} onCheckedChange={setCloudSave} disabled={isRecording} />
                <Label htmlFor="cloud-save" className="flex items-center gap-1">
                  <CloudUpload className="h-4 w-4" />
                  Auto-upload to cloud
                </Label>
              </div>

              <Button
                variant={isRecording ? "destructive" : "default"}
                size="lg"
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                className="gap-2"
              >
                {isRecording ? (
                  <>
                    <Pause className="h-4 w-4" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Camera className="h-4 w-4" />
                    Start Recording
                  </>
                )}
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Saved Recordings</CardTitle>
            <CardDescription>Access your emergency recordings</CardDescription>
          </CardHeader>
          <CardContent className="max-h-[400px] overflow-y-auto p-0">
            {recordingsList.length > 0 ? (
              <div className="divide-y">
                {recordingsList.map((recording) => (
                  <div key={recording.id} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full",
                          recording.type === "video"
                            ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                            : "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
                        )}
                      >
                        {recording.type === "video" ? <Video className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{recording.type === "video" ? "Video" : "Audio"} Recording</h4>
                          {recording.date === "Just now" && (
                            <Badge
                              variant="outline"
                              className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                            >
                              New
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{recording.date}</span>
                          <span>•</span>
                          <span>{recording.duration}</span>
                          <span>•</span>
                          <span>{recording.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Play className="h-4 w-4" />
                      </Button>
                      {recording.uploaded ? (
                        <Badge variant="outline" className="flex items-center gap-1 bg-primary/10 text-primary">
                          <CloudUpload className="h-3 w-3" /> Saved
                        </Badge>
                      ) : (
                        <Button variant="outline" size="sm" className="gap-1 text-xs">
                          <Save className="h-3 w-3" /> Save
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="mb-4 rounded-full bg-muted p-3">
                  <Save className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mb-1 font-medium">No recordings yet</h3>
                <p className="text-sm text-muted-foreground">Your emergency recordings will appear here</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t p-4">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <span>Recordings are automatically deleted after 30 days</span>
              </div>
              <Button variant="outline" size="sm">
                Manage Storage
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
