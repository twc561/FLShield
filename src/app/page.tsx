
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInAnonymously } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { Button } from '@/components/ui/button'
import { Flame, ShieldCheck, AlertTriangle, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleAccessApp = async () => {
    setIsLoading(true)
    try {
      await signInAnonymously(auth)
      toast({
        title: "Login Successful",
        description: "Welcome to Florida Shield.",
      })
      router.push('/dashboard')
    } catch (error) {
      console.error("Anonymous sign-in failed", error)
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Could not connect to the authentication service. Please try again.",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="max-w-md w-full animate-fade-in-up">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
             <Flame className="w-16 h-16 text-primary" />
          </div>
          <CardTitle className="text-3xl">Florida Shield</CardTitle>
          <CardDescription>The essential digital partner for the modern Florida officer.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
           <p className="text-xs text-muted-foreground px-4">
              <strong className="text-foreground/80">For Training & Reference Only.</strong>
              <br />
              This is NOT a CJIS-compliant environment. Do not enter any real case data.
              By proceeding, you acknowledge the non-compliant nature of this platform.
            </p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleAccessApp} disabled={isLoading} className="w-full" size="lg">
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <ShieldCheck className="mr-2 h-5 w-5" />
            )}
            {isLoading ? 'Authenticating...' : 'Acknowledge & Access App'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
