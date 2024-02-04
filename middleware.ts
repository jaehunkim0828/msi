import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request: NextRequest) {
  const acceptLanguage =
    request.headers.get("accept-language") ??
    "en-US;q=0.9,en;q=0.8,ko-KR;q=0.7";
  let headers = { "accept-language": acceptLanguage };
  let languages = new Negotiator({ headers }).languages();
  let locales = ["en", "en-US", "ko", "ko-KR"];
  let defaultLocale = "en";
  const locale = match(languages, locales, defaultLocale);
  return locale;
}

export function middleware(request: NextRequest) {
  let locales = ["en", "en-US", "ko", "ko-KR"];
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - 파일 확장자를 포함하는 문자열
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|.*\\..*|favicon.ico).*)",
  ],
};
