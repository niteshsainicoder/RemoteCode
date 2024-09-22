import { useTheme } from '@/Context/themecontext';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { boolean } from 'zod';

interface TerminalProps {
    title: string;
    data: string;
    error: string;
    isOpen: boolean;
    onToggle: () => void; // Callback to toggle the state
    classname: string;
}

const Terminal: React.FC<TerminalProps> = ({ title, data, isOpen, error, onToggle, classname }) => {
    const { theme } = useTheme();
    const [serVerRunning, setServerRunning] = useState<boolean>(false)
    const servercheck = async () => {
        try {
            const response = await axios.get('/api/servercheck')
            if (response.status === 200) {
                return true
            } else {
                return false
            }
        }
        catch (error) {
            console.log(error)
            return false
        }
    }
    useEffect(() => {
        servercheck().then((data) => {
            setServerRunning(data)
            console.log(data)
        })
    }, [isOpen])
    useEffect(() => {
        onToggle();

    }, [data])
    return (
        <div className={`w-full min-w-fit relative flex border flex-col max-w-full ${classname} max-h-[460px]  sticky top-0 z-10 bottom-0  `}>

            <p
                onClick={onToggle}
                className='w-full h-10  cursor-pointer font-bold antialiased text-center pt-2   flex  justify-between px-9 items-center'
            >
                {title} <sup className={`w-2 absolute left-28  top-3 rounded-full h-2 ${serVerRunning ? 'bg-green-500' : 'bg-red-500'}`}></sup>
                <span
                    className={`inline-block ml-2 text-xl transform transition  ${isOpen ? 'rotate-180  pt-3' : 'rotate-0 pt-1'}`}
                >
                    &#94;
                </span>
            </p>

            <div
                className={`transition-max-height duration-300 ease-in-out px-3 ${theme == 'vs-dark' ? `bg-neutral-800 text-neutral-200` : `bg-zinc-200 text-neutral-900`} remove-scrollbar font-mono border-none overflow-y-scroll ${isOpen ? 'max-h-[450px] min-h-[250px] pb-12 pt-8' : 'max-h-0 p-0'
                    }`}
            >
                <pre className={`w-full h-fit whitespace-pre-wrap break-words ${error ? 'text-red-500' : ' text-green-500'} `}>
                    {data
                        ? `${data}`
                        : `${error
                            ? error
                            : `${` $ node script.js 1 2 3 4 5
                                 Hello, JavaScript!
                                 Calculating sum of numbers from 1 to 5...
                                 The sum is: 15
                                 Execution time: 2ms`}`} `}
                    <span className="blinking-cursor"></span>
                </pre>
            </div>



        </div>
    );
};

export default Terminal;
