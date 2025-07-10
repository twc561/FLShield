
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
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);

        if (!isFirebaseConfigured) {
            console.warn("Firebase is not configured. Authentication will be skipped.");
            setIsAuthenticated(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth!, (user: User | null) => {
            setIsAuthenticated(!!user);
        });

        return () => unsubscribe();
    }, []);

    const publicPages = [
        "/", "/login", "/features", "/agency-intelligence",
        "/cjis-compliance", "/support", "/request-demo",
        "/terms-of-use", "/privacy-policy", "/security",
    ];
    const authPages = ["/", "/login"];

    const isPublicPage = publicPages.includes(pathname);

    useEffect(() => {
        if (isAuthenticated === null) {
            return; // Wait for authentication check to complete
        }

        if (!isAuthenticated && !isPublicPage) {
            router.push('/login');
        }

        if (isAuthenticated && authPages.includes(pathname)) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, isPublicPage, pathname, router]);

    // This is the key to fixing the hydration error.
    // We don't render anything that depends on client-side state until after the component has mounted.
    if (!isMounted) {
        return <LoadingScreen />;
    }
    
    if (isAuthenticated || isPublicPage) {
         return <>{children}</>;
    }

    // This will be shown while redirecting or if auth state is still resolving
    return <LoadingScreen />;
}
