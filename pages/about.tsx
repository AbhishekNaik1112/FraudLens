import Head from "next/head"
import Layout from "../components/Layout"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Shield, Lock, AlertTriangle, Zap } from "lucide-react"

export default function About() {
  return (
    <>
      <Head>
        <title>About - FraudLens</title>
        <meta name="description" content="Learn about FraudLens's mission and capabilities" />
      </Head>
      <Layout>
        <div className="max-w-5xl mx-auto py-8">
          <Card className="overflow-hidden border-none shadow-md mb-8">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
              <CardTitle className="text-3xl font-bold">About FraudLens</CardTitle>
              <CardDescription>State-of-the-art fraud detection platform for modern businesses</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="prose max-w-none">
                <p className="text-lg text-slate-700 leading-relaxed">
                  FraudLens is a comprehensive fraud detection and prevention platform designed to help businesses
                  identify, analyze, and mitigate fraudulent activities in real-time. Our advanced algorithms and
                  machine learning models continuously adapt to emerging fraud patterns, providing you with the most
                  effective protection available.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed mt-4">
                  Founded in 2022, our team of security experts and data scientists has developed a solution that
                  balances powerful detection capabilities with an intuitive user interface, making enterprise-grade
                  security accessible to organizations of all sizes.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="overflow-hidden border-none shadow-md h-full">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                <div className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-primary" />
                  <CardTitle className="text-xl font-semibold">Our Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-slate-700">
                  Our mission is to create a safer digital environment for businesses and their customers by providing
                  cutting-edge fraud detection tools that are both powerful and user-friendly. We believe that effective
                  security should be accessible to everyone, not just large enterprises with dedicated security teams.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md h-full">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
                <div className="flex items-center">
                  <Lock className="mr-2 h-5 w-5 text-primary" />
                  <CardTitle className="text-xl font-semibold">Our Approach</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-slate-700">
                  We combine advanced machine learning algorithms with human expertise to create a hybrid approach to
                  fraud detection. This allows us to identify both known fraud patterns and emerging threats, providing
                  comprehensive protection against a wide range of fraudulent activities.
                </p>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-bold mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="overflow-hidden border-none shadow-md h-full">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b p-4">
                <div className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-primary" />
                  <CardTitle className="text-lg font-semibold">Real-time Detection</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm text-slate-700">
                  Identify fraudulent activities as they happen with our real-time monitoring and alert system.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md h-full">
              <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 border-b p-4">
                <div className="flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-primary" />
                  <CardTitle className="text-lg font-semibold">Advanced Analytics</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm text-slate-700">
                  Gain valuable insights with comprehensive analytics and reporting tools to understand fraud patterns.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md h-full">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b p-4">
                <div className="flex items-center">
                  <Lock className="mr-2 h-5 w-5 text-primary" />
                  <CardTitle className="text-lg font-semibold">Automated Response</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm text-slate-700">
                  Configure automated responses to common fraud scenarios, reducing response time and minimizing damage.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    </>
  )
}

