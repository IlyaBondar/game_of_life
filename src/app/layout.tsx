import type { Metadata } from 'next'
import './globals.scss'
import Header from '@/components/shared/Header'
import Providers from '@/providers/providers';
import { UserProvider } from "@auth0/nextjs-auth0/client";

export const metadata: Metadata = {
  title: 'Game of Life',
  description: 'Start state and iteration count are provided by GPT chat',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex-1 p-2 sm:p-6 flex flex-col h-screen overflow-hidden">
        <UserProvider>
          <Providers>
            <Header/>
            <main className="flex flex-col items-center h-full">
              {children}
            </main>
          </Providers>
        </UserProvider>
      </body>
    </html>
  )
}