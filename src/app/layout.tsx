import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import dynamic from "next/dynamic";
import Navbar from '@/app/components/Navbar';
const SessionProvider = dynamic(()=> import('@/app/components/SessionProvider'), {ssr:false});
const AuthSessionProvider = dynamic(()=> import('@/app/components/AuthSessionProvider'), {ssr:false});
const inter = Inter({ subsets: ['latin'] });


export const metadata: Metadata = {
  title: 'POP UP',
  description: 'Proof of Participation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar></Navbar>
        <AuthSessionProvider>
          <SessionProvider>
            {children}
          </SessionProvider>
        </AuthSessionProvider>
      </body>
    </html>
  )
}
