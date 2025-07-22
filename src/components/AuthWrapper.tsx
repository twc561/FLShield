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
    const [hasRedirected, setHasRedirected] = useState(false);
    
    const [user, loading] = useAuthState(auth);
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

    // Handle redirects with better logic
    useEffect(() => {
        if (!isMounted || loading || hasRedirected) return;

        // If user is authenticated and on login/home page, redirect to dashboard
        if (user && (pathname === '/' || pathname === '/login')) {
            console.log('Redirecting authenticated user to dashboard...');
            setHasRedirected(true);
            window.location.href = '/dashboard';
            return;
        }

        // If user is not authenticated and on protected page, redirect to login
        if (!user && !isPublicPage) {
            console.log('Redirecting unauthenticated user to login...');
            setHasRedirected(true);
            router.push('/login');
            return;
        }

    }, [user, loading, pathname, router, isMounted, isPublicPage, hasRedirected]);

    // Reset redirect flag when pathname changes
    useEffect(() => {
        setHasRedirected(false);
    }, [pathname]);

    // Don't render anything until mounted (prevents hydration issues)
    if (!isMounted) {
        return <LoadingScreen />;
    }

    // Show loading while auth is being determined
    if (loading) {
        return <LoadingScreen />;
    }

    // Show loading if user should be redirected
    if (user && (pathname === '/' || pathname === '/login') && !hasRedirected) {
        return <LoadingScreen />;
    }

    // Show loading if no user on protected page
    if (!user && !isPublicPage && !hasRedirected) {
        return <LoadingScreen />;
    }

    return <>{children}</>;
}