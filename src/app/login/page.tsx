
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.42-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.82l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
        <path fill="none" d="M0 0h48v48H0z"></path>
    </svg>
);

export default function LoginPage() {
    const [isGoogleLoading, setIsGoogleLoading] = useState(false)
    const router = useRouter()
    const { toast } = useToast()

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true)
        const provider = new GoogleAuthProvider()
        try {
            await signInWithPopup(auth, provider)
            toast({
                title: "Login Successful",
                description: "Welcome to Florida Shield.",
            })
            router.push('/dashboard')
        } catch (error) {
            console.error("Google sign-in failed", error)
            toast({
                variant: "destructive",
                title: "Login Failed",
                description: "Could not connect to the authentication service. Please try again.",
            })
            setIsGoogleLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Sign In</CardTitle>
                    <CardDescription>to continue to Florida Shield</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Button onClick={handleGoogleSignIn} disabled={isGoogleLoading} variant="outline">
                        {isGoogleLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon />}
                        Sign In with Google
                    </Button>
                </CardContent>
                <CardFooter className="flex flex-col items-center justify-center text-xs">
                     <p className="text-muted-foreground">
                        By signing in, you agree to the terms of use.
                     </p>
                     <Link href="/" className="underline hover:text-primary mt-2">
                        Return to Landing Page
                     </Link>
                </CardFooter>
            </Card>
        </div>
    )
}
