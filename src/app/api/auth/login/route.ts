import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/usermodel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dbconnect } from "@/dbconfig/dbconnect";

export async function POST(req: NextRequest) {
  try {
    await dbconnect();
    const rawBody = await req.text();

    const body = JSON.parse(rawBody);
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const findUser = await User.findOne({ username });

    if (!findUser) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    const checkPassword = await bcrypt.compare(password, findUser.password);

    if (!checkPassword) {
      return NextResponse.json({ message: "Wrong password" }, { status: 400 });
    }

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
      { message: "Successfully authenticated" ,user:findUser},
      { status: 200 }
    ); 
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day in seconds
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
