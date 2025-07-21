
'use client'

import { PageHeader } from "@/components/PageHeader"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MarketingHeader } from "@/components/MarketingHeader"
import { Shield, Users, Clock, CheckCircle } from "lucide-react"

export default function RequestDemoPage() {
  return (
    <>
      <MarketingHeader />
      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in-up">
          <PageHeader
            title="Transform Your Agency Operations"
            description="See how Florida Shield eliminates guesswork and empowers your officers with instant, defensible answers."
          />
          
          {/* Value Proposition Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Instant Answers</h3>
                <p className="text-muted-foreground">No more radio calls asking "What's the statute for..." Get immediate, accurate responses in seconds.</p>
              </div>
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Defensible Decisions</h3>
                <p className="text-muted-foreground">Every response is backed by Florida Statutes, case law, and your agency's policies.</p>
              </div>
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Agency-Specific</h3>
                <p className="text-muted-foreground">Tailored to your department's policies, procedures, and local ordinances.</p>
              </div>
            </div>
          </div>

          {/* Demo CTA Section */}
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Ready to See Shield FL in Action?</CardTitle>
                <CardDescription className="text-lg">
                  We'll show you exactly how Shield FL integrates with your agency's operations and policies.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-left">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>Personalized demonstration using your agency's actual policies</span>
                  </div>
                  <div className="flex items-center gap-3 text-left">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>See real-world scenarios your officers face daily</span>
                  </div>
                  <div className="flex items-center gap-3 text-left">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>No obligation - just see how it works for your department</span>
                  </div>
                </div>
                
                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Contact Our Team</h3>
                  <p className="text-muted-foreground mb-4">
                    Ready to schedule your personalized demo? Our team will work with your command staff to show you exactly how Shield FL can benefit your agency.
                  </p>
                  <div className="space-y-3">
                    <Button asChild size="lg" className="w-full">
                      <a href="mailto:admin@shieldfl.app?subject=Agency Demo Request">
                        Email admin@shieldfl.app
                      </a>
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Include your agency name and preferred contact method for fastest response.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="text-center mt-8">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary underline">
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
