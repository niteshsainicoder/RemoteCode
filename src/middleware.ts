import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJwt, verifyJwt } from "@/utils/jwtUtils"; // Custom JWT utility functions
import { cookies } from "next/headers";

const secret = process.env.JWT_SECRET || "your-secret-key"; // Define your secret key here

// Middleware function
export async function middleware(request: NextRequest) {
  // Check if the request contains a valid token in the cookies
  const cookieHeader = request.headers.get("cookie");
  let token: string | undefined;

  if (cookieHeader) {
    // Find the 'token' cookie and extract the value
    token = cookieHeader
      .split(";")
      .find((cookie) => cookie.trim().startsWith("token="))
      ?.split("=")[1]; // Extract the token value
  }

  if (!token) {
       console.log("no token found");
    return NextResponse.json({data:"user not found"},{status: 401});
  }

  try {
    // Verify the token using your JWT secret
    const isValid = verifyJwt(token, secret);
    if (!isValid) {
      throw new Error("Invalid token");
    }
    const payload = decodeJwt(token);

    const response = NextResponse.next();
    // If the token is valid, allow the request to proceed
    response.headers.set("user",JSON.stringify(payload));
    response.headers.set("Access-Control-Allow-Origin", "*");
    return response;
  } catch (err) {
    console.log(err, "Error verifying token");
    // If token verification fails, return a 403 forbidden response
    return NextResponse.json(
      { success: false, message: "Forbidden: Invalid token" },
      { status: 403 }
    );
  }
}

// Apply this middleware to specific routes
export const config = {
  matcher: ["/api/code/:path*", "/api/auth/login"], // Apply to all API routes
};
