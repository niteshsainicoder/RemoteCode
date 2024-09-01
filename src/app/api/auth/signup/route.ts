import jwt from "jsonwebtoken";
import { User } from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";
import { dbconnect } from "@/dbconfig/dbconnect";

// Signup Handler
export async function POST(request: NextRequest) {
  try {
    // Ensure that the database is connected before proceeding
    await dbconnect();

    const { username, email, password } = await request.json();

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Create a new user; middleware will hash the password
    const newUser = new User({
      username,
      email,
      password, // Password will be hashed by middleware
    });
    await newUser.save();

    // Create a JWT token
    if (!process.env.JWT_SECRET) {
      return NextResponse.json(
        { message: "JWT Secret not set in environment variables" },
        { status: 500 }
      );
    }

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return NextResponse.json({ token, user: newUser }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
