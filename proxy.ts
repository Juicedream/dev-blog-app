import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminRoleLinks, defaultLinks, userRoleLinks } from "@/lib/definitions";
import { extractSimilarItemsFromArrayObj } from "@/utils/helpers";
import { decrypt } from "@/app/lib/session";

const adminRoutes = extractSimilarItemsFromArrayObj(
  "href",
  adminRoleLinks,
) as string[];
const userRoutes = extractSimilarItemsFromArrayObj(
  "href",
  userRoleLinks,
) as string[];

const publicRoutes = extractSimilarItemsFromArrayObj(
  "href",
  defaultLinks,
) as string[];

const protectedRoutes = [
  ...adminRoutes,
  ...userRoutes,
  "/blogs",
  "/blogs/create",
  "/blogs/:id",
  "/blogs/:id/edit",
];

function matchesDynamicRoute(path: string, routes: string[]) {
  return routes.some((link) => {
    const pattern = link.replace(/:[\w]+/g, "[^/]+");
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(path);
  });
}

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  const isLoggedIn = !!session?.userId;
  const userRole = session?.role as string | undefined;

  const isProtectedRoute = matchesDynamicRoute(path, protectedRoutes);
  const isPublicRoute = publicRoutes.includes(path);
  const isAdminRoute = matchesDynamicRoute(path, adminRoutes);
  const isUserRoute = matchesDynamicRoute(path, userRoutes);

  // Not logged in trying to access protected route
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }

  // Logged in trying to access sign-in/sign-up → redirect to home
  if (isPublicRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // User trying to access admin routes
  if (isAdminRoute && userRole !== "admin") {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // Admin trying to access user routes
  if (isUserRoute && userRole !== "user") {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
