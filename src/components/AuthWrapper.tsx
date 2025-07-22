'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/lib/firebase'
import { Loader2 } from 'lucide-react'

const LoadingScreen = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
)

export function AuthWrapper({ children }: { children: React.ReactNode }) {
    const [isMounted, setIsMounted] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);
    
    const { user, loading, error } = useAuthState(auth);
    const pathname = usePathname();
    const router = useRouter();

    // Always call hooks in the same order
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Define public pages that don't require authentication
    const isPublicPage = [
        "/",
        "/features",
        "/support", 
        "/terms-of-use",
        "/privacy-policy",
        "/security",
        "/for-officers",
        "/agency-intelligence",
        "/cjis-compliance",
        "/request-demo",
        "/login"
    ].includes(pathname);

    // Handle redirects in a single effect
    useEffect(() => {
        if (!isMounted || loading) return;

        if (user && (pathname === '/' || pathname === '/login')) {
            setIsRedirecting(true);
            router.push('/dashboard');
            return;
        }

        if (!user && !isPublicPage) {
            setIsRedirecting(true);
            router.push('/login');
            return;
        }

        setIsRedirecting(false);
    }, [user, loading, pathname, router, isMounted, isPublicPage]);

    // Don't render anything until mounted (prevents hydration issues)
    if (!isMounted) {
        return <LoadingScreen />;
    }

    // Show loading while auth is being determined
    if (loading) {
        return <LoadingScreen />;
    }

    // Show loading while redirecting
    if (isRedirecting) {
        return <LoadingScreen />;
    }

    // Show loading if user should be redirected but hasn't yet
    if (user && (pathname === '/' || pathname === '/login')) {
        return <LoadingScreen />;
    }

    // Show loading if no user on protected page
    if (!user && !isPublicPage) {
        return <LoadingScreen />;
    }

    return <>{children}</>;
}