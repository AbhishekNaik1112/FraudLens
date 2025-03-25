/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  BarElement,
} from "chart.js"
import { Pie, Bar } from "react-chartjs-2"
import useSWR from "swr"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, TrendingUp } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  Filler,
  ArcElement,
  BarElement
)

const fetcher = (url: string) => fetch(url).then((res) => res.json())

// Helper function to determine red color based on fraud cases
function getColor(value: number, alpha = 0.7) {
  if (value >= 15) {
    // Dark red
    return `rgba(139, 0, 0, ${alpha})`
  } else if (value >= 10) {
    // Normal red
    return `rgba(255, 0, 0, ${alpha})`
  } else {
    // Light red
    return `rgba(255, 182, 193, ${alpha})`
  }
}

// Helper function for card styling based on fraud cases using Tailwind classes
function getCardColor(value: number) {
  if (value >= 15) {
    return { bg: "bg-red-900", border: "border-red-900", text: "text-red-900" }
  } else if (value >= 10) {
    return { bg: "bg-red-500", border: "border-red-500", text: "text-red-500" }
  } else {
    return { bg: "bg-red-100", border: "border-red-200", text: "text-red-700" }
  }
}

export default function TrendChart() {
  const { data, error } = useSWR("/api/fraud-trends", fetcher)

  if (error)
    return (
      <Alert variant="destructive" className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Error loading trend data. Please try again later.</AlertDescription>
      </Alert>
    )

  if (!data)
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )

  // Bar chart: use dynamic red colors for each data point
  const barChartData = {
    labels: data.map((d: any) => d.date),
    datasets: [
      {
        label: "Fraud Cases Detected",
        data: data.map((d: any) => d.fraud_cases_detected),
        backgroundColor: data.map((d: any) => getColor(d.fraud_cases_detected, 0.7)),
        borderColor: data.map((d: any) => getColor(d.fraud_cases_detected, 1)),
        borderRadius: 4,
      },
    ],
  }

  // Prepare pie chart data by grouping fraud cases by week
  const weeks: Record<string, number> = {}
  data.forEach((d: any) => {
    const date = new Date(d.date)
    const weekNumber = Math.ceil(date.getDate() / 7)
    const weekLabel = `Week ${weekNumber}`
    if (!weeks[weekLabel]) {
      weeks[weekLabel] = 0
    }
    weeks[weekLabel] += d.fraud_cases_detected
  })

  const pieChartData = {
    labels: Object.keys(weeks),
    datasets: [
      {
        label: "Fraud Cases by Week",
        data: Object.values(weeks),
        backgroundColor: Object.values(weeks).map((val: number) => getColor(val, 0.7)),
        borderColor: Object.values(weeks).map((val: number) => getColor(val, 1)),
        borderWidth: 1,
      },
    ],
  }

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  }

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
  }

  // Compute overall stats
  const totalCases = data.reduce((sum: number, item: any) => sum + item.fraud_cases_detected, 0)
  const averagePerDay = (totalCases / data.length).toFixed(1)
  const highestDay = Math.max(...data.map((d: any) => d.fraud_cases_detected))

  // Get colors for stat cards
  const totalCardColor = getCardColor(totalCases)
  const averageCardColor = getCardColor(Number(averagePerDay))
  const highestCardColor = getCardColor(highestDay)

  return (
    <Card className="overflow-hidden border-none shadow-md">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <div className="flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-primary" />
          <CardTitle className="text-xl font-semibold">Fraud Trend Analysis</CardTitle>
        </div>
        <CardDescription>30-day overview of detected fraud cases</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="pie">
          <div className="flex justify-end mb-4">
            <TabsList>
              <TabsTrigger value="pie">Pie Chart</TabsTrigger>
              <TabsTrigger value="bar">Bar Chart</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="pie" className="mt-0">
            <div className="h-[350px] flex items-center justify-center">
              <Pie options={pieOptions} data={pieChartData} />
            </div>
          </TabsContent>
          <TabsContent value="bar" className="mt-0">
            <div className="h-[350px]">
              <Bar options={barOptions} data={barChartData} />
            </div>
          </TabsContent>
        </Tabs>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className={`${totalCardColor.bg} ${totalCardColor.border}`}>
            <CardContent className="p-4 flex flex-col items-center">
              <p className={`text-sm font-medium ${totalCardColor.text}`}>Total Cases</p>
              <p className="text-2xl font-bold">{totalCases}</p>
            </CardContent>
          </Card>
          <Card className={`${averageCardColor.bg} ${averageCardColor.border}`}>
            <CardContent className="p-4 flex flex-col items-center">
              <p className={`text-sm font-medium ${averageCardColor.text}`}>Average Per Day</p>
              <p className="text-2xl font-bold">{averagePerDay}</p>
            </CardContent>
          </Card>
          <Card className={`${highestCardColor.bg} ${highestCardColor.border}`}>
            <CardContent className="p-4 flex flex-col items-center">
              <p className={`text-sm font-medium ${highestCardColor.text}`}>Highest Day</p>
              <p className="text-2xl font-bold">{highestDay}</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
