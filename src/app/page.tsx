import Image from "next/image";
import CodeEditor from "./Component/codeEditor";
import RecentFiles from "./Component/RecentFiles";
export default function Home() {
  return (
    <main className="flex relative  max-h-full min-h-[500px] h-full bg-rose-200  items-start justify-evenly  ">
      <div className="w-1/6 bg-black h-screen max-h-[500px] text-white "> <RecentFiles/> </div>
      <div className="h-full max-h-full min-h-[fit] bg-green-300 w-4/6 flex justify-center items-center">
      <CodeEditor />
      </div>

      <div className="w-1/6 bg-black max-h-[500px] h-full text-white "> this is recent section</div>


    </main >
  );
}
