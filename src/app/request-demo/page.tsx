
'use client'

import { PageHeader } from "@/components/PageHeader"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function RequestDemoPage() {
    const { toast } = useToast()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        toast({
            title: "Demo Request Submitted",
            description: "Thank you for your interest! We will contact you shortly to schedule your personalized demonstration.",
        })
    }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <PageHeader
        title="Request a Personalized Demo"
        description="See firsthand how Florida Shield can be a force multiplier for your agency."
      />
      <div className="max-w-2xl mx-auto">
        <Card>
            <CardHeader>
                <CardTitle>Agency Information</CardTitle>
                <CardDescription>Please provide your details, and a member of our team will reach out to schedule a virtual or on-site demonstration.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Your Name</Label>
                            <Input id="name" placeholder="Sgt. Jane Doe" required />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="title">Your Title / Rank</Label>
                            <Input id="title" placeholder="Training Sergeant" required />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="agency">Law Enforcement Agency</Label>
                        <Input id="agency" placeholder="Anytown Police Department" required />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Agency Email Address</Label>
                        <Input id="email" type="email" placeholder="j.doe@anytownpd.gov" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="message">Message (Optional)</Label>
                        <Textarea id="message" placeholder="Let us know if you have specific features you'd like to see..." />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit">Submit Request</Button>
                </CardFooter>
            </form>
        </Card>
        <div className="text-center mt-8">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary underline">
                Return to Homepage
            </Link>
        </div>
      </div>
    </div>
  )
}
