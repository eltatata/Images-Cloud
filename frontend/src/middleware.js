import { NextResponse } from 'next/server'

export function middleware(request) {
  const cookie = request.cookies.get("tokenSesionApp");
  if (!cookie) return NextResponse.redirect(new URL('/auth/login/?reason=unauthorized', request.url))

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/images/:path*", "/upload/:path*"],
};