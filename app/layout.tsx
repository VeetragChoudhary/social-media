import type { Metadata } from "next"

import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"

export const metadata: Metadata = {
  title: "Socialize",
  description: "A modern social media application powered by Next.js",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen ">
              <Navbar />

              <main className="py-8 ">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    <div className="hidden lg:block lg:col-span-3">
                      <Sidebar />
                    </div>

                    <div className="lg:col-span-9">
                      {children}
                    </div>
                    
                  </div>
                </div>
              </main>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
