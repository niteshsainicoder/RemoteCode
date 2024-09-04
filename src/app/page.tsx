'use client'
import CodeEditor from "./Component/codeEditor";
import RecentFiles from "./Component/Recentfiles";
import { useState } from "react";
import Terminal from "./Component/Terminal";
export default function Home() {
  const [output, setoutput] = useState<string | null>('by the way default output good not need');
  const [error, seterror] = useState<string | null>('');
  const [openFileIndex, setOpenFileIndex] = useState<number | null>(null); // Track the open file index
  const [user, setuser] = useState<string | null>('')
  const data: {
    fileName: string;
    lastOpened: string;
    language: string;
    fileSize: string;
    filePath: string;
  }[] = [
      {
        "fileName": "app.py",
        "lastOpened": "2024-08-23T09:15:00Z",
        "language": "Python",
        "fileSize": "3.2 KB",
        "filePath": "/user/files/app.py"
      },
      {
        "fileName": "script.js",
        "lastOpened": "2024-08-22T16:45:00Z",
        "language": "JavaScript",
        "fileSize": "4.1 KB",
        "filePath": "/user/files/script.js"
      },
      {
        "fileName": "data_analysis.py",
        "lastOpened": "2024-08-21T14:32:00Z",
        "language": "Python",
        "fileSize": "2.8 KB",
        "filePath": "/user/files/data_analysis.py"
      },
      {
        "fileName": "utilities.js",
        "lastOpened": "2024-08-20T11:30:00Z",
        "language": "JavaScript",
        "fileSize": "1.9 KB",
        "filePath": "/user/files/utilities.js"
      }
    ];


  const handleToggle = (index: number) => {
    setOpenFileIndex(openFileIndex === index ? null : index); // Toggle the open state
  };
  const onCodeExecute = (output: string, error: string) => {
    setoutput(output)
    seterror(error);
    console.log(output, error);

  }


  return (
    <main className=" flex flex-col-reverse gap-2 md:flex-row relative  max-h-full min-h-[screen] h-full border-2 rounded-lg border-zinc-700 bg-neutral-900  items-start justify-evenly px-4 py-4 ">
      <div className="relative w-full rounded-lg border-2 overflow-hidden border-zinc-700 h-full max-h-[500px] md:min-h-[500px] bg-zinc-800 md:w-2/6 flex flex-col">
        <div className="flex flex-col gap-[1px] min-h-[500px]">
          <RecentFiles
            title="Recent Files"
            data={data}
            isOpen={openFileIndex === 0}
            onToggle={() => handleToggle(0)}
            classname=""
          />
          <Terminal
            title="Terminal "
            data="// Your output is here"
            isOpen={openFileIndex === 1}
            onToggle={() => handleToggle(1)}
            classname=""
          />
        </div>
      </div>
      <div className="w-full max-w-full rounded-lg overflow-hidden border-2 border-zinc-700 h-fit max-h-[full] min-h-[fit] md:w-4/6 flex justify-center items-center">
        <CodeEditor onCodeExecute={onCodeExecute} />
      </div>
    </main >
  );
}
