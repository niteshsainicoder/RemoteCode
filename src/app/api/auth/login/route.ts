import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/usermodel";
import bcrypt from "bcrypt";
import { dbconnect } from "@/dbconfig/dbconnect";
import Jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    dbconnect();

    // Handle manual login if no user header is present (i.e., token is invalid or user is logging in)
    const rawBody = await req.text();
    const body = JSON.parse(rawBody);
    const { username, password } = body;


    if (!username || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const findUser = await User.findOne({ username }).select("-codemodel");

    if (!findUser) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    const checkPassword = await bcrypt.compare(password, findUser.password);

    if (!checkPassword) {
      return NextResponse.json({ message: "Wrong password" }, { status: 400 });
    }

    const token = Jwt.sign(
      {
        username: findUser.username,
        id: findUser._id,
      },
      process.env.JWT_SECRET || "your-secret-key"
    );

    let response = NextResponse.json(
      {
        message: "success",
        user: findUser,
      },
      { status: 200 }
    );
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    });
    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error", error: error },
      { status: 500 }
    );
  }
}
