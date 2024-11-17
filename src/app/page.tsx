'use client'
import CodeEditor from "./Component/codeEditor";
import { Recentfiles } from "./Component/recentfile"
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
  const [time, settime] = useState<number | null>();
  const [loading, setloading] = useState<boolean>(false);
  const [openFileIndex, setOpenFileIndex] = useState<number | null>(null); // Track the open file index
const [serverRunning,setServerRunning] = useState(false);
  const handleToggle = (index: number) => {
    setOpenFileIndex(openFileIndex === index ? null : index); // Toggle the open state
  };
  const onCodeExecute = (output: string, time: number, error: string, loading: boolean) => {
    setoutput(output)
    settime(time)
    setloading(loading)
    seterror(error);
    serverRunning 
  }

  const autologin = async () => {
    try {
      let response = await axios.get('api/auth/autoLogin', { withCredentials: true });
      if (response.status === 200) {
        if (userData?.recentfiles?.length > 0) {
          setuserData({ id: response.data.data.id, name: response.data.data.username, recentfiles: userData.recentfiles, currentfile: null })
        }
        else{     setuserData({ id: response.data.data.id, name: response.data.data.username, recentfiles: [], currentfile: null })
      }
      }

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    try {
      axios.get('/api/servercheck')
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
    <main className={` flex  flex-col-reverse gap-2 md:flex-row flex-1  max-h-full min-h-full h-full border-2 border-zinc-700 ${theme == 'vs-dark' ? `bg-neutral-900 text-neutral-200` : `bg-light text-neutral-900`}  items-start justify-evenly px-4 py-4`} >
      <div className={`relative w-full rounded-lg border-2 overflow-hidden border-zinc-700 h-full max-h-[500px] md:min-h-[504px] md:w-2/6 flex flex-col`}>
        <div className="flex flex-col gap-[1px] min-h-[500px]">
          <Recentfiles
            title="Recent Files"
            isOpen={openFileIndex === 0}
            onToggle={() => handleToggle(0)}
            classname={`${theme == 'vs-dark' ? `bg-neutral-900 text-neutral-200 ` : `bg-light text-neutral-900`}`}
          />
          <Terminal
            title="Terminal "
            data={output || ''}
            time={time!}
            loading={loading}
            serverRunning = {serverRunning}
            setServerRunning={setServerRunning}
            error={error!}
            isOpen={openFileIndex === 1}
            onToggle={() => handleToggle(1)}
            classname={`${theme == 'vs-dark' ? `bg-neutral-900   text-neutral-200 ` : `bg-light text-neutral-900`}`} />
        </div>
      </div>
      <div className="w-full max-w-full rounded-lg overflow-hidden border-2 border-zinc-700 h-fit max-h-[full] min-h-[fit] md:w-4/6 flex justify-center items-center">
        <CodeEditor serverRunning={serverRunning} onCodeExecute={onCodeExecute} />
      </div>
    </main >
  );
}
