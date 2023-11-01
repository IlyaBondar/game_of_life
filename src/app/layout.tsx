import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import clx from 'classnames';

const inter = Inter({ subsets: ['latin'] })

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
      <body className="flex min-h-full flex-col items-center">
          <Header/>
          <main className='flex justify-between gap-4'>{children}</main>
          <Footer/>
      </body>
    </html>
  )
}
