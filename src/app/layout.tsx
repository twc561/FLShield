import type { Metadata } from "next"
import "@/app/globals.css"
import { cn } from "@/lib/utils"
import { ClientLayout } from "./ClientLayout"
import { ErrorBoundary } from "react-error-boundary"

export const metadata: Metadata = {
  title: "Shield FL - Law Enforcement Assistant",
  description: "AI-powered law enforcement assistant for Florida officers",
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Shield FL',
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Shield FL',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <title>Florida Shield</title>
        <meta name="description" content="The essential digital partner for the modern Florida officer." />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn("antialiased min-h-screen")} suppressHydrationWarning>
        <div suppressHydrationWarning>
          <ClientLayout>
            {children}
          </ClientLayout>
        </div>
      </body>
    </html>
  )
}