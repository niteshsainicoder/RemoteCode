import { Code } from "@/models/codemodel";
import { User } from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, codeId, codeContent, language } = body;
    if (!userId || !codeId || !codeContent || !language) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }
    const Finduser = await User.findById({ _id: userId });
    if (!Finduser?.codemodel.includes(codeId)) {
      return NextResponse.json({ message: "Code not found" }, { status: 404 });
    }

    const findCodeDocument = await Code.findByIdAndUpdate(
      { _id: codeId },
      { userId, codeContent, language },
      { new: true }
    );

    if (!findCodeDocument) {
        return NextResponse.json({ message: "Code not updated" }, { status: 404 });
    }

    return NextResponse.json({ message: "Code updated successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
