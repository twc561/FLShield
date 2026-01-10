'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, User, Building } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { MarketingHeader } from '@/components/MarketingHeader'
import { useToast } from '@/hooks/use-toast'

const PlayButton = () => (
    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
        <div className="w-20 h-20 bg-primary/80 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white ml-1">
                <path d="M6.34267 20.6558C5.59013 21.1243 4.66667 20.5521 4.66667 19.6641V4.33591C4.66667 3.44789 5.59013 2.87567 6.34267 3.34418L19.3364 11.0083C20.1332 11.4999 20.1332 12.5001 19.3364 12.9917L6.34267 20.6558Z" fill="currentColor"/>
            </svg>
        </div>
    </div>
);

export default function LandingPage() {
  const { toast } = useToast()

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const MOBILE_BREAKPOINT = 768;
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    const hintKey = 'marketingNavHintShown';

    const hasSeenHint = localStorage.getItem(hintKey);

    if (!hasSeenHint) {
      setTimeout(() => {
        toast({
          title: "Navigation Tip",
          description: isMobile 
            ? "Tap the menu icon in the top right to explore all features."
            : "Click the navigation links in the header to explore all features, or use the menu for quick access.",
        });
        localStorage.setItem(hintKey, 'true');
      }, 2000);
    }
  }, [toast]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <MarketingHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="text-center py-20 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              The Digital FTO In Every Officer&apos;s Pocket
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              An AI-powered mobile application designed to enhance officer safety, improve in-field decision-making, and ensure procedural accuracy for Florida law enforcement.
            </p>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card className="text-left flex flex-col hover:border-primary transition-colors">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <User className="w-6 h-6 text-primary"/>
                            <CardTitle>For Individual Officers</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-muted-foreground">Access an indispensable toolkit of legal references, field guides, and AI-powered assistants to make your job safer and more efficient, starting today.</p>
                    </CardContent>
                    <CardFooter>
                        <Button asChild className="w-full">
                            <Link href="/for-officers">View Officer Features <ArrowRight className="ml-2 h-4 w-4"/></Link>
                        </Button>
                    </CardFooter>
                </Card>
                 <Card className="text-left flex flex-col hover:border-primary transition-colors">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Building className="w-6 h-6 text-primary"/>
                            <CardTitle>For Agencies</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-muted-foreground">Integrate your policies to create a private intelligence engine. Reduce liability, supercharge training, and ensure consistent policy application across your department.</p>
                    </CardContent>
                    <CardFooter>
                        <Button asChild className="w-full" variant="secondary">
                           <Link href="/agency-intelligence">Explore Agency Solutions <ArrowRight className="ml-2 h-4 w-4"/></Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            <div className="mt-16 max-w-4xl mx-auto px-4">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative aspect-video rounded-lg border bg-background shadow-2xl shadow-primary/10 overflow-hidden cursor-pointer group">
                    <Image
                      src="https://img.youtube.com/vi/TqO3Y9wL5yQ/maxresdefault.jpg"
                      alt="Florida Shield App Demo Video Thumbnail"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      priority
                    />
                    <PlayButton/>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-0">
                  <div className="aspect-video">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/TqO3Y9wL5yQ?autoplay=1"
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

          </div>
        </section>
      </main>

      <footer className="py-8 border-t bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Florida Shield. A training and informational aid for law enforcement.</p>
          <p className="mt-2">Shield FL is NOT a CJIS-compliant system and must not be used for operational or evidentiary purposes.</p>
           <nav className="flex justify-center gap-4 mt-4">
                <Link href="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
                <Link href="/terms-of-use" className="hover:text-primary">Terms of Use</Link>
            </nav>
        </div>
      </footer>
    </div>
  )
}