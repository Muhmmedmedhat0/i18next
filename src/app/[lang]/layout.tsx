import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {i18n } from '../../i18n/i18n-config';
import {RootLayoutProps } from '@/types/Layout.types';
import Header from '../components/header';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}


// generate static params 
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  // console.log(params.lang)
  return(
    <html lang={params.lang} dir={params.lang === 'ar' ? 'rtl' : 'ltr'}>
    <head>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={metadata.description || ''} />
      <title>{metadata.title && 'Create Next App'}</title>
    </head>
      <body className={inter.className}>
        <Header  lang={params.lang}/>
      <main className="container mx-auto">{children}</main>
      
      </body>
    </html>
  )
}