import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { WalletProvider } from "@/components/wallet-provider"
import { AuthProvider } from "@/components/auth-provider"
import { SupabaseProvider } from "@/components/supabase-provider"
import { ToastProvider } from "@/hooks/use-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HLAhub - Blockchain-Powered Organ Matching Platform",
  description:
    "Revolutionary healthtech platform connecting organ donors and recipients using HLA matching and Algorand blockchain technology",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ToastProvider>
            <SupabaseProvider>
              <AuthProvider>
                <WalletProvider>
                  {children}
                  <Toaster />
                </WalletProvider>
              </AuthProvider>
            </SupabaseProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}