import { dbconnect } from "@/dbconfig/dbconnect";
import { Code } from "@/models/codemodel";
import { User } from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    dbconnect();
    const body = await req.json();
    const { userId, codeId } = body;
    console.log(body);

    if (!userId || !codeId) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, codemodel: codeId }, // Find user by userId and ensure codeId is in codemodel array
      { $pull: { codemodel: codeId } }, // Remove the codeId from the codemodel array
      { new: true } // Return the modified document
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: "User or Code not found" },
        { status: 403 }
      );
    }
const deletedCode = await Code.findByIdAndDelete(codeId);

if (!deletedCode) {
  return NextResponse.json({
    message: "Code not deleted",},{status: 404})
}
    return NextResponse.json(
      { message: "Code deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting code ok" },
      { status: 500 }
    );
  }
}
