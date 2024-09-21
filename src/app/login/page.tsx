'use client';
import { useAppContext } from '@/Context/context';
import { useTheme } from '@/Context/themecontext';
import axios from 'axios';
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
    const { theme } = useTheme();
    useEffect(() => {
        setResponse(null);
        setWrong(false);
        setStatus(null);
    }, []);

    const Login = async (data: any) => {
        try {
            const response = await axios.post('api/auth/login', {
                ...data
            }, { withCredentials: true });
            setStatus(response.status);
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
            setTimeout(() => {
                setWrong(false);
            }, 3000);
        } else if (status === 200) {
            setuserData({ id: response.user._id, name: response?.user?.username, recentfiles: response?.user?.codemodel, currentfile: null });
            router.push('/');

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    return (
        <div className={`h-full flex-1 w-screen  flex flex-col justify-center items-center  ${theme == 'vs-dark' ? `bg-neutral-900 text-neutral-600` : `bg-zinc-100 text-neutral-900`} `}>

            <form onSubmit={handleSubmit(Login)} className={`w-11/12 m-4  max-w-[400px] md:w-[400px] transition-all relative ${theme == 'vs-dark' ? `bg-zinc-600 text-neutral-800` : `bg-zinc-200 text-neutral-900`} h-[300px] flex flex-col rounded-md justify-center items-center`}>
                <span className='text-3xl font-bold antialiased text-zinc-800'>Account</span>

                {errors.username && <span
                    className='left-0 w-11/12 text-xs text-red-500 antialiased '>This field is required</span>}
                <input {...register('username', { required: true })} placeholder="username" className={` relative w-11/12 md:w-9/12 focus:outline-none mt-4 ${errors.username&&'mt-0'} h-9 rounded-xl border-2 ${errors || wrong ? 'border-red-400 hover:border-red-700' : 'border-teal-300'} caret-teal-800 pl-4 text-wrap`}
                />


                {errors.password && <span
                    className='left-0 w-11/12 text-xs text-red-500 antialiased p-0 '>This field is required</span>}
                <input {...register('password', { required: true })} type="password" placeholder="Password" className={`w-11/12 md:w-9/12 focus:outline-none h-9 mt-4 ${errors.username&&'mt-0'} mb-2 rounded-xl border-2 ${errors || wrong ? 'border-red-400 hover:border-red-700' : 'border-teal-300'} caret-teal-800 pl-4 text-wrap`}
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
                    className={` ${status === 200 && 'scale-105 transition-all duration-300 text-zinc-800 animate-bounce  '} font-semibold antialiased left-2 top-2 md:top-4 absolute link`}
                    href="/"
                >
                    {'<-'} back to home
                </Link>
            </form>


        </div >
    );
};



export default LoginSignup;
