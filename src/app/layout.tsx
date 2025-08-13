
import type { Metadata } from "next"
import { Inter, Roboto_Slab } from 'next/font/google'
import "@/app/globals.css"
import { cn } from "@/lib/utils"
import { ClientLayout } from "./ClientLayout"

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const roboto_slab = Roboto_Slab({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-slab',
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
    <html lang="en" className={cn("dark", inter.variable, roboto_slab.variable)} suppressHydrationWarning>
      <head>
        {/* The theme-color meta tags will be managed by the AppShell or a dedicated component */}
      </head>
      <body className={cn("antialiased min-h-screen")} suppressHydrationWarning={true}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
