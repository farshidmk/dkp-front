import { User, UserRole } from "@/types/user";
import { NextResponse, NextRequest } from "next/server";

const PUBLIC_PATHS = ["/auth/login", "/auth/signup"]; // routes without auth

export default function middleware(req: NextRequest) {
  console.log("🔍 Middleware running for:", req.nextUrl.pathname);

  const { pathname } = req.nextUrl;

  // Allow public routes without token check
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Get token from cookies
  const token = req.cookies.get("token")?.value;

  if (!token) {
    // No token → redirect to login
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    const userInfo = JSON.parse(
      req.cookies.get("userInfo")?.value ?? ""
    ) as User;
    // No Role → redirect to login
    if (!userInfo || !userInfo.role) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    if (pathname.includes("/admin") && userInfo.role !== UserRole.ADMIN) {
      return NextResponse.redirect(new URL("/403", req.url)); // Forbidden page
    }

    // Token is valid and role allowed → continue
    return NextResponse.next();
  } catch (err) {
    console.error("Invalid token:", err);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

// export const config = {
//   matcher: [
//     // Match all routes except static files & api routes you want to skip
//     "/((?!_next/static|_next/image|favicon.ico).*)",
//   ],
// };

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
