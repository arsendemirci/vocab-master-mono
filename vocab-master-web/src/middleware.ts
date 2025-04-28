import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { pageRoutesArray, apiRoutesArray } from "@/lib/router";
import { verifyToken } from "@/utils/tokenUtils";
import { pageRoutes, apiRoutes } from "@/lib/router";
import Enum from "@enums";

export default async function middleware(req: NextRequest) {
  const { route, isProtectedRoute, isAccountPage, search, isApiRoute } =
    getRouteConfig(req);

  if (!route && !isApiRoute) {
    return NextResponse.redirect(
      new URL(pageRoutes.NOT_FOUND.path, req.nextUrl)
    );
  }
  if (route?.isPublic && !isAccountPage) {
    return NextResponse.next();
  }
  let hasValidSearchToken = false;
  const hasSession = await checkUserSession(req);
  if (!isApiRoute && !hasSession && route?.token) {
    hasValidSearchToken = await checkSearchToken(search);
  }

  const isAuthorized = hasSession || hasValidSearchToken;
  if (isApiRoute && !isAuthorized && !route?.isPublic) {
    return redirectToAccount(req);
  }
  if (isProtectedRoute || isAccountPage) {
    if (isAuthorized && isAccountPage) {
      //if authorized already, prevent access to account page
      return NextResponse.redirect(new URL(pageRoutes.HOME.path, req.nextUrl));
    }
    if (!isAuthorized && !isAccountPage) {
      return redirectToAccount(req);
    }
  }
  return NextResponse.next();
}
const checkSearchToken = async (search) => {
  const token = search.get(Enum.Route.SearchKey.TOKEN);
  const tokenType = search.get(Enum.Route.SearchKey.TOKEN_TYPE);
  if (search && token && tokenType) {
    const { status } = await verifyToken(token, Enum.Token.Type.VERIFICATION);
    if (status === Enum.Token.Status.OK) {
      //verify the token from db
      if (tokenType === Enum.Token.Type.ACTIVATION) {
        const res = await apiRoutes.USER_GET_VERIFICATION.call({
          code: token,
          type: tokenType,
        });
        return res.status === Enum.Token.Status.OK;
      } else {
        return true;
      }
    }
  }
  return false;
};
const getRouteConfig = (req: NextRequest) => {
  const path = req.nextUrl.pathname;

  const search = req.nextUrl.searchParams;
  const isAccountPage = path == pageRoutes.ACCOUNT.path;
  const isSignoutPage = path == pageRoutes.SIGNOUT.path;
  const isApiRoute = path.startsWith("/api/");
  let route: any = null;
  if (isApiRoute) {
    route = apiRoutesArray.find((r) => r.path === path);
  } else {
    route = pageRoutesArray.find(
      (r) =>
        r.path === path ||
        (r.children && r.children.find((ch) => ch.path === path))
    );
    if (route && route.path !== path) {
      //ana route bulundu cocuklarinda araniyor
      route = route.children?.find((ch) => ch.path == path);
    }
  }

  const isProtectedRoute = route && !route.isPublic;

  return {
    route,
    isProtectedRoute,
    isAccountPage,
    path,
    search,
    isSignoutPage,
    isApiRoute,
  };
};
const checkUserSession = async (req: NextRequest) => {
  // Check if the request has a valid session token
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  return token ? true : false;
};
const checkUpdateSession = async (req: NextRequest) => {
  const reqOwner = req.headers.get(Enum.Api.SourceHeader.KEY);
  let hasAccess = false;
  let hasSession = false;
  let hasToken = reqOwner === Enum.Api.SourceHeader.NEXT_AUTH;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (
    token &&
    token.user &&
    token.user.accessToken &&
    token.user.refreshToken
  ) {
    hasSession = true;
    //verify the validity of accessToken
    const { status: accessStatus } = await verifyToken(
      token.user.accessToken,
      Enum.Token.Type.ACCESS
    );

    hasAccess = accessStatus !== Enum.Token.Status.INVALID;
  } else if (hasToken) {
    hasAccess = true;
    hasSession = true;
  }
  return { hasAccess, hasSession };
};

const redirectToAccount = (req: NextRequest) => {
  return NextResponse.redirect(
    new URL(`${pageRoutes.ACCOUNT.path}`, req.nextUrl)
  );
};
// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!favicon.ico|api/auth|_next/static|_next/image|.*\\.png$).*)"],
};
