import jwt from "jsonwebtoken";
import { User } from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";
import { dbconnect } from "@/dbconfig/dbconnect";

// Check if JWT_SECRET is set outside the function
if (!process.env.JWT_SECRET) {
  throw new Error("JWT Secret not set in environment variables");
}
dbconnect();

// Signup Handler
export async function POST(request: NextRequest) {
  try {
    // Ensure that the database is connected before proceeding

    const body = await request.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ username:username });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Create a new user; middleware will hash the password
    const newUser = new User({ username, email, password,token:username.trim() });

    // Generate JWT token
    

    // Save the new user to the database
    await newUser.save();

    return   NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error: any) {
    console.error("Error during signup:", error.message);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
