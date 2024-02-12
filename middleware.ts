import { NextResponse, type NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  // let cookie = req.cookies.get("_iswo_education_session_id")
  // try {
  //   const request = await fetch("http://localhost:3001/verify_session", {
  //     method: "POST",
  //     credentials: "include",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(cookie),
  //   })
  //   const response = await request.json()
  //   console.log(response)
  // } catch (error) {
  //   console.log(error)
  // }

  // const { pathname } = req.nextUrl;

  // if (loggedin && pathname === '/login') {
  //   return NextResponse.redirect(new URL('/', req.url));
  // }

  // if (!loggedin && pathname !== '/login') {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/student/:path*",
    "/super-admin/:path*",
    "/teacher/:path*",
    "/users/:path*",
    "/payments/:path*",
  ],
}
