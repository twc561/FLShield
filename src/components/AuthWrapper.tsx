
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

    const publicPages = [
        "/", "/login", "/features", "/agency-intelligence",
        "/cjis-compliance", "/support", "/request-demo",
        "/terms-of-use", "/privacy-policy", "/security",
        "/for-officers"
    ];

    const isPublicPage = publicPages.includes(pathname);

    useEffect(() => {
        if (!isFirebaseConfigured) {
            console.warn("Firebase is not configured. Authentication will be skipped.");
            setIsLoading(false);
            if (!isPublicPage) {
                router.push('/login');
            }
            return;
        }

        const unsubscribe = onAuthStateChanged(auth!, (user) => {
            setUser(user);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [isPublicPage, router]);

    if (isLoading) {
        return <LoadingScreen />;
    }
    
    // If not authenticated and trying to access a protected page, redirect
    if (!user && !isPublicPage) {
        router.push('/login');
        return <LoadingScreen />;
    }

    // If authenticated and trying to access the marketing homepage, redirect to dashboard
    if (user && pathname === '/') {
        router.push('/dashboard');
        return <LoadingScreen />;
    }
    
    // If authenticated and on login page, redirect to dashboard
    if (user && pathname === '/login') {
      router.push('/dashboard');
      return <LoadingScreen />;
    }
    
    return <>{children}</>;
}
