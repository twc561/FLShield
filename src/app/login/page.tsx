'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'

import { auth, isFirebaseConfigured } from '@/lib/firebase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from '@/hooks/use-toast'
import { Loader2, AlertTriangle, Shield, Users, Lock, CheckCircle2, Star, Zap, Eye, EyeOff } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Fingerprint, Mail } from 'lucide-react'

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
    email: z.string().min(1, { message: "Email is required." }).email({ message: "Please enter a valid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    terms: z.boolean().optional(),
    updates: z.boolean().optional(),
})

const features = [
    { icon: Shield, title: "Secure Authentication", description: "Enterprise-grade security with multi-factor support" },
    { icon: Users, title: "Role-Based Access", description: "Granular permissions for different user types" },
    { icon: Lock, title: "Data Protection", description: "End-to-end encryption for sensitive information" },
]

const benefits = [
    "AI-Powered Legal Research & Analysis",
    "Comprehensive Florida Statutes Database",
    "Interactive Training Scenarios",
    "Real-Time Case Law Updates",
    "Mobile-Optimized Field Tools",
    "24/7 Technical Support"
]

export default function LoginPage({ isSignUp }: { isSignUp?: boolean }) {
    const [isLoading, setIsLoading] = useState<"google" | "signin" | "signup" | "passkey" | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [showSignUpPassword, setShowSignUpPassword] = useState(false)
    const [showForgotPassword, setShowForgotPassword] = useState(false)
    const router = useRouter()
    const { toast } = useToast()

    const form = useForm<z.infer<typeof authSchema>>({
        resolver: zodResolver(authSchema),
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            terms: false,
            updates: false
        },
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
                    description = 'An account with this email address already exists. Try signing in instead.';
                    break;
                case 'auth/weak-password':
                    title = 'Weak Password';
                    description = 'The password must be at least 6 characters long.';
                    break;
                case 'auth/network-request-failed':
                    title = 'Network Error';
                    description = 'Could not connect to the authentication service. Please check your internet connection.';
                    break;
                case 'auth/too-many-requests':
                    title = 'Too Many Attempts';
                    description = 'Too many failed login attempts. Please try again later.';
                    break;
                case 'auth/user-disabled':
                    title = 'Account Disabled';
                    description = 'This account has been disabled. Please contact support.';
                    break;
                default:
                    description = "An unexpected error occurred. Please try again or contact support.";
                    console.error("Firebase Auth Error:", error.message);
            }
        }
        toast({ variant: "destructive", title, description });
    }

    const handleGoogleSignIn = async () => {
        setIsLoading("google");
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: 'select_account'
        });

        try {
            await signInWithPopup(auth!, provider);
            toast({
                title: "Welcome to Florida Shield!",
                description: "You've been successfully signed in."
            });
        } catch (error: any) {
            console.error("Google Auth Failed:", error);
            handleAuthError(error);
        } finally {
            setIsLoading(null);
        }
    }

    const onSignInSubmit = async (values: z.infer<typeof authSchema>) => {
        setIsLoading("signin");
        try {
            await signInWithEmailAndPassword(auth!, values.email, values.password);
            toast({
                title: "Welcome back!",
                description: "You've been successfully signed in."
            });
        } catch (error) {
            handleAuthError(error);
        } finally {
            setIsLoading(null);
        }
    }

    const onSignUpSubmit = async (values: z.infer<typeof authSchema>) => {
        setIsLoading("signup");
        try {
            await createUserWithEmailAndPassword(auth!, values.email, values.password);
            toast({
                title: "Account Created Successfully!",
                description: "Welcome to Florida Shield. You're now signed in."
            });
        } catch (error) {
            handleAuthError(error);
        } finally {
            setIsLoading(null);
        }
    }

    if (!isFirebaseConfigured) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-muted via-background to-muted flex items-center justify-center p-4">
                <Card className="w-full max-w-md shadow-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-600">
                            <AlertTriangle className="h-6 w-6" />
                            Configuration Required
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">Authentication service is currently unavailable.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>System Configuration Issue</AlertTitle>
                            <AlertDescription>
                                The authentication system requires configuration. Please contact your system administrator.
                            </AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
                <div className="relative container mx-auto px-4 py-8">
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="bg-primary p-3 rounded-2xl shadow-lg">
                                <Shield className="h-8 w-8 text-primary-foreground" />
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold text-foreground mb-2">Florida Shield</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Your comprehensive digital partner for safer, smarter law enforcement operations
                        </p>
                    </div>

                    {/* Benefits Grid */}
                    <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-card/60 backdrop-blur-sm rounded-lg p-4 text-center border border-border">
                                <feature.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                                <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 pb-8">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
                    {/* Features List */}
                    <div className="space-y-6 lg:pt-8">
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <Star className="h-6 w-6 text-yellow-500" />
                                Platform Features
                            </h2>
                            <div className="space-y-3">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-center gap-3 bg-card/80 backdrop-blur-sm p-3 rounded-lg border border-green-100">
                                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                                        <span className="text-foreground font-medium">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground p-6 rounded-xl shadow-lg">
                            <div className="flex items-center gap-3 mb-3">
                                <Zap className="h-6 w-6" />
                                <h3 className="text-lg font-bold">Explore Florida Shield</h3>
                            </div>
                            <p className="text-blue-100 mb-4">
                                Experience our comprehensive law enforcement platform designed to support officers in the field.
                            </p>
                            <div className="text-sm text-blue-200 mb-3">
                                ✓ AI-powered legal research tools<br />
                                ✓ Interactive training scenarios<br />
                                ✓ Comprehensive reference guides
                            </div>
                            <div className="text-xs text-blue-200 bg-blue-900/30 p-3 rounded-lg border border-blue-400/20">
                                <strong>Development Notice:</strong> This application is currently in development and has no guarantees of functionality. Features may change or be unavailable. Not for use with sensitive or classified information.
                            </div>
                        </div>
                    </div>

                    {/* Login Form */}
                    <div className="lg:sticky lg:top-8">
                        <Card className="shadow-2xl border border-border bg-card/95 backdrop-blur-sm">
                            <CardHeader className="text-center space-y-2 pb-6">
                                <CardTitle className="text-2xl font-bold text-foreground">
                                    {form.getValues("terms") ? "Create Account" : "Welcome Back"}
                                </CardTitle>
                                <CardDescription className="text-muted-foreground">
                                    {form.getValues("terms")
                                        ? "Join the Florida Shield community today"
                                        : "Sign in to access your Florida Shield dashboard"
                                    }
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-6">
                                {/* Security Notice */}
                                <Alert className="border-orange-200 bg-orange-50">
                                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                                    <AlertTitle className="text-orange-800">For Informational Use Only</AlertTitle>
                                    <AlertDescription className="text-orange-700">
                                        This is not a CJIS-compliant system. Do not enter any real PII, CJI, or sensitive case data.
                                    </AlertDescription>
                                </Alert>

                                {/* Google Sign In */}
                                <Button
                                    onClick={handleGoogleSignIn}
                                    disabled={!!isLoading}
                                    variant="outline"
                                    className="w-full h-12 border-border hover:bg-muted/50 transition-all duration-200"
                                >
                                    {isLoading === 'google' ? (
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    ) : (
                                        <GoogleIcon />
                                    )}
                                    <span className="font-semibold">Continue with Google</span>
                                </Button>

                                {/* Divider */}
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t border-border" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="bg-card px-4 text-muted-foreground">Or continue with email</span>
                                    </div>
                                </div>

                                {/* Tabs */}
                                <Tabs defaultValue={isSignUp ? "sign-up" : "sign-in"} className="w-full">
                                    <TabsList className="grid w-full grid-cols-2 h-12">
                                        <TabsTrigger value="sign-in" className="font-semibold">Sign In</TabsTrigger>
                                        <TabsTrigger value="sign-up" className="font-semibold">Sign Up</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="sign-in" className="mt-6 space-y-4">
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(onSignInSubmit)} className="space-y-4">
                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-foreground">Email</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                    type="email"
                                                                    placeholder="officer@department.gov"
                                                                    disabled={!!isLoading}
                                                                    className="bg-background border-border focus:border-primary focus:ring-primary"
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="password"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-foreground">Password</FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <Input
                                                                        {...field}
                                                                        type={showPassword ? "text" : "password"}
                                                                        placeholder="••••••••"
                                                                        disabled={!!isLoading}
                                                                        className="bg-background border-border focus:border-primary focus:ring-primary pr-10"
                                                                    />
                                                                    <Button
                                                                        type="button"
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        onClick={() => setShowPassword(!showPassword)}
                                                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                                        disabled={!!isLoading}
                                                                    >
                                                                        {showPassword ? (
                                                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                                                        ) : (
                                                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                                                        )}
                                                                    </Button>
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-2">
                                                        <Checkbox id="remember" />
                                                        <label
                                                            htmlFor="remember"
                                                            className="text-sm text-muted-foreground cursor-pointer"
                                                        >
                                                            Remember me
                                                        </label>
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        variant="link"
                                                        className="p-0 text-primary hover:text-primary/80"
                                                        onClick={() => setShowForgotPassword(true)}
                                                    >
                                                        Forgot password?
                                                    </Button>
                                                </div>

                                                <Button
                                                    type="submit"
                                                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-medium py-2.5 transition-all duration-200"
                                                    disabled={!!isLoading}
                                                >
                                                    {isLoading === 'signin' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                                    Sign In
                                                </Button>
                                            </form>
                                        </Form>
                                    </TabsContent>

                                    <TabsContent value="sign-up" className="mt-6 space-y-4">
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(onSignUpSubmit)} className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="firstName"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-foreground">First Name</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        {...field}
                                                                        placeholder="John"
                                                                        disabled={!!isLoading}
                                                                        className="bg-background border-border focus:border-primary focus:ring-primary"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="lastName"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-foreground">Last Name</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        {...field}
                                                                        placeholder="Doe"
                                                                        disabled={!!isLoading}
                                                                        className="bg-background border-border focus:border-primary focus:ring-primary"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-foreground">Email</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                    type="email"
                                                                    placeholder="officer@department.gov"
                                                                    disabled={!!isLoading}
                                                                    className="bg-background border-border focus:border-primary focus:ring-primary"
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="password"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-foreground">Password</FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <Input
                                                                        {...field}
                                                                        type={showSignUpPassword ? "text" : "password"}
                                                                        placeholder="••••••••"
                                                                        disabled={!!isLoading}
                                                                        className="bg-background border-border focus:border-primary focus:ring-primary pr-10"
                                                                    />
                                                                    <Button
                                                                        type="button"
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                                                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                                        disabled={!!isLoading}
                                                                    >
                                                                        {showSignUpPassword ? (
                                                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                                                        ) : (
                                                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                                                        )}
                                                                    </Button>
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <div className="space-y-4">
                                                    <div className="flex items-start space-x-2">
                                                        <Checkbox id="terms" required />
                                                        <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                                                            I agree to the <Link href="/terms-of-use" className="text-primary hover:underline">Terms of Service</Link> and <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>
                                                        </label>
                                                    </div>
                                                    <div className="flex items-start space-x-2">
                                                        <Checkbox id="updates" />
                                                        <label htmlFor="updates" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                                                            Send me updates about new features and training resources
                                                        </label>
                                                    </div>
                                                </div>

                                                <Button
                                                    type="submit"
                                                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-medium py-2.5 transition-all duration-200"
                                                    disabled={!!isLoading}
                                                >
                                                    {isLoading === 'signup' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                                    Create Account
                                                </Button>
                                            </form>
                                        </Form>
                                    </TabsContent>
                                </Tabs>

                                {/* Footer */}
                                <div className="mt-8 text-center">
                                    <p className="text-xs text-muted-foreground">
                                        Trusted by law enforcement agencies across Florida
                                    </p>
                                    <div className="flex justify-center items-center mt-3 space-x-4">
                                        <div className="flex items-center space-x-1">
                                            <Shield className="w-3 h-3 text-primary" />
                                            <span className="text-xs text-muted-foreground">Secure</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Lock className="w-3 h-3 text-primary" />
                                            <span className="text-xs text-muted-foreground">Encrypted</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <CheckCircle2 className="w-3 h-3 text-primary" />
                                            <span className="text-xs text-muted-foreground">Verified</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>

                            <div className="px-6 pb-6 space-y-4">
                                <div className="text-center text-xs text-muted-foreground">
                                    By continuing, you agree to our{' '}
                                    <Link href="/terms-of-use" className="text-primary hover:text-primary/80 underline">
                                        Terms of Use
                                    </Link>
                                    {' '}and{' '}
                                    <Link href="/privacy-policy" className="text-primary hover:text-primary/80 underline">
                                        Privacy Policy
                                    </Link>
                                </div>

                                <div className="text-center">
                                    <Link href="/" className="text-sm text-primary hover:text-primary/80 underline font-medium">
                                        ← Return to Landing Page
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
                <DialogContent className="sm:max-w-md bg-card border-border">
                    <DialogHeader>
                        <DialogTitle className="flex items-center space-x-2 text-foreground">
                            <Mail className="w-5 h-5 text-primary" />
                            <span>Password Reset</span>
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            To reset your password please email admin@shieldfl.app
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setShowForgotPassword(false)} className="border-border hover:bg-muted/50">
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}