import type React from "react"
import Navbar from "./Navbar"
import { ScrollArea } from "@/components/ui/scroll-area"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <ScrollArea className="flex-grow">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">{children}</main>
      </ScrollArea>
      <footer className="py-6 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-sm text-slate-500">© 2025 FraudLens. All rights reserved.</div>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

