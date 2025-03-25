"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, Shield } from "lucide-react"

type Message = {
  role: "user" | "assistant"
  content: string
}

type FraudDetails = {
  name: string
  type: "app" | "url"
  risk_level: string
  category: string
  reported_on?: string
  detected_on?: string
  developer?: string
  description: string
}

export default function FraudChatbot() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I can help you check if an app or URL is potentially fraudulent. Please enter an app name or URL to check.",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll simulate a response
      await new Promise((resolve) => setTimeout(resolve, 1000))

      let botResponse: Message

      // Simple pattern matching for demo
      const inputLower = input.toLowerCase()
      if (inputLower.includes("facebook") || inputLower.includes("fb")) {
        botResponse = {
          role: "assistant",
          content: JSON.stringify({
            name: "Facebook Phishing App",
            type: "app",
            risk_level: "High",
            category: "Phishing",
            developer: "Unknown",
            reported_on: new Date().toISOString(),
            description: "This app attempts to steal Facebook credentials through a fake login page.",
          } as FraudDetails),
        }
      } else if (inputLower.includes("paypal")) {
        botResponse = {
          role: "assistant",
          content: JSON.stringify({
            name: "PayPal Security",
            type: "app",
            risk_level: "High",
            category: "Financial Fraud",
            developer: "SecurePayments (fake)",
            reported_on: new Date().toISOString(),
            description: "This app claims to enhance PayPal security but steals user credentials.",
          } as FraudDetails),
        }
      } else if (inputLower.includes("bank") || inputLower.includes("banking")) {
        botResponse = {
          role: "assistant",
          content: JSON.stringify({
            name: "Quick Banking",
            type: "app",
            risk_level: "Medium",
            category: "Financial",
            developer: "FinTech Solutions",
            reported_on: new Date().toISOString(),
            description: "This app requests excessive permissions and has been reported for suspicious activity.",
          } as FraudDetails),
        }
      } else if (inputLower.includes("http") || inputLower.includes("www")) {
        botResponse = {
          role: "assistant",
          content: JSON.stringify({
            name: input,
            type: "url",
            risk_level: "Medium",
            category: "Suspicious Link",
            detected_on: new Date().toISOString(),
            description: "This URL has been flagged for potential phishing attempts.",
          } as FraudDetails),
        }
      } else {
        botResponse = {
          role: "assistant",
          content:
            "I couldn't find any fraud information about this. Would you like to report it as potentially fraudulent?",
        }
      }

      setMessages((prev) => [...prev, botResponse])
    } catch (error) {
      console.error("Error fetching fraud data:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error while checking this. Please try again later.",
        },
      ])
    } finally {
      setIsLoading(false)
      setInput("")
    }
  }

  const renderMessage = (message: Message, index: number) => {
    if (message.role === "user") {
      return (
        <div key={index} className="flex justify-end mb-4">
          <div className="bg-primary text-primary-foreground rounded-lg py-2 px-4 max-w-[80%]">{message.content}</div>
        </div>
      )
    }

    try {
      // Try to parse as JSON (for fraud details)
      const fraudDetails = JSON.parse(message.content) as FraudDetails
      return (
        <div key={index} className="flex justify-start mb-4">
          <div className="bg-slate-100 rounded-lg py-3 px-4 max-w-[80%]">
            <div className="flex items-center mb-2">
              <Shield className="h-5 w-5 text-red-500 mr-2" />
              <h4 className="font-bold">{fraudDetails.name}</h4>
              <span
                className={`ml-2 text-xs px-2 py-1 rounded ${
                  fraudDetails.risk_level === "High"
                    ? "bg-red-100 text-red-800"
                    : fraudDetails.risk_level === "Medium"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-blue-100 text-blue-800"
                }`}
              >
                {fraudDetails.risk_level} Risk
              </span>
            </div>
            <div className="text-sm space-y-1">
              <p>
                <span className="font-medium">Type:</span> {fraudDetails.type === "app" ? "Application" : "URL"}
              </p>
              <p>
                <span className="font-medium">Category:</span> {fraudDetails.category}
              </p>
              {fraudDetails.developer && (
                <p>
                  <span className="font-medium">Developer:</span> {fraudDetails.developer}
                </p>
              )}
              <p>
                <span className="font-medium">Reported:</span>{" "}
                {new Date(fraudDetails.reported_on || fraudDetails.detected_on || "").toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Description:</span> {fraudDetails.description}
              </p>
            </div>
          </div>
        </div>
      )
    } catch {
      // Regular text message
      return (
        <div key={index} className="flex justify-start mb-4">
          <div className="bg-slate-100 rounded-lg py-2 px-4 max-w-[80%]">{message.content}</div>
        </div>
      )
    }
  }

  return (
    <Card className="border-none shadow-md h-[600px] flex flex-col">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <div className="flex items-center">
          <MessageCircle className="mr-2 h-5 w-5 text-primary" />
          <CardTitle className="text-xl font-semibold">Fraud Detection Assistant</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-0 overflow-hidden">
        <ScrollArea className="h-[450px] p-4">
          {messages.map(renderMessage)}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-slate-100 rounded-lg py-2 px-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex w-full space-x-2"
        >
          <Input
            placeholder="Enter an app name or URL..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

