'use client'

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';

const LoadingScreen = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
);

export function AuthWrapper({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const pathname = usePathname();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isFirebaseConfigured) {
            console.warn("Firebase is not configured. Authentication will be skipped.");
            setIsLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const publicPages = [
        "/", "/login", "/features", "/agency-intelligence",
        "/cjis-compliance", "/support", "/request-demo",
        "/terms-of-use", "/privacy-policy", "/security",
    ];
    const authPages = ["/login"]; // Only login page now

    const isPublicPage = publicPages.includes(pathname);
    const isAuthPage = authPages.includes(pathname);
    const isAuthenticated = !!user;

    useEffect(() => {
        if (!isFirebaseConfigured) return;

        // If user is not authenticated and trying to access a protected page, redirect to login.
        if (!isAuthenticated && !isPublicPage) {
            router.push('/login');
        }

        // If user is authenticated and on the login page, redirect to dashboard.
        if (isAuthenticated && isAuthPage) {
            router.push('/dashboard');
        }
         // If user is authenticated and on the marketing homepage, redirect to dashboard.
        if (isAuthenticated && pathname === '/') {
            router.push('/dashboard');
        }
    }, [isAuthenticated, isPublicPage, router, isLoading]);

    // Show loading screen during auth check
    if (isFirebaseConfigured && isLoading) {
        return <LoadingScreen />;
    }

    return <>{children}</>;
}