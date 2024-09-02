import { dbconnect } from "@/dbconfig/dbconnect";
import { Code } from "@/models/codemodel";
import { User } from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
    console.log("called");
    
    await dbconnect();

    const body = await req.json();
    console.log(body);

    const { userId, codeContent, language } = body;

    const findUser = await User.findOneAndDelete({ _id: userId });

    if (!findUser) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    const newcodemodel = await Code.create({ userId, codeContent, language });
    if (!newcodemodel) {
      console.log(newcodemodel);
      return NextResponse.json(
        { message: "Error during Saving Code", error: true },
        { status: 500 }
      );
    }
  findUser.codemodel.push(newcodemodel);

  await findUser.save();

    return NextResponse.json(
      { message: "Code Saved Successfully", model :newcodemodel, error: false },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error during Saving Code", error: true },
      { status: 500 }
    );
  }
}
