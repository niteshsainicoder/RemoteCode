import React from 'react';
interface FileData {
  fileName: string;
  lastOpened: string;
  language: string;
  fileSize: string;
  filePath: string;
}

interface RecentFilesProps {
  title: string;
  data: FileData[];
  isOpen: boolean;
  onToggle: () => void; // Callback to toggle the state
  classname: string;
}

const RecentFiles: React.FC<RecentFilesProps> = ({ title, data, isOpen, onToggle, classname }) => {
  return (
    <div className={`w-full min-w-fit max-w-full bg-zinc-900 ${isOpen ? classname : ''} max-h-[460px]  sticky top-0 z-10 bottom-0  `}>

      <p
        onClick={onToggle}
        className='w-full h-10  cursor-pointer font-bold antialiased text-center pt-2 bg-zinc-700 flex text-neutral-400 justify-between px-9 items-center'
      >
        {title}
        <span
          className={`inline-block ml-2 text-xl transform transition  ${isOpen ? 'rotate-180  pt-3' : 'rotate-0 pt-1'}`}
        >
          &#94;
        </span>
      </p>

      <div
        className={`transition-max-height scroll-smooth duration-300 ease-in-out px-1 flex flex-col gap-[1px]  overflow-auto ${isOpen ? 'max-h-[450px] pb-12  pt-8' : '  max-h-0 p-0'}`}
      >
        {data.map((value: any,index:number) => (<p key={value.fileName} onClick={() => console.log(value.fileName)} className='w-full hover:bg-neutral-800 hover:border-zinc-700 border-zinc-900 border
       transition-all rounded bg-zinc-900 pl-4 text-left flex items-center p-2 text-white '>{index+1} {value.fileName}</p>))}
        {data.map((value: any,index:number) => (<p key={value.fileName} onClick={() => console.log(value.fileName)} className='w-full hover:bg-neutral-800 hover:border-zinc-700 border-zinc-900 border
       transition-all rounded bg-zinc-900 pl-4 text-left flex items-center p-2 text-white '>{index+1} {value.fileName}</p>))}
        {data.map((value: any,index:number) => (<p key={value.fileName} onClick={() => console.log(value.fileName)} className='w-full hover:bg-neutral-800 hover:border-zinc-700 border-zinc-900 border
       transition-all rounded bg-zinc-900 pl-4 text-left flex items-center p-2 text-white '>{index+1} {value.fileName}</p>))}
      </div>
    </div>
  );
};

export default RecentFiles;
