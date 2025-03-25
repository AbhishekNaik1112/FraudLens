"use client"

import { CardFooter } from "@/components/ui/card"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Head from "next/head"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, LogIn, AlertCircle } from "lucide-react"
import useAuthStore from "@/store/authStore"

export default function Login() {
  const router = useRouter()
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedEmail = localStorage.getItem("rememberedEmail")
    const savedRememberMe = localStorage.getItem("rememberMe") === "true"

    if (savedRememberMe && savedEmail) {
      setEmail(savedEmail)
      setRememberMe(true)
    }
  }, [])

  if (!mounted) return null

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (res.ok) {
        setAuthenticated(true)
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email)
          localStorage.setItem("rememberMe", "true")
        } else {
          localStorage.removeItem("rememberedEmail")
          localStorage.removeItem("rememberMe")
        }
        router.push("/dashboard")
      } else {
        setError("Invalid credentials")
      }
    } catch (err) {
      console.error(err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Login - FraudLens</title>
        <meta name="description" content="Login to your FraudLens account" />
      </Head>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <div className="flex items-center justify-between p-4 md:p-6">
          <Link href="/" legacyBehavior>
            <a className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-primary">FraudLens</span>
            </a>
          </Link>
          <Link href="/" legacyBehavior>
            <a
              onClick={() => router.push("/")}
              className="text-sm text-slate-600 hover:text-primary transition-colors cursor-pointer"
            >
              Back to Home
            </a>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-4 md:p-6">
          <Card className="w-full max-w-md border-none shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex justify-center mb-2">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <LogIn className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center">Login to your account</CardTitle>
              <CardDescription className="text-center">Enter your credentials to access your dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                  />
                  <Label htmlFor="remember" className="text-sm font-normal">
                    Remember me
                  </Label>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Logging in...
                    </div>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="h-5 w-5 bg-primary/10 rounded-full flex items-center justify-center mr-2">
                    <Shield className="h-3 w-3 text-primary" />
                  </div>
                  <h3 className="font-medium text-sm text-slate-700">Demo Credentials</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between p-2 bg-white rounded border border-blue-100">
                    <div className="text-slate-700">
                      <span className="font-medium">Admin:</span> admin@fraudlens.com
                    </div>
                    <div className="text-slate-500">password</div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border border-blue-100">
                    <div className="text-slate-700">
                      <span className="font-medium">Analyst:</span> analyst@fraudlens.com
                    </div>
                    <div className="text-slate-500">&nbsp;password</div>
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>

        <footer className="py-6 text-center text-sm text-slate-500">© 2025 FraudLens. All rights reserved.</footer>
      </div>
    </>
  )
}

