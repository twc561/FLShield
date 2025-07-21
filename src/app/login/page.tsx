
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'

import { auth, isFirebaseConfigured } from '@/lib/firebase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from '@/hooks/use-toast'
import { Loader2, User, AlertTriangle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.42-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.82l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
        <path fill="none" d="M0 0h48v48H0z"></path>
    </svg>
);

const authSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
})

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState<"google" | "email" | "reset" | null>(null)
    const [showForgotPassword, setShowForgotPassword] = useState(false)
    const router = useRouter()
    const { toast } = useToast()

    const signInForm = useForm<z.infer<typeof authSchema>>({
        resolver: zodResolver(authSchema),
        defaultValues: { email: "", password: "" },
    });

    const signUpForm = useForm<z.infer<typeof authSchema>>({
        resolver: zodResolver(authSchema),
        defaultValues: { email: "", password: "" },
    });

    const resetForm = useForm<{ email: string }>({
        resolver: zodResolver(z.object({ email: z.string().email() })),
        defaultValues: { email: "" },
    });

    const handleAuthError = (error: any) => {
        let title = "Authentication Failed";
        let description = "An unknown error occurred. Please try again.";

        if (error instanceof FirebaseError) {
            switch (error.code) {
                case 'auth/invalid-credential':
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                    title = 'Invalid Credentials';
                    description = 'The email or password you entered is incorrect.';
                    break;
                case 'auth/email-already-in-use':
                    title = 'Email Already in Use';
                    description = 'An account with this email address already exists.';
                    break;
                case 'auth/weak-password':
                    title = 'Weak Password';
                    description = 'The password must be at least 6 characters long.';
                    break;
                case 'auth/network-request-failed':
                    title = 'Network Error';
                    description = 'Could not connect to the authentication service. Please check your internet connection and try again.';
                    break;
                case 'auth/unauthorized-domain':
                     title = 'Domain Not Authorized';
                     description = 'This domain is not authorized for authentication. Please check your Firebase console settings.';
                     break;
                default:
                    description = "An unexpected error occurred. Please check the browser console for more details.";
                    console.error("Firebase Auth Error:", error.message);
            }
        }
        toast({ variant: "destructive", title, description });
    }

    const handleGoogleSignIn = async () => {
        setIsLoading("google");
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth!, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            const user = result.user;
            console.log("Success! User:", user);
            router.push('/dashboard');
        } catch (error: any) {
            console.error("Google Auth Failed:", error);
            console.error("Error Code:", error.code);
            console.error("Error Message:", error.message);
            handleAuthError(error);
        } finally {
            setIsLoading(null);
        }
    }

    const handlePasswordReset = async (values: { email: string }) => {
        setIsLoading("reset");
        try {
            await sendPasswordResetEmail(auth!, values.email);
            toast({ 
                title: "Password Reset Email Sent", 
                description: "Check your email for instructions to reset your password." 
            });
            setShowForgotPassword(false);
            resetForm.reset();
        } catch (error) {
            handleAuthError(error);
        } finally {
            setIsLoading(null);
        }
    }

    const onSignInSubmit = async (values: z.infer<typeof authSchema>) => {
        setIsLoading("email");
        try {
            await signInWithEmailAndPassword(auth!, values.email, values.password);
            router.push('/dashboard');
        } catch (error) {
            handleAuthError(error);
        } finally {
            setIsLoading(null);
        }
    }

    const onSignUpSubmit = async (values: z.infer<typeof authSchema>) => {
        setIsLoading("email");
        try {
            await createUserWithEmailAndPassword(auth!, values.email, values.password);
            toast({ title: "Account Created", description: "You have been successfully signed in." });
            router.push('/dashboard');
        } catch (error) {
            handleAuthError(error);
        } finally {
            setIsLoading(null);
        }
    }
    
    if (!isFirebaseConfigured) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
                <Card className="w-full max-w-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><AlertTriangle className="text-destructive"/> Firebase Configuration Missing</CardTitle>
                        <CardDescription>Authentication is currently disabled.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Action Required</AlertTitle>
                            <AlertDescription>
                                <p>Your Firebase credentials are not set up correctly in `src/lib/firebase.ts`. Please ensure the configuration object is present and accurate.</p>
                                <p className="mt-2">The app will not function correctly until this is resolved.</p>
                            </AlertDescription>
                        </Alert>
                    </CardContent>
                    <CardFooter>
                         <Link href="/" className="underline hover:text-primary text-sm">
                            Return to Landing Page
                         </Link>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Welcome Back</CardTitle>
                    <CardDescription>Sign in to access your Florida Shield dashboard.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>For Informational Use Only</AlertTitle>
                        <AlertDescription>
                        This is not a CJIS-compliant system. Do not enter any real PII, CJI, or sensitive case data.
                        </AlertDescription>
                    </Alert>

                    <Button onClick={handleGoogleSignIn} disabled={!!isLoading} variant="outline" className="w-full">
                        {isLoading === 'google' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon />}
                        Sign in with Google
                    </Button>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>
                    <Tabs defaultValue="sign-in" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="sign-in">Sign In</TabsTrigger>
                            <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
                        </TabsList>
                        <TabsContent value="sign-in">
                            {!showForgotPassword ? (
                                <Form {...signInForm}>
                                    <form onSubmit={signInForm.handleSubmit(onSignInSubmit)} className="space-y-4 mt-4">
                                        <FormField control={signInForm.control} name="email" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="sr-only">Email</FormLabel>
                                                <FormControl><Input placeholder="email@example.com" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={signInForm.control} name="password" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="sr-only">Password</FormLabel>
                                                <FormControl><Input type="password" placeholder="Password" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <Button type="submit" className="w-full" disabled={!!isLoading}>
                                            {isLoading === 'email' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Sign In
                                        </Button>
                                        <div className="text-center">
                                            <button 
                                                type="button"
                                                onClick={() => setShowForgotPassword(true)}
                                                className="text-sm text-muted-foreground hover:text-primary underline"
                                            >
                                                Forgot your password?
                                            </button>
                                        </div>
                                    </form>
                                </Form>
                            ) : (
                                <Form {...resetForm}>
                                    <form onSubmit={resetForm.handleSubmit(handlePasswordReset)} className="space-y-4 mt-4">
                                        <FormField control={resetForm.control} name="email" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl><Input placeholder="email@example.com" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <Button type="submit" className="w-full" disabled={!!isLoading}>
                                            {isLoading === 'reset' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Send Reset Email
                                        </Button>
                                        <div className="text-center">
                                            <button 
                                                type="button"
                                                onClick={() => setShowForgotPassword(false)}
                                                className="text-sm text-muted-foreground hover:text-primary underline"
                                            >
                                                Back to sign in
                                            </button>
                                        </div>
                                    </form>
                                </Form>
                            )}
                        </TabsContent>
                        <TabsContent value="sign-up">
                             <Form {...signUpForm}>
                                <form onSubmit={signUpForm.handleSubmit(onSignUpSubmit)} className="space-y-4 mt-4">
                                    <FormField control={signUpForm.control} name="email" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="sr-only">Email</FormLabel>
                                            <FormControl><Input placeholder="email@example.com" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={signUpForm.control} name="password" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="sr-only">Password</FormLabel>
                                            <FormControl><Input type="password" placeholder="Password" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <Button type="submit" className="w-full" disabled={!!isLoading}>
                                         {isLoading === 'email' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Create Account
                                    </Button>
                                </form>
                            </Form>
                        </TabsContent>
                    </Tabs>
                </CardContent>
                 <CardFooter className="flex flex-col items-center justify-center text-xs">
                     <p className="text-muted-foreground text-center">
                        By signing in, you agree to our <Link href="/terms-of-use" className="underline hover:text-primary">Terms of Use</Link>.
                     </p>
                     <Link href="/" className="underline hover:text-primary mt-2">
                        Return to Landing Page
                     </Link>
                </CardFooter>
            </Card>
        </div>
    )
}
