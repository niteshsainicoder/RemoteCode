import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/usermodel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dbconnect } from "@/dbconfig/dbconnect";

export async function POST(request: NextRequest) {
   
  try {
    dbconnect();
    const body = await request.json();
    const { username, password } = body;

    // Find the user by username
    const findUser = await User.findOne({ username });

    if (!findUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 400 }
      );
    }

    // Check if the password is correct
    const checkPassword = await bcrypt.compare(password, findUser.password); // Use findUser.password according to your schema

    if (!checkPassword) {
      return NextResponse.json({ message: "Wrong password" }, { status: 400 });
    }

    // Generate JWT token
    if (!process.env.JWT_SECRET) {
      return NextResponse.json(
        { message: "JWT Secret not set in environment variables" },
        { status: 500 }
      );
    }

    const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Create response and set cookie with JWT token
    const response = NextResponse.json(
      { message: "Successfully authenticated" },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true, // Ensures the cookie is not accessible via JavaScript
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day in seconds
    });

    return response;
  } catch (error:any) {
    console.error("Error during authentication:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
