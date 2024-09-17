'use client'
import { useTheme } from '@/Context/themecontext'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const LoginSignup = () => {
    const [name, setName] = useState<string | null>('')
    const [gmail, setGmail] = useState<string | null>('')
    const [password, setPassword] = useState<string | null>('')
    const [error, setError] = useState<boolean>(false)
    const [created, setCreated] = useState<boolean>(false)
    const [response, setResponse] = useState<any>(null)

    useEffect(() => {
        // Reset the state when the component mounts
        setCreated(false);
        setResponse(null);
        setGmail('');
        setName('');
        setPassword('');
        setError(false);
    }, []); // Empty dependency array ensures this runs only on mount

    const Signup = async () => {
        // Reset error state
        setError(false);

        if (!gmail || !password || !name) {
            setError(true);
            console.log('All fields are required');
            return null;
        }

        try {
            const response = await axios.post('api/auth/signup', {
                username: name,
                email: gmail,
                password: password,
            }, { withCredentials: true });

            if (response.status === 201) {
                setResponse(response.data)
                console.log(response.data);

                setCreated(true); // Show the "Account created" badge
                setTimeout(() => {
                    setCreated(false);
                }, 30000);
            }
        } catch (error) {
            console.error('Signup failed:', error);
            setError(true);
        }
    }

    return (
        <div className={`h-full flex-1 w-screen flex flex-col justify-center items-center ${useTheme().theme == 'vs-dark' ? `bg-neutral-900 text-neutral-200` : `bg-zinc-100 text-neutral-900`} `}>
            <div className='w-11/12 max-w-[400px] md:w-[400px] transition-all relative bg-zinc-200 h-[300px] flex flex-col gap-2 rounded-md justify-center items-center'>
                {!created ? (
                    <>
                        <span className=' text-3xl cursor-context-menu font-bold antialiased mb-2 text-zinc-800 '>Account</span>
                        <input type="text" placeholder='user name' onChange={(e) => {
                            setName(e.target.value);
                        }} className={`w-11/12 md:w-9/12 focus:outline-none h-9 rounded-xl border ${error ? 'border-red-400 hover:border-red-500' : '   border-teal-300'} caret-teal-800 pl-4 text-wrap`} />
                        <input type="text" placeholder='email address' onChange={(e) => {
                            setGmail(e.target.value);
                        }} className={`w-11/12 md:w-9/12 h-9 focus:outline-none rounded-xl border ${error ? 'border-red-400 hover:border-red-500' : ' border-teal-300'} caret-teal-800 pl-4 text-wrap`} />
                        <input type="password" placeholder='password' onChange={(e) => {
                            setPassword(e.target.value);
                        }} className={`w-11/12 md:w-9/12 h-9 focus:outline-none rounded-xl border ${error ? 'border-red-400 hover:border-red-500' : ' border-teal-300'} caret-teal-800 pl-4 text-wrap`} />
                        <button type='submit' className={`active:border-transparent active:cursor-wait py-1 rounded-lg font-semibold antialiased bg-red-400 px-5`} onClick={Signup}>signup</button>
                    </>
                ) : (<>
                    <span className='text-3xl font-bold antialiased text-zinc-800 '>Account created</span>
                    <h1>Move to < Link className={`font-semibold antialiased  text-zinc-900  link`} href="/" > homepage</Link></h1>
                </>
                )}
                <Link className={` ${created && 'scale-105 transition-all duration-300 text-zinc-800 animate-bounce  '} font-semibold antialiased left-2 top-2 md:top-4 absolute link`} href={`${created ? '/' : '/login'}`}>
                    {`<-`}back to {`${created ? 'homepage' : 'login '}`}
                </Link>
            </div>
        </div>
    )
}

export default LoginSignup;
