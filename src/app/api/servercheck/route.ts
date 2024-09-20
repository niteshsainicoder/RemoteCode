import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { NextResponse } from "next/server";

const MAX_RETRIES = 3;

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const url = process.env.SERVER_URL!;
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    attempt++;
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        return NextResponse.json({
          message: `Server is running after ${attempt} attempts` ,},{status:200});
      }
    } catch (error) {
      console.error("Error pinging server:", error);
      // Optionally log the error message if needed
    }
  }

  // If we reach here, all attempts have failed
  return NextResponse.json({
    message: "Server is not able to run",},{status:500})
}
