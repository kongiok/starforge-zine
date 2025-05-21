// lib/i18n/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "~/locales/i18n.config";
import { getLocaleBySegment } from "~/locales/i18n.helper";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";

const supportedLocalePaths = locales.map((l) => l.path);

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // 情況 1: 沒有任何路徑（/）時，根據 Header 導向
  if (pathname === "/") {
    const headers = Object.fromEntries(request.headers.entries());
    const negotiator = new Negotiator({ headers });
    const accepted = negotiator.languages();

    const matchedPath = match(
      accepted,
      supportedLocalePaths,
      defaultLocale.path,
    );

    const url = request.nextUrl.clone();
    url.pathname = `/${matchedPath}`;
    return NextResponse.redirect(url);
  }

  // 情況 2 與 3: 若 pathname 含語言代碼（/xxx/...）
  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];

  const resolved = getLocaleBySegment(maybeLocale);

  if (!resolved) {
    // 情況 3: 模糊找不到也嘗試 fallback 到預設
    const fallback = defaultLocale;
    const rest = segments.slice(1).join("/");
    const url = request.nextUrl.clone();
    url.pathname = `/${fallback.path}${rest ? "/" + rest : ""}`;
    return NextResponse.redirect(url);
  }

  // 情況 2: 找到 alias 但不是正規 path → 正規化重導向
  if (maybeLocale !== resolved.path) {
    const rest = segments.slice(1).join("/");
    const url = request.nextUrl.clone();
    url.pathname = `/${resolved.path}${rest ? "/" + rest : ""}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
