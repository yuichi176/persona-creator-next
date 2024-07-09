import type { Metadata } from 'next'
import 'the-new-css-reset/css/reset.css'
import './globals.css'

import { Jura } from 'next/font/google'
import Layout from '@/components/Layout'

const jura = Jura({
  subsets: ['latin', 'latin-ext'],
  styles: ['normal'],
  display: 'swap',
  variable: '--font-jura',
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
    <html lang="en" className={jura.variable}>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
