import { Toaster } from "@/components/ui/sonner"
import { Analytics } from "@vercel/analytics/react"
import Logo from '@assets/icon.png'
import './globals.css'

export const metadata = {
  title: 'x cards',
  description: 'Rebuild your bookmarks with AI',
}




export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href={Logo.src} />
      </head>
      <body>
        {children}
        <Toaster
          richColors
          position="top-center"
          duration={2000}
        />
      </body>
      <Analytics />

    </html>
  )
}
