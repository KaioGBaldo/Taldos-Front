import { Roboto } from '@next/font/google'
import { configureStore } from '@reduxjs/toolkit'
import 'animate.css'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import Script from 'next/script'
import { Provider } from 'react-redux'
import FooterPage from '../components/FooterPage'
import loginSlice from '../reducers/loginSlice'
import userSlice from '../reducers/userSlice'
import '../styles/FlaFramework.scss'
import '../styles/Global.scss'
import '../styles/navbar.scss'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '700']
})

function MyApp({ Component, pageProps, session }) {

  const store = configureStore({
    reducer: {
      login: loginSlice,
      user: userSlice
    }
  })

  // store.subscribe(() => console.log(store.getState()))

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href={data.icon} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#111A21" />

        <meta name="creator" content={data.autor} />
        <meta name="author" content={data.autor} />
        <meta name="keywords" content="" />
        <meta name="description" content={data.desc} />

        <meta name="twitter:title" content={data.title} />
        <meta name="twitter:description" content={data.desc} />
        <meta name="twitter:image" content={data.icon} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={data.domain} />
        <meta name="twitter:creator" content="@Flagamee" />

        <meta property="og:title" content={data.title} />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={data.title} />
        <meta property="og:description" content={data.desc} />
        <meta property="og:image" content={data.icon} />
        <meta property="og:url" content={data.domain} />

        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <title>Taldo&lsquo;s Bar</title>

        <meta name="application-name" content={data.title} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={data.title} />
        <meta name="description" content={data.desc} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        {/* <meta name="msapplication-config" content="/icons/browserconfig.xml" /> */}
        <meta name="msapplication-TileColor" content="#dc494c" />
        <meta name="msapplication-tap-highlight" content="no" />

        <link rel="apple-touch-icon" href={data.icon} />

        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href={data.icon} />

      </Head>
      <SessionProvider session={session}>
        <Provider store={store} >
          <main className={roboto.className}>

            {/* Google Analytics */}
            <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-F2MXMZ9KL7" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-F2MXMZ9KL7');
             `}
            </Script>

            <Component {...pageProps} />
            <FooterPage />
          </main>
        </Provider>
      </SessionProvider>
    </>
  )
}

const data = {
  autor: 'Flaviano Rodrigues Dos Santos',
  icon: '/favicon.png',
  title: "Taldo's Bar",
  desc: 'O RPG do seu jeito !',
  domain: process.env.DEFAULT_URL
}

export default MyApp
