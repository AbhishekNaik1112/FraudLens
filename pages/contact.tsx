import Head from "next/head"
import Layout from "../components/Layout"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact - FraudLens</title>
        <meta name="description" content="Contact the FraudLens team for support or inquiries" />
      </Head>
      <Layout>
        <div className="max-w-5xl mx-auto py-8">
          <Card className="overflow-hidden border-none shadow-md mb-8">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
              <CardTitle className="text-3xl font-bold">Contact Us</CardTitle>
              <CardDescription>Get in touch with our team for support or inquiries</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Send us a message</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Your email" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="Message subject" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Your message" className="min-h-[120px]" />
                    </div>
                    <Button type="submit" className="w-full sm:w-auto">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Email</p>
                        <a href="mailto:support@fraudlens.com" className="text-primary hover:underline">
                        support@fraudlens.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <a href="tel:+911234567890" className="text-primary hover:underline">
                        +91-1234567890
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Office</p>
                        <address className="not-italic text-slate-700">
                          123 ABC
                          <br />
                          123 ABC Street
                          <br />
                          ABC
                        </address>
                      </div>
                    </div>
                    <div className="pt-4">
                      <p className="font-medium mb-2">Business Hours</p>
                      <p className="text-slate-700">Monday - Friday: 9:00 AM - 6:00 PM (PST)</p>
                      <p className="text-slate-700">Saturday - Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-none shadow-md">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
              <CardTitle className="text-xl font-semibold">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg">How quickly can I get started with FraudLens?</h4>
                  <p className="text-slate-700 mt-1">
                    Most customers can be up and running within 24-48 hours. Our onboarding team will guide you through
                    the entire process.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Do you offer custom integrations?</h4>
                  <p className="text-slate-700 mt-1">
                    Yes, we offer custom integrations for enterprise customers. Please contact our sales team for more
                    information.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Is there a free trial available?</h4>
                  <p className="text-slate-700 mt-1">
                    Yes, we offer a 14-day free trial with full access to all features. No credit card required.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50 p-4 flex justify-center">
              <Button variant="outline">View All FAQs</Button>
            </CardFooter>
          </Card>
        </div>
      </Layout>
    </>
  )
}

