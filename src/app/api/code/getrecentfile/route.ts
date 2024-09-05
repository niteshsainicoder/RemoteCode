import { User } from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId } = body;

  try {
    const findcode = await User.findById(userId).populate("codemodel");
    if (!findcode) {
      return NextResponse.json(
        { message: "user or code not found" },
        { status: 404 }
      );
    }
console.log(findcode)
return NextResponse.json({
  message: "success",findcode},{status:200})

  } catch (error) {
    return NextResponse.json(
      { message: "server error" },
      { status: 500 }
    );
  }
}
