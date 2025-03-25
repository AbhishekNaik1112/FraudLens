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
import { Line, Pie, Bar } from "react-chartjs-2"
import useSWR from "swr"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, TrendingUp } from 'lucide-react'
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

  const lineOptions = {
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
    hover: {
      mode: "nearest" as const,
      intersect: true,
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

  const lineChartData = {
    labels: data.map((d: any) => d.date),
    datasets: [
      {
        label: "Fraud Cases Detected",
        data: data.map((d: any) => d.fraud_cases_detected),
        fill: true,
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderColor: "rgba(59, 130, 246, 0.8)",
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: "rgba(59, 130, 246, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 1,
      },
    ],
  }

  const barChartData = {
    labels: data.map((d: any) => d.date),
    datasets: [
      {
        label: "Fraud Cases Detected",
        data: data.map((d: any) => d.fraud_cases_detected),
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)",
          "rgba(99, 102, 241, 0.7)",
          "rgba(139, 92, 246, 0.7)",
          "rgba(168, 85, 247, 0.7)",
          "rgba(217, 70, 239, 0.7)",
        ],
        borderRadius: 4,
      },
    ],
  }

  // Prepare data for pie chart - group by week
  const pieChartData = (() => {
    // Group data by week
    const weeks: Record<string, number> = {};
    data.forEach((d: any) => {
      const date = new Date(d.date);
      const weekNumber = Math.ceil((date.getDate()) / 7);
      const weekLabel = `Week ${weekNumber}`;
      
      if (!weeks[weekLabel]) {
        weeks[weekLabel] = 0;
      }
      weeks[weekLabel] += d.fraud_cases_detected;
    });

    return {
      labels: Object.keys(weeks),
      datasets: [
        {
          label: "Fraud Cases by Week",
          data: Object.values(weeks),
          backgroundColor: [
            "rgba(59, 130, 246, 0.7)",
            "rgba(99, 102, 241, 0.7)",
            "rgba(139, 92, 246, 0.7)",
            "rgba(168, 85, 247, 0.7)",
            "rgba(217, 70, 239, 0.7)",
          ],
          borderColor: [
            "rgba(59, 130, 246, 1)",
            "rgba(99, 102, 241, 1)",
            "rgba(139, 92, 246, 1)",
            "rgba(168, 85, 247, 1)",
            "rgba(217, 70, 239, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  })();

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
              <TabsTrigger value="line">Line Chart</TabsTrigger>
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
          <TabsContent value="line" className="mt-0">
            <div className="h-[350px]">
              <Line options={lineOptions} data={lineChartData} />
            </div>
          </TabsContent>
        </Tabs>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-blue-50 border-blue-100">
            <CardContent className="p-4 flex flex-col items-center">
              <p className="text-sm font-medium text-blue-600">Total Cases</p>
              <p className="text-2xl font-bold">
                {data.reduce((sum: number, item: any) => sum + item.fraud_cases_detected, 0)}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-100">
            <CardContent className="p-4 flex flex-col items-center">
              <p className="text-sm font-medium text-green-600">Average Per Day</p>
              <p className="text-2xl font-bold">
                {(data.reduce((sum: number, item: any) => sum + item.fraud_cases_detected, 0) / data.length).toFixed(1)}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-purple-50 border-purple-100">
            <CardContent className="p-4 flex flex-col items-center">
              <p className="text-sm font-medium text-purple-600">Highest Day</p>
              <p className="text-2xl font-bold">{Math.max(...data.map((d: any) => d.fraud_cases_detected))}</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
