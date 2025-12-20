import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that REQUIRE authentication
const protectedRoutes = ["/dashboard"];

// Routes that should NOT be accessible when authenticated
const authRoutes = ["/login", "/register"];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Read token from cookies (middleware-safe)
  const token = req.cookies.get("app_refresh_token")?.value;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // 1️⃣ Unauthenticated user accessing protected route → login
  if (isProtectedRoute && !token) {
    console.log("Go to login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 2️⃣ Authenticated user accessing login/register → dashboard
  if (isAuthRoute && token) {
    console.log("Go to dashboard");
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 3️⃣ Allow everything else
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
      Apply middleware to all routes
      except Next.js internals and static assets
    */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
