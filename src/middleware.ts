import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJwt, verifyJwt } from "@/utils/jwtUtils"; // Custom JWT utility functions

const secret = process.env.JWT_SECRET || "your-secret-key";

export async function middleware(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie");
  let token: string | undefined;
  if (cookieHeader) {
    token = cookieHeader
      .split(";")
      .find((cookie) => cookie.trim().startsWith("token="))
      ?.split("=")[1];
  }

  if (!token) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login'; // Set the path to '/login'
    
    // Redirect to the login page
    return NextResponse.redirect(loginUrl);
  }

  try {
    const isValid = verifyJwt(token, secret);
    if (!isValid) {
      throw new Error("Invalid token");
    }
    const payload = decodeJwt(token);

    const response = NextResponse.next();
    response.headers.set("user", JSON.stringify(payload));
    return response;
  } catch (err) {
    console.log(err, "Error verifying token");
    return NextResponse.redirect("/login"); // Redirect on token verification failure
  }
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/api/code/save","/api/code/update","/api/code/delete","/api/auth/autoLogin"],
};
