import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from './src/i18n/i18n-config';


import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';


// get user locale from request headers
function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales,
  );

// local proiorty for user
// 1- user local
// 2- supported locals
// 3- default local
  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;


  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) 
      && pathname !== `/${locale}` 
      // ignore redirect for _next routes to ignore redirecting of serverd styles and static assets
      && !request.nextUrl.pathname.startsWith('/_next')
      // /en/__turbopack_sourcemap__/_next/static/chunks/_bcf331._.js.map
      && !request.nextUrl.pathname.startsWith(`/${locale}/_next`)
  );

  

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    )
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}