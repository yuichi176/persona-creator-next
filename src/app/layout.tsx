import type { Metadata } from 'next'
import 'the-new-css-reset/css/reset.css'
import './globals.css'

import { Jura } from 'next/font/google'
import Layout from '@/components/Layout'

const jura = Jura({
  display: 'swap',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Persona Creator',
  description: 'Simple tool to create persona',
}

export const fetchCache = 'default-no-store'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={jura.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
