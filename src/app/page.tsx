'use client'
import CodeEditor from "./Component/codeEditor";
import RecentFiles from "./Component/Recentfiles";
import { useEffect, useState } from "react";
import Terminal from "./Component/Terminal";
import { useAppContext } from "@/Context/context";
import axios from "axios";
import { useTheme } from "@/Context/themecontext";
export default function Home() {
  const { theme } = useTheme();
  const { userData, setuserData } = useAppContext()
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

  const autologin = async () => {
    try {
      let response = await axios.get('api/auth/autoLogin', { withCredentials: true });
      console.log(response);
      if (response.status === 200) {
        setuserData({ id: response.data.data.id, name: response.data.data.username, recentfiles: [], currentfile: null })
      }

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    try {
      autologin()
    } catch (error) {
      console.log(error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (userData.id !== '') {
      setOpenFileIndex(0);
    }
  }, [userData])

  return (
    <main className={` flex flex-col-reverse gap-2 md:flex-row relative flex-1   max-h-fit min-h-full h-full border-2 border-zinc-700 ${theme == 'vs-dark' ? `bg-neutral-900 text-neutral-200` : `bg-zinc-100 text-neutral-900`}  items-start justify-evenly px-4 py-4`} >
      <div className={`relative w-full rounded-lg border-2 overflow-hidden border-zinc-700 h-full max-h-[500px] md:min-h-[504px] md:w-2/6 flex flex-col`}>
        <div className="flex flex-col gap-[1px] min-h-[500px]">
          <RecentFiles
            title="Recent Files"
            isOpen={openFileIndex === 0}
            onToggle={() => handleToggle(0)}
            classname={`${theme == 'vs-dark' ? `bg-neutral-900 text-neutral-200 ` : `bg-neutral-50 text-neutral-900`}`}
          />
          <Terminal
            title="Terminal "
            data={output!}
            error={error!}
            isOpen={openFileIndex === 1}
            onToggle={() => handleToggle(1)}
            classname={`${theme == 'vs-dark' ? `bg-neutral-900   text-neutral-200 ` : `bg-neutral-50 text-neutral-900`}`} />
        </div>
      </div>
      <div className="w-full max-w-full rounded-lg overflow-hidden border-2 border-zinc-700 h-fit max-h-[full] min-h-[fit] md:w-4/6 flex justify-center items-center">
        <CodeEditor onCodeExecute={onCodeExecute} />
      </div>
    </main >
  );
}
