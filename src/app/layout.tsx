import { Toaster } from "@/components/ui/sonner"
import { Analytics } from "@vercel/analytics/react"
import './globals.css'

export const metadata = {
  title: 'Bookmark.ai',
  description: 'Rebuild your bookmarks with AI',
}




export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

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
