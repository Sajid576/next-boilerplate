import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const isLoggedIn = !!req.nextauth.token;
    const isLoginPage = req.nextUrl.pathname === "/";

    if (isLoggedIn && isLoginPage) {
      // Redirect to dashboard if user is logged in and trying to access login page
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isLoggedIn = !!token;
        const isLoginPage = req.nextUrl.pathname === "/";
        return isLoggedIn || isLoginPage;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
