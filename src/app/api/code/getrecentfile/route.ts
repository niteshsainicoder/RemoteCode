import { dbconnect } from "@/dbconfig/dbconnect";
import { User } from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbconnect();
  const body = await req.json();
  const { userId } = body;

  try {
    const findcode = await User.findById(userId).select("codemodel userId");

    if (!findcode) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if codemodel exists before trying to populate
    if (findcode.codemodel && findcode.codemodel.length > 0) {
      await findcode.populate({
        path: "codemodel",
        select: "title codeContent language", // Fields to return
      });
    } else {
      return NextResponse.json(
        { message: "No code files found for this user" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "success",
        findcode,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "server error", error: error },
      { status: 500 }
    );
  }
}
