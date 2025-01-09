import { NextRequest, NextResponse } from "next/server";
import { RoutePathEnum } from "@enums";
import { getToken } from "next-auth/jwt";

const protectedRoutes = ["/game", "/lists", "/words", "/profile"];
const publicRoutes = ["/account", "/home", "/"];
const publicApiRoutes = /^(?!\/api\/auth\/|\/api\/user\/login\/)/;

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  console.log("is public api route", path, publicApiRoutes.test(path));
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!isPublicRoute && !token?.accessToken) {
    if (isProtectedRoute) {
      const nextUrl = new URL(RoutePathEnum.ACCOUNT, req.nextUrl);
      nextUrl.searchParams.set("from", "redirect");
      return NextResponse.redirect(nextUrl);
    }
    if (publicApiRoutes.test(path)) {
      return NextResponse.json(
        { message: "Authorization required" },
        { status: 401 }
      );
    }
  } else if (path.startsWith(RoutePathEnum.ACCOUNT) && token?.accessToken) {
    return NextResponse.redirect(new URL(RoutePathEnum.HOME, req.nextUrl));
  }
  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: [
    "/((?!api/user/login|api/auth|_next/static|_next/image|.*\\.png$).*)",
  ],
};
