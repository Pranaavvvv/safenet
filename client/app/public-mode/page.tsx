"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, Eye, EyeOff, Lock, LogOut, Shield, Smartphone } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PublicModePage() {
  const [publicModeActive, setPublicModeActive] = useState(false)
  const [hideContacts, setHideContacts] = useState(true)
  const [hideReports, setHideReports] = useState(true)
  const [hideLocation, setHideLocation] = useState(true)
  const [autoLogout, setAutoLogout] = useState(true)
  const [timeoutMinutes, setTimeoutMinutes] = useState(5)
  const [timeRemaining, setTimeRemaining] = useState(timeoutMinutes * 60)
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null

    if (publicModeActive && autoLogout) {
      setTimeRemaining(timeoutMinutes * 60)

      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleDeactivatePublicMode()
            return 0
          }

          // Show warning when 20% of time remains
          if (prev === Math.floor(timeoutMinutes * 60 * 0.2)) {
            setShowWarning(true)
          }

          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [publicModeActive, autoLogout, timeoutMinutes])

  const handleActivatePublicMode = () => {
    setPublicModeActive(true)
    setShowWarning(false)
  }

  const handleDeactivatePublicMode = () => {
    setPublicModeActive(false)
    setShowWarning(false)
  }

  const formatTimeRemaining = () => {
    const minutes = Math.floor(timeRemaining / 60)
    const seconds = timeRemaining % 60
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const getTimeRemainingPercentage = () => {
    return (timeRemaining / (timeoutMinutes * 60)) * 100
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Public Device Mode</h1>
        <p className="text-muted-foreground">Secure your data when using SafeNet on a shared device</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2 text-primary">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Public Mode Settings</CardTitle>
                <CardDescription>Configure privacy settings for shared devices</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Public Device Mode</p>
                  <p className="text-sm text-muted-foreground">
                    Activate when using SafeNet on a shared or public device
                  </p>
                </div>
              </div>
              <Switch
                checked={publicModeActive}
                onCheckedChange={publicModeActive ? handleDeactivatePublicMode : handleActivatePublicMode}
              />
            </div>

            <div className="space-y-4 rounded-lg border p-4">
              <h3 className="font-medium">Privacy Settings</h3>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="hide-contacts" className="text-sm">
                    Hide Emergency Contacts
                  </Label>
                </div>
                <Switch
                  id="hide-contacts"
                  checked={hideContacts}
                  onCheckedChange={setHideContacts}
                  disabled={!publicModeActive}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="hide-reports" className="text-sm">
                    Hide Incident Reports
                  </Label>
                </div>
                <Switch
                  id="hide-reports"
                  checked={hideReports}
                  onCheckedChange={setHideReports}
                  disabled={!publicModeActive}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="hide-location" className="text-sm">
                    Hide Location History
                  </Label>
                </div>
                <Switch
                  id="hide-location"
                  checked={hideLocation}
                  onCheckedChange={setHideLocation}
                  disabled={!publicModeActive}
                />
              </div>
            </div>

            <div className="space-y-4 rounded-lg border p-4">
              <h3 className="font-medium">Auto-Logout Settings</h3>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="auto-logout" className="text-sm">
                    Auto-Logout After Inactivity
                  </Label>
                </div>
                <Switch
                  id="auto-logout"
                  checked={autoLogout}
                  onCheckedChange={setAutoLogout}
                  disabled={!publicModeActive}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeout" className="text-sm">
                  Timeout Duration (minutes)
                </Label>
                <select
                  id="timeout"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={timeoutMinutes}
                  onChange={(e) => setTimeoutMinutes(Number(e.target.value))}
                  disabled={!publicModeActive || !autoLogout}
                >
                  <option value={1}>1 minute</option>
                  <option value={5}>5 minutes</option>
                  <option value={10}>10 minutes</option>
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                </select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t p-4">
            <Button
              variant={publicModeActive ? "destructive" : "default"}
              className="w-full gap-2"
              onClick={publicModeActive ? handleDeactivatePublicMode : handleActivatePublicMode}
            >
              {publicModeActive ? (
                <>
                  <EyeOff className="h-4 w-4" />
                  Deactivate Public Mode
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  Activate Public Mode
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card className={cn("transition-opacity duration-300", !publicModeActive && "opacity-50")}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Current Status</CardTitle>
              {publicModeActive && (
                <Badge variant="outline" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                  Active
                </Badge>
              )}
            </div>
            <CardDescription>
              {publicModeActive ? "Public Device Mode is currently active" : "Public Device Mode is not active"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {publicModeActive ? (
              <>
                <div className="rounded-lg border p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-medium">Protected Features</h3>
                    <Lock className="h-4 w-4 text-primary" />
                  </div>
                  <ul className="space-y-2 text-sm">
                    {hideContacts && (
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                        <span>Emergency contacts are hidden</span>
                      </li>
                    )}
                    {hideReports && (
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                        <span>Incident reports are hidden</span>
                      </li>
                    )}
                    {hideLocation && (
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                        <span>Location history is hidden</span>
                      </li>
                    )}
                    {autoLogout && (
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                        <span>Auto-logout after {timeoutMinutes} minutes of inactivity</span>
                      </li>
                    )}
                  </ul>
                </div>

                {autoLogout && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Auto-Logout Timer</span>
                      </div>
                      <span className="text-sm font-mono">{formatTimeRemaining()}</span>
                    </div>
                    <Progress
                      value={getTimeRemainingPercentage()}
                      className={cn("h-2", getTimeRemainingPercentage() <= 20 && "bg-red-200 dark:bg-red-950")}
                    />
                  </div>
                )}

                {showWarning && (
                  <div className="animate-pulse rounded-lg border border-yellow-300 bg-yellow-50 p-4 text-center dark:border-yellow-800 dark:bg-yellow-950">
                    <div className="mb-2 flex items-center justify-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      <h3 className="font-medium text-yellow-600 dark:text-yellow-400">Auto-Logout Warning</h3>
                    </div>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      You will be automatically logged out soon due to inactivity
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border p-8 text-center">
                <div className="mb-4 rounded-full bg-muted p-3">
                  <Shield className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mb-1 font-medium">Enhanced Privacy Mode</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Activate Public Device Mode to protect your sensitive information when using a shared device
                </p>
                <Button className="gap-2" onClick={handleActivatePublicMode}>
                  <Lock className="h-4 w-4" />
                  Activate Now
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t p-4">
            <Button variant="outline" className="w-full gap-2" disabled={!publicModeActive}>
              <LogOut className="h-4 w-4" />
              Log Out Now
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
