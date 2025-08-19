
'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/lib/firebase'
import { Loader2 } from 'lucide-react'
import { useSubscription } from '@/hooks/use-subscription'

const LoadingScreen = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
)

export function AuthWrapper({ children }: { children: React.ReactNode }) {
    const [user, isLoading] = useAuthState(auth);
    const { isFeatureFree } = useSubscription();
    const pathname = usePathname();
    const router = useRouter();

    const isPublicPage = isFeatureFree(pathname);

    useEffect(() => {
        if (isLoading) return;

        // If not authenticated and trying to access a protected page, redirect
        if (!user && !isPublicPage) {
            router.push('/login');
        }

        // If authenticated and trying to access a public-only page like login, redirect to dashboard
        if (user && pathname === '/login') {
            router.push('/dashboard');
        }
    }, [user, isLoading, isPublicPage, pathname, router]);

    if (isLoading) {
        return <LoadingScreen />;
    }

    // While redirecting, show a loading screen to prevent flashing content
    if (!user && !isPublicPage) {
        return <LoadingScreen />;
    }
    
    if (user && pathname === '/login') {
        return <LoadingScreen />;
    }

    return <>{children}</>;
}
