"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Head from "next/head"
import useAuthStore from "@/store/authStore"
import Layout from "@/components/Layout"
import FraudList from "@/components/FraudList"
import TrendChart from "@/components/TrendChart"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, PieChart, Shield, AlertTriangle } from "lucide-react"
import { useRiskCount } from "@/utils/riskCount"

import FraudChatbot from "@/components/FraudChatbot"

export default function Dashboard() {
  const router = useRouter()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const { data } = useRiskCount()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Dashboard - FraudLens</title>
        <meta name="description" content="FraudLens dashboard with real-time fraud monitoring" />
      </Head>
      <Layout>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-slate-900">FraudLens Dashboard</h1>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <p className="text-sm text-slate-500">Last updated: {new Date().toLocaleString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Total Alerts</p>
                    <h3 className="text-2xl font-bold text-slate-900 mt-1">{data?.totalAlerts}</h3>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">High Risk</p>
                    <h3 className="text-2xl font-bold text-slate-900 mt-1">{data?.highRisk}</h3>
                  </div>
                  <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Medium Risk</p>
                    <h3 className="text-2xl font-bold text-slate-900 mt-1">{data?.mediumRisk}</h3>
                  </div>
                  <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Resolved</p>
                    <h3 className="text-2xl font-bold text-slate-900 mt-1">{data?.resolved}</h3>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                    <PieChart className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <FraudChatbot />
            <TrendChart />
          </div>

          <Tabs defaultValue="fraud-list" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="fraud-list">Fraud List</TabsTrigger>
            </TabsList>
            <TabsContent value="fraud-list" className="mt-0">
              <FraudList />
            </TabsContent>
          </Tabs>
        </div>
      </Layout>
    </>
  )
}

