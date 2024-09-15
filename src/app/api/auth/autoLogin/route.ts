import { dbconnect } from "@/dbconfig/dbconnect";
import { decodeJwt, verifyJwt } from "@/utils/jwtUtils";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.JWT_SECRET || "your-secret-key";

export async function GET(request: NextRequest) {
  await dbconnect();

  const cookieHeader = request.headers.get("cookie");
  
  let token: string | undefined;
  if (cookieHeader) {
    token = cookieHeader
      .split(";")
      .find((cookie) => cookie.trim().startsWith("token="))
      ?.split("=")[1];
  }

  if (!token) {
    console.log("No token found");
    return NextResponse.json({ data: "Token not found" }, { status: 401 });
  }

  try {
    const isValid = verifyJwt(token, secret);
    if (!isValid) {
      console.log("Invalid token");
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 403 });
    }

    const payload = decodeJwt(token);
    return NextResponse.json({ data: payload }, { status: 200 });
  } catch (err) {
    console.log("Error during token verification", err);
    return NextResponse.json({ success: false, message: "Forbidden: Invalid token" }, { status: 403 });
  }
}
