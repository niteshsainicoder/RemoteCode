import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, res: NextResponse) {
  const url = process.env.SERVER_URL!;

    try {
      const response = await axios.get(url,{timeout: 90000});
      
      if (response.status === 200) {
                
        return NextResponse.json(
          {
            message: true,
          },
          { status: 200 }
        );
      }
    } catch (error) {
      console.error("Error pinging server:", error);
      // Optionally log the error message if needed
    }
  

  // If we reach here, all attempts have failed
  return NextResponse.json(
    {
      message: false,
    },
    { status: 500 }
  );

}