"use client"

import Link from "next/link"
import { useRouter } from "next/router"
import useAuthStore from "../store/authStore"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Shield, Menu, User, LogOut, Home, BarChart2, HelpCircle, Mail } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Navbar() {
  const router = useRouter()
  const { isAuthenticated, setAuthenticated } = useAuthStore()

  const handleLogout = () => {
    setAuthenticated(false)
    router.push("/login")
  }

  const isActive = (path: string) => {
    return router.pathname === path
  }

  return (
    <nav className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" legacyBehavior>
              <a className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-primary hidden sm:inline-block">FraudLens</span>
              </a>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link href="/dashboard" legacyBehavior>
              <a
                className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/dashboard") ? "text-primary" : "text-slate-700"}`}
              >
                Dashboard
              </a>
            </Link>
            <Link href="/about" legacyBehavior>
              <a
                className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/about") ? "text-primary" : "text-slate-700"}`}
              >
                About
              </a>
            </Link>
            <Link href="/contact" legacyBehavior>
              <a
                className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/contact") ? "text-primary" : "text-slate-700"}`}
              >
                Contact
              </a>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 bg-slate-100">
                      <User className="h-4 w-4" />
                      <span className="sr-only">User menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">Admin User</p>
                      <p className="text-xs text-muted-foreground">admin@FraudLens.com</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">
                        <BarChart2 className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button asChild variant="default" size="sm" className="rounded-full">
                <Link href="/login">Login</Link>
              </Button>
            )}

            {/* Mobile menu button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] sm:w-[300px]">
                <div className="flex flex-col space-y-4 py-4">
                  <Link href="/" legacyBehavior>
                    <a className="flex items-center space-x-2 px-4">
                      <Home className="h-5 w-5" />
                      <span>Home</span>
                    </a>
                  </Link>
                  <Link href="/dashboard" legacyBehavior>
                    <a className="flex items-center space-x-2 px-4">
                      <BarChart2 className="h-5 w-5" />
                      <span>Dashboard</span>
                    </a>
                  </Link>
                  <Link href="/about" legacyBehavior>
                    <a className="flex items-center space-x-2 px-4">
                      <HelpCircle className="h-5 w-5" />
                      <span>About</span>
                    </a>
                  </Link>
                  <Link href="/contact" legacyBehavior>
                    <a className="flex items-center space-x-2 px-4">
                      <Mail className="h-5 w-5" />
                      <span>Contact</span>
                    </a>
                  </Link>
                  {isAuthenticated && (
                    <Button
                      variant="ghost"
                      className="flex items-center justify-start space-x-2 px-4 hover:bg-slate-100"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

