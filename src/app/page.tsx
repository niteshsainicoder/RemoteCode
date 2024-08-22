'use client'
import CodeEditor from "./Component/codeEditor";
import RecentFiles from "./Component/RecentFiles";
import { useState } from "react";
export default function Home() {
  const [output, setoutput] = useState<string | null>('by the way default output good not need');
  const [error, seterror] = useState<string | null>('');
  const onCodeExecute = (output: string, error: string) => {
    setoutput(output)
    seterror(error);
    console.log(output, error);

  }

  return (
    <main className=" flex flex-col gap-2 md:flex-row relative  max-h-full min-h-[500px] h-full bg-neutral-900  items-start justify-evenly p-4 ">
      <div className=" hidden lg:block   w-1/6 bg-black h-screen max-h-[500px] text-white "> <RecentFiles /> </div>
      <div className="w-full max-w-full rounded-lg overflow-hidden border-2 border-zinc-700 h-full max-h-[500px] min-h-[fit] bg-green-300 md:w-4/6 flex justify-center items-center">
        <CodeEditor onCodeExecute={onCodeExecute} />
      </div>
      <div className="hidden md:block md:w-2/6 lg:w-1/6 bg-zinc-900 max-h-[500px] border-2 rounded-lg border-zinc-700 min-h-[500px] h-full text-white p-4">
        <div className="bg-gray-800 rounded-lg p-4 mb-3  overflow-y-auto h-full">
          <pre className="whitespace-pre-wrap cursor-pointer break-words">output </pre>
        </div>
        <div className="w-full h-full min-h-full min-w-full border-black border">
          <pre className="whitespace-pre-wrap w-full h-full min-h-full cursor-pointer break-words" >by the way default output good not need</pre>
        </div>
      </div>
    </main >
  );
}
