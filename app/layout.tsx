import "@/styles/globals.css"
import { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { fontMono } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased ",
            fontMono.className
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
