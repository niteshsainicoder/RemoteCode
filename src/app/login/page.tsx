'use client';
import { useAppContext } from '@/Context/context';
import { useTheme } from '@/Context/themecontext';
import axios from 'axios';
import { error } from 'console';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const LoginSignup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { setuserData } = useAppContext();
    const [wrong, setWrong] = useState<boolean>(false);
    const [response, setResponse] = useState<any>(null);
    const router = useRouter();
    const [status, setStatus] = useState<number | null>(null);
    const [cause, setCause] = useState<boolean>(false);
    const { theme } = useTheme();
    useEffect(() => {
        setResponse(null);
        setWrong(false);
        setStatus(null);
        console.log(errors, wrong, 'nice to meet you');

    }, []);

    const Login = async (data: any) => {
        try {
            const response = await axios.post('api/auth/login', {
                ...data
            }, { withCredentials: true });
            setStatus(response.status);
            console.log(response);

            setResponse(response.data);
        } catch (error) {

            if (axios.isAxiosError(error) && error.response) {
                setStatus(error.response.status);
            }
        }
    };

    useEffect(() => {
        if (status === 400) {
            setWrong(true);
            setCause(response?.message ? true : false);

            setTimeout(() => {
                setWrong(false);
            }, 7000);
        } else if (status === 200) {
            setuserData({ id: response.user._id, name: response?.user?.username, recentfiles: response?.user?.codemodel, currentfile: null });
            setCause(true);
            setTimeout(() => {
                
                router.push('/');
            },2000)

        }
        setCause(response?.message ? true : false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);


    useEffect(() => {
        if (cause) {

            const timer = setTimeout(() => {
                setCause(false);

            }, 3000);
            return () => clearTimeout(timer);
        }

    }, [cause])
    return (
        <div className={`h-full flex-1 w-screen   flex flex-col justify-center items-center  ${theme == 'vs-dark' ? `bg-neutral-900 text-neutral-600` : `bg-zinc-100 text-neutral-900`} `}>

            <form onSubmit={handleSubmit(Login)} className={`w-11/12 m-4  max-w-[400px] md:w-[400px] transition-all relative ${theme == 'vs-dark' ? `bg-zinc-600 text-neutral-800 ring-neutral-400` : `bg-zinc-200 text-neutral-900 ring-zinc-400`} h-[300px] flex flex-col rounded-md justify-center items-center  ring $`}>
                <div
                    className={`absolute left-1/2 -translate-x-1/2 p-1 transition-all duration-1000 ease-in-out  ${cause
                        ? 'top-[10%] opacity-100 z-20 '
                            : '-top-[50%] opacity-0 -z-20 '
                        } w-1/2 max-w-11/12line-clamp-1 ring text-center ${theme == 'vs-dark' ? `bg-zinc-400 text-neutral-700 ring-neutral-400` : `bg-zinc-200 text-neutral-900 ring-slate-600`} rounded-md`}
                >
                    <h1 className='text-nowrap line-clamp-1 truncate  max-w-full'>{response?.message}</h1>
                </div>


                <span className='text-3xl font-bold antialiased text-zinc-800'>Account</span>


                <input {...register('username', { required: true })} placeholder="username" className={`
              w-11/12 md:w-9/12 h-9 mt-4 mb-2 pl-4 rounded-xl 
    caret-teal-800 text-wrap border
    ring-2
    focus:outline-none focus:ring-2
    ${errors.username ? 'mt-0' : ''} 
    ${errors.username || wrong ?
                        'ring-red-400 hover:ring-red-500 focus:ring-red-400' :
                        ' ring-teal-400 hover:ring-cyan-400 focus:ring-cyan-400'}  `}
                />



                <input {...register('password', { required: true })} type="password" placeholder="Password" className={`
  w-11/12 md:w-9/12 h-9 mt-4 mb-2 pl-4 rounded-xl 
    caret-teal-800 text-wrap 
    ring-2 
    focus:outline-none focus:ring-2 
    ${errors.password ? 'mt-0' : ''} 
    ${errors.password || wrong ?
                        'ring-red-400 hover:ring-red-500 focus:ring-red-400' :
                        ' ring-teal-400 hover:ring-cyan-400 focus:ring-cyan-400'}  
                       ${errors.password && `before:content-['please enter a valid password'] after:ml-1 after:text-red-500 `}        `}
                />

                <button
                    type='submit'
                    className='py-1 rounded-lg bg-red-500 hover:bg-red-600 transition-all px-5'

                >
                    LogIn
                </button>
                <h6>
                    don&lsquo;t have an account yet?{' '}
                    <span className='text-blue-300'>
                        <Link href="/signup">click here</Link>
                    </span>
                </h6>
                <Link
                    className={` ${status === 200 && 'scale-105 transition-all relative duration-300 text-zinc-800 animate-bounce  '} font-semibold antialiased left-2 top-2 md:top-4 absolute link`}
                    href="/"
                >
                    <span className=" before:inline-block before:content-['<-'] before:hover:-translate-x-1 before:font-extrabold before:transition-all before:duration-700 before:translate-x-0  "> back to home </span>
                </Link>
            </form>

        </div >
    );
};



export default LoginSignup;
