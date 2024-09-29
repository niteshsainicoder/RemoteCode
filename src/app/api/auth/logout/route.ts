import { decodeJwt, verifyJwt } from "@/utils/jwtUtils";
import { NextRequest, NextResponse } from "next/server";
import { isValid } from "zod";

export async function GET(req: NextRequest, res: NextResponse) {
  const cookieHeader = req.headers.get("cookie");
  let token;
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
    const isValid = verifyJwt(token, process.env.JWT_SECRET!);
    if (!isValid) {
      console.log("Invalid token");
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 403 }
      );
    }
const response= NextResponse.json(
      { message: "logout succesfully" },
      { status: 200 }
    );
    response.cookies.delete("token");
    return response;
  } catch (err) {
    console.log("Error during token verification", err);
  }
}
