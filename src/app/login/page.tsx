'use client';
import { useAppContext } from '@/Context/context';
import { useTheme } from '@/Context/themecontext';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const LoginSignup = () => {
    const { userData, setuserData } = useAppContext();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [wrong, setWrong] = useState<boolean>(false);
    const [response, setResponse] = useState<any>(null);
const router =useRouter();
    const [status, setStatus] = useState<number | null>(null);
const {theme}=useTheme();
    useEffect(() => {
        setResponse(null);
        setUsername('');
        setPassword('');
        setError(false);
        setWrong(false);
        setStatus(null);
    }, []);

    const Login = async () => {
        // Reset error state
        setError(false);

        if (!username || !password) {
            setError(true);
            alert('All fields are required');
            console.log('All fields are required');
            return;
        }

        try {
            const response = await axios.post('api/auth/login', {
                username,
                password,
            }, { withCredentials: true });
            setStatus(response.status);
            setResponse(response.data);
            console.log(response.data,'from login');
            
            alert('login success');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setStatus(error.response.status);
            }
            console.error('Login failed:', error);
            alert(error);
            setError(true);
        }
    };

    useEffect(() => {
        if (status === 400) {
            setPassword('');
            setUsername('');
            setWrong(true);
            setTimeout(() => {
                setWrong(false);
            }, 3000);
        } else if (status === 200) {
            console.log(response,'from login');
            
            setPassword('');
            setuserData({ id: response.user._id, name: response?.user?.username, recentfiles: response?.user?.codemodel })
            router.push('/');
            setUsername('');
            
        }
    }, [status]);

    return (
        <div className={`h-full flex-1 w-screen flex flex-col justify-center items-center  ${theme == 'vs-dark' ? `bg-neutral-900 text-neutral-600` : `bg-zinc-100 text-neutral-900`} `}>
            <div className='w-11/12 m-4 md:w-[400px] transition-all relative bg-zinc-200 h-[300px] flex flex-col gap-2 rounded-md justify-center items-center'>
                <span className='text-3xl font-bold antialiased text-zinc-800'>Account</span>
                <input
                    type="text"
                    placeholder='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`w-11/12 md:w-9/12 focus:outline-none h-9 rounded-xl border-2 ${error || wrong ? 'border-red-400 hover:border-red-700' : 'border-teal-300'} caret-teal-800 pl-4 text-wrap`}
                />
                <input
                    type="password"
                    placeholder='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-11/12 md:w-9/12 focus:outline-none h-9 rounded-xl border-2 ${error || wrong ? 'border-red-400 hover:border-red-700' : 'border-teal-300'} caret-teal-800 pl-4 text-wrap`}
                />
                <button
                    type='button'
                    className='py-1 rounded-lg bg-red-500 hover:bg-red-600 transition-all px-5'
                    onClick={Login}
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
            </div>
        </div>
    );
};

export default LoginSignup;
