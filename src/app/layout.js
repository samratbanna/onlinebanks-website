import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from "./providers"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Online Banks',
  description: 'Online Banks Website',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css" />
        <link rel="icon" href="/assets/onlineBanks.jpg" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}