import { dbconnect } from "@/dbconfig/dbconnect";
import { decodeJwt, verifyJwt } from "@/utils/jwtUtils";
import { NextRequest, NextResponse } from "next/server";
const secret = process.env.JWT_SECRET || "your-secret-key"; // Define your secret key here

export async function GET(request: NextRequest) {
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
    return NextResponse.json({ data: "token not found" }, { status: 401 });
  }

  try {
   await dbconnect();
    // Verify the token using your JWT secret
    const isValid = verifyJwt(token, secret);
    if (!isValid) {
      throw new Error("Invalid token");
    }
    const payload = decodeJwt(token);
    return NextResponse.json({ data: payload }, { status: 200 });
  } catch (err) {
    // If token verification fails, return a 403 forbidden response
    return NextResponse.json(
      { success: false, message: err },
      { status: 403 }
    );
  }
}
