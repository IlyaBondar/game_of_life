import Header from '@/components/shared/Header';
import Providers from '@/providers/providers';
import { UserProvider } from "@auth0/nextjs-auth0/client";
import type { Metadata } from 'next';
import './globals.scss';

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
    <html lang="en" className="dark">
      <body className="flex-1 p-2 sm:p-6 flex flex-col h-screen max-h-screen dark bg-black text-white bg-none">
        <UserProvider>
          <Providers>
            <Header/>
            <main className="wrapper flex flex-col items-center h-full overflow-y-auto">
              {children}
            </main>
          </Providers>
        </UserProvider>
      </body>
    </html>
  )
}