
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "@/app/globals.css"
import { cn } from "@/lib/utils"
import { ClientLayout } from "./ClientLayout"

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "Florida Shield",
  description: "The essential digital partner for the modern Florida officer.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/logo.svg",
    apple: "/icons/icon-192x192.png",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn("dark", inter.variable)} suppressHydrationWarning>
      <head>
        {/* The theme-color meta tags will be managed by the AppShell or a dedicated component */}
      </head>
      <body className={cn("antialiased min-h-screen font-body")} suppressHydrationWarning={true}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
