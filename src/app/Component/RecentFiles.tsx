import React, { useEffect, useState } from 'react';
import RecentfileItem from './recentfileitem';
import axios from 'axios';
import { useAppContext } from '@/Context/context';

interface FileData {
  codeContent: string,
  language: string,
  title: string,
  _id: string
}

interface RecentFilesProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void; // Callback to toggle the state
  classname: string;
}

const RecentFiles: React.FC<RecentFilesProps> = ({ title, isOpen, onToggle, classname }) => {
  const { userData, setuserData } = useAppContext();
  const [Data, setData] = useState<FileData[]>(userData.recentfiles || []);

  const getrecentfile = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/code/getrecentfile", { userId: userData.id }, { withCredentials: true });
      if (response.status === 200) {
        console.log(response.data.findcode.codemodel);

        const fetchedFiles = response.data.findcode.codemodel;
        setuserData({ ...userData, recentfiles: fetchedFiles });
        setData(fetchedFiles);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userData.id !== '') {
      getrecentfile();
    }

  }, [userData.id]);

  useEffect(() => {
    setData(userData.recentfiles)
  }, [userData.recentfiles])
 

  return (
    <div className={`w-full min-w-fit max-w-full bg-zinc-900 ${isOpen ? classname : ''} max-h-[460px] sticky top-0 z-10 bottom-0`}>
      <p onClick={onToggle} className="w-full h-10 cursor-pointer font-bold antialiased text-center pt-2 bg-zinc-700 flex text-neutral-400 justify-between px-9 items-center">
        {title}
        <span className={`inline-block ml-2 text-xl transform transition ${isOpen ? 'rotate-180  pt-3' : 'rotate-0 pt-1'}`}>
          &#94;
        </span>
      </p>
      <div className={`transition-max-height remove-scrollbar scroll-smooth duration-300 ease-in-out px-1 flex flex-col gap-[1px] overflow-auto ${isOpen ? 'max-h-[450px] pb-12 pt-8' : ' max-h-0 p-0'}`}>
        {Data?.map((value, index) => (
          <RecentfileItem key={index} codeContent={value.codeContent} title={value.title} language={value.language} id={value._id} />
        ))}
      </div>
    </div>
  );
};

export default RecentFiles;
