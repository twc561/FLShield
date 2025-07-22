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
    const { user, loading } = useAuthState(auth);
    const pathname = usePathname();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    // Prevent hydration issues
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

    // Redirect authenticated users from landing page to dashboard
    useEffect(() => {
        if (isMounted && !loading && user && (pathname === '/' || pathname === '/login')) {
            router.push('/dashboard');
        }
    }, [user, loading, pathname, router, isMounted]);

    // Redirect unauthenticated users to login (except on public pages)
    useEffect(() => {
        if (isMounted && !loading && !user && !isPublicPage) {
            router.push('/login');
        }
    }, [user, loading, isPublicPage, router, isMounted]);

    // Show loading screen while auth state is being determined or before mounting
    if (!isMounted || loading) {
        return <LoadingScreen />;
    }

    // While redirecting, show a loading screen to prevent flashing content
    if (!user && !isPublicPage) {
        return <LoadingScreen />;
    }

    if (user && (pathname === '/' || pathname === '/login')) {
        return <LoadingScreen />;
    }

    return <>{children}</>;
}