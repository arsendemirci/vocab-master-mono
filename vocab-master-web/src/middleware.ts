import { NextRequest, NextResponse } from "next/server";
import { RoutePathEnum, RouteTypeEnum } from "@enums";
import { getToken } from "next-auth/jwt";
import { routes } from "@/config";
import { validateToken } from "@/utils/tokenUtils";
import { notFound } from "next/navigation";

export default async function middleware(req: NextRequest) {
  const { route, isProtectedRoute, isPage, path } = getRouteConfig(req);

  if (!route) {
    return NextResponse.redirect(new URL(RoutePathEnum.NOT_FOUND, req.nextUrl));
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log("MIDDLEWARE GOT TOKEN ->", token);
  if (
    isProtectedRoute &&
    (!token?.user?.accessToken ||
      !(await validateToken(token?.user?.accessToken)))
  ) {
    if (isPage) {
      const nextUrl = new URL(RoutePathEnum.ACCOUNT, req.nextUrl);
      nextUrl.searchParams.set("from", "redirect");
      return NextResponse.redirect(nextUrl);
    } else {
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

const getRouteConfig = (req: NextRequest) => {
  const path = req.nextUrl.pathname;
  let route = routes.find(
    (r) =>
      r.path.includes(path) ||
      (r.children && r.children.find((ch) => ch.path.includes(path)))
  );
  if (route && !route.path.includes(path)) {
    //ana route bulundu cocuklarinda araniyor
    route = route.children?.find((ch) => ch.path.includes(path));
  }
  console.log(`[MIDDLEWARE LOG route - pat] ${route?.path} - ${path}`);

  const isProtectedRoute = route && !route.public;
  const isPage = !route || route.type == RouteTypeEnum.PAGE;

  return { route, isProtectedRoute, isPage, path };
};
// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|.*\\.png$).*)"],
};
