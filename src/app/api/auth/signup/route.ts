import jwt from "jsonwebtoken";
import { User } from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";
import { dbconnect } from "@/dbconfig/dbconnect";

// Check if JWT_SECRET is set outside the function
if (!process.env.JWT_SECRET) {
  throw new Error("JWT Secret not set in environment variables");
}

// Signup Handler
export async function POST(request: NextRequest) {
  try {
    // Ensure that the database is connected before proceeding
    await dbconnect();

    const body = await request.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Create a new user; middleware will hash the password
    const newUser = new User({ username, email, password });

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET!, { expiresIn: "1d" });

    // Assign token to the user object
    newUser.token = token;

    // Save the new user to the database
    await newUser.save();

    const response = NextResponse.json({ user: newUser }, { status: 201 });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day in seconds
    });

    return response;
  } catch (error: any) {
    console.error("Error during signup:", error.message);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
