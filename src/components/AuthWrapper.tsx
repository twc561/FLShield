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
    const [user, isLoading, error] = useAuthState(auth);
    const [clientMounted, setClientMounted] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const publicPages = [
        "/",
        "/login",
        "/features",
        "/agency-intelligence",
        "/cjis-compliance",
        "/support",
        "/request-demo",
        "/terms-of-use",
        "/privacy-policy",
        "/security",
        "/for-officers",
    ];

    const isPublicPage = publicPages.includes(pathname);

    useEffect(() => {
        setClientMounted(true);
    }, []);

    useEffect(() => {
        if (!clientMounted || isLoading || isRedirecting) return;

        const handleRedirect = async () => {
            setIsRedirecting(true);
            
            try {
                // If not authenticated and trying to access a protected page, redirect
                if (!user && !isPublicPage) {
                    await router.push('/login');
                    return;
                }

                // If authenticated and trying to access the marketing homepage or login page, redirect to dashboard
                if (user && (pathname === '/' || pathname === '/login')) {
                    await router.push('/dashboard');
                    return;
                }
            } catch (error) {
                console.error('Redirect error:', error);
            } finally {
                setIsRedirecting(false);
            }
        };

        handleRedirect();
    }, [user, isLoading, isPublicPage, pathname, router, clientMounted, isRedirecting]);

    // Handle Firebase auth errors
    if (error) {
        console.error('Firebase auth error:', error);
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
                <div className="text-center">
                    <p className="text-destructive mb-4">Authentication Error</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="px-4 py-2 bg-primary text-white rounded"
                    >
                        Reload Page
                    </button>
                </div>
            </div>
        );
    }

    // Prevent hydration issues by not rendering anything during initial load
    if (!clientMounted) {
        return <LoadingScreen />;
    }

    if (isLoading || isRedirecting) {
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