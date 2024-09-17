import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs"; // Use promise-based fs methods
import { exec } from "child_process";
import { promisify } from "util";
import axios from "axios";

const execPromise = promisify(exec);

export async function POST(req: NextRequest) {
  console.time("time");
  const body = await req.json();
  const { codeContent, language } = body;
  
  if (!codeContent) {
    return NextResponse.json(
      { message: "Please provide code", error: true },
      { status: 400 }
    );
  }


  try {
    let extension;
    let dockerCommand;

    switch (language) {
      case "python":
        extension = "py";
        dockerCommand = `python3 /usr/src/app/scripts/script.py`;
        break;

      case "javascript":
        extension = "js";
        dockerCommand = `node /usr/src/app/scripts/script.js`;
        break;

      default:
        return NextResponse.json(
          { message: "Unsupported language", error: true },
          { status: 400 }
        );
    }

    const scriptPath = path.join(
      process.cwd(),
      "src",
      "executors",
      language,
      "scripts",
      `script.${extension}`
    );
    const scriptDir = path.dirname(scriptPath);

    await fs.mkdir(scriptDir, { recursive: true });

    await fs.writeFile(scriptPath, codeContent);
    const command = `docker run --rm -v ${scriptDir}:/usr/src/app/scripts --memory="500m" --memory-swap="1g" --cpus="2.0" ${language}-executor ${dockerCommand}`;
    const { stdout, stderr } = await execPromise(command,{ timeout: 5000 });

    await fs.unlink(scriptPath);
    console.timeEnd("time");
    return NextResponse.json(
      {
        message: "Code executed successfully",
        output: stdout,
        error: stderr,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal server error", error: error, output: false },
      { status: 500 }
    );
  }
}
