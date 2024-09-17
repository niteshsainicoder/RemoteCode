import { useTheme } from '@/Context/themecontext';
import React, { useEffect } from 'react';

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
    useEffect(() => {
        ontoggle
    }, [data])
    return (
        <div className={`w-full min-w-fit flex border flex-col max-w-full ${classname} max-h-[460px]  sticky top-0 z-10 bottom-0  `}>

            <p
                onClick={onToggle}
                className='w-full h-10  cursor-pointer font-bold antialiased text-center pt-2   flex  justify-between px-9 items-center'
            >
                {title}
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
