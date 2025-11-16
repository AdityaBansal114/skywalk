import "@/styles/globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import type { AppProps } from "next/app"
import GoogleAnalytics from "@/components/GoogleAnalytics"
import Head from "next/head"
  
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Global <Head> — applies favicon to all pages */}
      <Head>
        <link rel="icon" href="/Logo.jpg" />
      </Head>
      <GoogleAnalytics />

      <ClerkProvider
        {...pageProps}
        appearance={{
          cssLayerName: "clerk",
        }}
      >
        <Component {...pageProps} />
      </ClerkProvider>
    </>
  )
}

export default MyApp
