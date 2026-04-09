import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("praja_raksha_session");
  const { pathname } = request.nextUrl;

  // Define protected routes
  const isAdminRoute = pathname.startsWith("/admin");
  const isDeveloperRoute = pathname.startsWith("/developer") || pathname.startsWith("/ai-assistant");
  const isLoginRoute = pathname === "/login";

  // 1. Mandatory Login for Protected Portals
  if ((isAdminRoute || isDeveloperRoute) && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. Specialized Check (Authorization)
  if (session) {
    const user = JSON.parse(session.value);

    // Prevent non-admins from hitting admin routes
    if (isAdminRoute && user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Prevent non-developers from hitting developer routes
    if (isDeveloperRoute && user.role !== "DEVELOPER" && user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Redirect logged-in users away from login page
    if (isLoginRoute) {
      if (user.role === "ADMIN") return NextResponse.redirect(new URL("/admin", request.url));
      if (user.role === "DEVELOPER") return NextResponse.redirect(new URL("/developer", request.url));
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

// Ensure middleware runs on the relevant routes
export const config = {
  matcher: ["/admin/:path*", "/developer/:path*", "/ai-assistant/:path*", "/login"],
};
