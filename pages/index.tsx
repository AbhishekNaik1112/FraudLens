/* eslint-disable react/no-unescaped-entities */
import Head from "next/head"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Bell, TrendingUp } from "lucide-react"

export default function Landing() {
  return (
    <>
      <Head>
        <title>FraudLens - Secure Your Business</title>
        <meta
          name="description"
          content="FraudLens provides a modern fraud detection platform with real-time insights and actionable intelligence."
        />
      </Head>
      <div className="min-h-screen flex flex-col">
        <header className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link href="/" legacyBehavior>
                  <a className="flex items-center space-x-2">
                    <Shield className="h-8 w-8 text-primary" />
                    <span className="text-xl font-bold text-primary">FraudLens</span>
                  </a>
                </Link>
              </div>
              <nav className="hidden md:flex space-x-8">
                <Link href="/about" legacyBehavior>
                  <a className="text-sm font-medium text-slate-700 hover:text-primary transition-colors">About</a>
                </Link>
                <Link href="/contact" legacyBehavior>
                  <a className="text-sm font-medium text-slate-700 hover:text-primary transition-colors">Contact</a>
                </Link>
              </nav>
              <div className="flex items-center space-x-4">
                <Link href="/login" legacyBehavior>
                  <a className="text-sm font-medium text-slate-700 hover:text-primary transition-colors">Login</a>
                </Link>
                <Button asChild size="sm" className="rounded-full">
                  <Link href="/login">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-slate-900 to-primary py-20 overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
                    Detect Fraud in <span className="text-blue-300">Real-Time</span>
                  </h1>
                  <p className="mt-6 text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0">
                    Protect your business with our advanced fraud detection platform. Get real-time alerts and
                    actionable insights.
                  </p>
                  <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Button asChild size="lg" className="rounded-full">
                      <Link href="/login">Start Free Trial</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="rounded-full bg-white/10 text-white border-white/20 hover:bg-white/20"
                    >
                      <Link href="/contact">Contact Sales</Link>
                    </Button>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-lg blur opacity-75"></div>
                    <div className="relative bg-slate-900 rounded-lg border border-slate-800 shadow-xl overflow-hidden">
                      <div className="p-4 border-b border-slate-800 flex items-center">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                  Powerful Features for Complete Protection
                </h2>
                <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
                  Our platform provides comprehensive tools to detect, analyze, and prevent fraud.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Advanced Detection</h3>
                  <p className="text-slate-600">
                    Our AI-powered algorithms identify suspicious patterns and activities in real-time.
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
                    <Bell className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Instant Alerts</h3>
                  <p className="text-slate-600">
                    Receive immediate notifications when potential fraud is detected in your system.
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Detailed Analytics</h3>
                  <p className="text-slate-600">
                    Gain valuable insights with comprehensive reports and visualization tools.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Trusted by Leading Companies</h2>
                <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
                  See what our customers have to say about our fraud detection platform.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                  <div className="flex items-center mb-4">
                    <div className="mr-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold">AC</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Alex Chen</h4>
                      <p className="text-sm text-slate-500">CTO, TechCorp</p>
                    </div>
                  </div>
                  <p className="text-slate-700">
                    "FraudLens has been instrumental in reducing our fraud cases by over 75%. The real-time alerts
                    have saved us thousands of dollars."
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                  <div className="flex items-center mb-4">
                    <div className="mr-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-bold">SJ</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Sarah Johnson</h4>
                      <p className="text-sm text-slate-500">Security Lead, FinanceHub</p>
                    </div>
                  </div>
                  <p className="text-slate-700">
                    "The intuitive dashboard and detailed analytics have made it easy for our team to identify and
                    respond to threats quickly."
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                  <div className="flex items-center mb-4">
                    <div className="mr-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold">MR</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Michael Rodriguez</h4>
                      <p className="text-sm text-slate-500">CEO, E-Commerce Plus</p>
                    </div>
                  </div>
                  <p className="text-slate-700">
                    "Since implementing FraudLens, we've seen a significant decrease in chargebacks and fraudulent
                    transactions. Highly recommended!"
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-br from-primary to-purple-700 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Secure Your Business?</h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
                Start your free 14-day trial today. No credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  variant="default"
                  className="bg-white text-primary hover:bg-slate-100 rounded-full"
                >
                  <Link href="/login">Start Free Trial</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-slate-900 text-slate-400 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Shield className="h-6 w-6 text-white" />
                  <span className="text-lg font-bold text-white">FraudLens</span>
                </div>
                <p className="text-sm">Advanced fraud detection and prevention for modern businesses.</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-4">Product</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Case Studies
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Documentation
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-4">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Press
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-4">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Cookie Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      GDPR
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm">© 2025 FraudLens. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0021 6.545a8.283 8.283 0 01-2.356.646 4.151 4.151 0 001.825-2.296 8.3 8.3 0 01-2.606.996A4.153 4.153 0 0012 8.67a11.791 11.791 0 01-8.56-4.339 4.15 4.15 0 001.284 5.54 4.123 4.123 0 01-1.878-.518v.052a4.15 4.15 0 003.327 4.066 4.13 4.13 0 01-1.873.07 4.151 4.151 0 003.873 2.88A8.32 8.32 0 010 18.306a11.754 11.754 0 006.335 1.945" />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

