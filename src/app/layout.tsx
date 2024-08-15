import { Toaster } from "@/components/ui/sonner"
// import { Analytics } from "@vercel/analytics/react"
import Logo from '@assets/icon.png'
import './globals.css'
import { siteConfig } from "@src/config/site";

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  themeColor: siteConfig.themeColor,
  icons: siteConfig.icons,
  // metadataBase: siteConfig.metadataBase,
  openGraph: siteConfig.openGraph,
  twitter: siteConfig.twitter,
};




export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  const getClarityAnalyticsTag = () => {
    return {
      __html: `
       (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "nn68ny4psp");`,
    }
  }

  const getGoogleAnalyticsTag = () => {
    return {
      __html: `
      window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-18KTPX8NV1');
      `,
    }
  }


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
      {/* <Analytics /> */}
      <script dangerouslySetInnerHTML={getClarityAnalyticsTag()} />
      <script dangerouslySetInnerHTML={getGoogleAnalyticsTag()} />
    </html>
  )
}
