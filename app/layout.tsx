import React from "react"
import type { Metadata } from 'next'
import { Prompt, Sarabun } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const prompt = Prompt({ 
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-prompt"
});

const sarabun = Sarabun({ 
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sarabun"
});

export const metadata: Metadata = {
  title: 'Happy Birthday My Love',
  description: 'A special surprise just for you',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="th">
      <body className={`${prompt.variable} ${sarabun.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
