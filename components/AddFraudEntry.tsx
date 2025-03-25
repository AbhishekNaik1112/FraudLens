"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AddFraudEntry() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [open, setOpen] = useState(false)

  // App form state
  const [appName, setAppName] = useState("")
  const [developer, setDeveloper] = useState("")
  const [appCategory, setAppCategory] = useState("")
  const [appRiskLevel, setAppRiskLevel] = useState("")
  const [appDescription, setAppDescription] = useState("")

  // URL form state
  const [url, setUrl] = useState("")
  const [urlCategory, setUrlCategory] = useState("")
  const [urlRiskLevel, setUrlRiskLevel] = useState("")
  const [urlDescription, setUrlDescription] = useState("")

  const resetForm = () => {
    // Reset app form
    setAppName("")
    setDeveloper("")
    setAppCategory("")
    setAppRiskLevel("")
    setAppDescription("")

    // Reset URL form
    setUrl("")
    setUrlCategory("")
    setUrlRiskLevel("")
    setUrlDescription("")

    // Reset status
    setError("")
    setSuccess("")
  }

  const handleSubmitApp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    setSuccess("")

    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll simulate a response
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate successful submission
      setSuccess("Fraudulent app added successfully!")
      setTimeout(() => {
        setOpen(false)
        resetForm()
      }, 1500)
    } catch (err) {
      console.error(err)
      setError("Failed to add fraudulent app. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitUrl = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    setSuccess("")

    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll simulate a response
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate successful submission
      setSuccess("Fraudulent URL added successfully!")
      setTimeout(() => {
        setOpen(false)
        resetForm()
      }, 1500)
    } catch (err) {
      console.error(err)
      setError("Failed to add fraudulent URL. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen)
        if (!newOpen) resetForm()
      }}
    >
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Fraud Entry
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Fraud Entry</DialogTitle>
          <DialogDescription>Add details about a fraudulent app or URL to the database.</DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="border-green-200 bg-green-50 text-green-800">
            <AlertCircle className="h-4 w-4 text-green-600" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="app" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="app">Fraudulent App</TabsTrigger>
            <TabsTrigger value="url">Fraudulent URL</TabsTrigger>
          </TabsList>

          <TabsContent value="app">
            <form onSubmit={handleSubmitApp} className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="app-name">App Name</Label>
                <Input id="app-name" value={appName} onChange={(e) => setAppName(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="developer">Developer</Label>
                <Input id="developer" value={developer} onChange={(e) => setDeveloper(e.target.value)} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="app-category">Category</Label>
                  <Select value={appCategory} onValueChange={setAppCategory} required>
                    <SelectTrigger id="app-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phishing">Phishing</SelectItem>
                      <SelectItem value="malware">Malware</SelectItem>
                      <SelectItem value="scam">Scam</SelectItem>
                      <SelectItem value="financial">Financial Fraud</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="app-risk-level">Risk Level</Label>
                  <Select value={appRiskLevel} onValueChange={setAppRiskLevel} required>
                    <SelectTrigger id="app-risk-level">
                      <SelectValue placeholder="Select risk" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="app-description">Description</Label>
                <Textarea
                  id="app-description"
                  value={appDescription}
                  onChange={(e) => setAppDescription(e.target.value)}
                  placeholder="Describe the fraudulent behavior..."
                  required
                />
              </div>

              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></div>
                      Submitting...
                    </>
                  ) : (
                    "Add Fraudulent App"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>

          <TabsContent value="url">
            <form onSubmit={handleSubmitUrl} className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="url-category">Category</Label>
                  <Select value={urlCategory} onValueChange={setUrlCategory} required>
                    <SelectTrigger id="url-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phishing">Phishing</SelectItem>
                      <SelectItem value="malware">Malware</SelectItem>
                      <SelectItem value="scam">Scam</SelectItem>
                      <SelectItem value="financial">Financial Fraud</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="url-risk-level">Risk Level</Label>
                  <Select value={urlRiskLevel} onValueChange={setUrlRiskLevel} required>
                    <SelectTrigger id="url-risk-level">
                      <SelectValue placeholder="Select risk" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="url-description">Description</Label>
                <Textarea
                  id="url-description"
                  value={urlDescription}
                  onChange={(e) => setUrlDescription(e.target.value)}
                  placeholder="Describe the fraudulent behavior..."
                  required
                />
              </div>

              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></div>
                      Submitting...
                    </>
                  ) : (
                    "Add Fraudulent URL"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

