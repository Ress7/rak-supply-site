import React from "react"
import type { Metadata } from 'next'
import { Space_Grotesk, VT323 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from 'sonner'

const _spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: '--font-sans' });
const _vt323 = VT323({ weight: "400", subsets: ["latin"], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'RAK.2K | Y2K Sneaker Culture',
  description: 'Step into the future of footwear. Rare kicks, bold style, Y2K vibes.',
  generator: 'v0.app',
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${_spaceGrotesk.variable} ${_vt323.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
        <Toaster richColors />
        <Analytics />
      </body>
    </html>
  )
}
