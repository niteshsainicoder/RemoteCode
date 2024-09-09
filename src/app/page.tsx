'use client'
import CodeEditor from "./Component/codeEditor";
import RecentFiles from "./Component/Recentfiles";
import { useEffect, useState } from "react";
import Terminal from "./Component/Terminal";
import { useAppContext } from "@/Context/context";
export default function Home() {
  const { userData } = useAppContext()
  const [output, setoutput] = useState<string | null>('by the way default output good not need');
  const [error, seterror] = useState<string | null>('');
  const [openFileIndex, setOpenFileIndex] = useState<number | null>(null); // Track the open file index

  const handleToggle = (index: number) => {
    setOpenFileIndex(openFileIndex === index ? null : index); // Toggle the open state
  };
  const onCodeExecute = (output: string, error: string) => {
    setoutput(output)
    seterror(error);
  }


  useEffect(() => {
    if (userData.id !== '') {
      setOpenFileIndex(0);

    }
  }, [userData])

  return (
    <main className=" flex flex-col-reverse gap-2 md:flex-row relative  max-h-full min-h-[screen] h-full border-2 rounded-lg border-zinc-700 bg-neutral-900  items-start justify-evenly px-4 py-4 ">
      <div className="relative w-full rounded-lg border-2 overflow-hidden border-zinc-700 h-full max-h-[500px] md:min-h-[500px] bg-zinc-800 md:w-2/6 flex flex-col">
        <div className="flex flex-col gap-[1px] min-h-[500px]">
          <RecentFiles
            title="Recent Files"
            isOpen={openFileIndex === 0}
            onToggle={() => handleToggle(0)}
            classname=""
          />
          <Terminal
            title="Terminal "
            data={output!}
            error={error!}
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
