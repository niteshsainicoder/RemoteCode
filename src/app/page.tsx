import Image from "next/image";
import CodeEditor from "./Component/codeEditor";
export default function Home() {
  return (
    <main className="flex relative bg-cyan-100 min-h-screen flex-col items-center justify-between pt-3 px-2">
  
      <CodeEditor />
     
    </main>
  );
}
