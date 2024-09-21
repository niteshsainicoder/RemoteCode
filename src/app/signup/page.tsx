'use client'
import { useTheme } from '@/Context/themecontext'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Form, useForm } from 'react-hook-form'

const LoginSignup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [created, setCreated] = useState<boolean>(false)

    // Empty dependency array ensures this runs only on mount

    const Signup = async (data: any) => {

        try {
            const response = await axios.post('api/auth/signup', {
                ...data
            }, { withCredentials: true });

            if (response.status === 201) {
                setCreated(true); // Show the "Account created" badge
                setTimeout(() => {
                    setCreated(false);
                }, 30000);
            }
        } catch (error) {
            console.error('Signup failed:', error);
        }
    }

    return (
        <div className={`h-full flex-1 w-screen flex flex-col justify-center items-center ${useTheme().theme == 'vs-dark' ? `bg-neutral-900 text-neutral-200` : `bg-zinc-100 text-neutral-900`} `}>
            <form onSubmit={handleSubmit(Signup)} className={`w-11/12 max-w-[400px] md:w-[400px] transition-all relative ${useTheme().theme == 'vs-dark' ? `bg-zinc-600 text-neutral-800` : `bg-zinc-200 text-neutral-900`} h-[300px] flex flex-col  rounded-md justify-center items-center`}>
                {!created ? (
                    <>
                        <span className=' text-3xl cursor-context-menu font-bold antialiased mb-2 text-zinc-800 '>Account</span>
                        {errors.username && <span className='left-0 w-11/12 text-xs  text-red-500 antialiased'>This field is required</span>}
                        <input {...register('username', { required: true })} placeholder="Username" className={`relative w-11/12 md:w-9/12 focus:outline-none ${errors.username ? 'mt-0' : 'mt-4'} h-9 rounded-xl border-2 ${errors ? 'border-red-400 hover:border-red-700' : 'border-teal-300'} caret-teal-800 pl-4 text-wrap`} />

                        {errors.email && <span className='left-0 w-11/12 text-xs m-0 p-0  text-red-500 antialiased'>This field is required</span>}
                        <input {...register('email', { required: true })} type="email" placeholder="Email" className={`w-11/12 md:w-9/12 focus:outline-none h-9  mt-4 ${errors.email && 'mt-0'}  rounded-xl border-2 ${errors ? 'border-red-400 hover:border-red-700' : 'border-teal-300'} caret-teal-800 pl-4 text-wrap`} />

                        {errors.password && <span className='left-0 w-11/12 text-xs text-red-500 antialiased'>This field is required</span>}
                        <input {...register('password', { required: true })} type="password" placeholder="Password" className={`w-11/12 md:w-9/12 focus:outline-none h-9 mb-2 mt-4 ${errors.password && 'mt-0'} mb-2 rounded-xl border-2 ${errors ? 'border-red-400 hover:border-red-700' : 'border-teal-300'} caret-teal-800 pl-4 text-wrap`} />

                        <button type='submit' className='py-1 rounded-lg bg-red-500 hover:bg-red-600 transition-all px-5'>Sign Up</button>

                    </>
                ) : (<>
                    <span className='text-3xl font-bold antialiased text-zinc-800 '>Account created</span>
                    <h1>Move to < Link className={`font-semibold antialiased  text-zinc-900  link`} href="/" > homepage</Link></h1>
                </>
                )}
                <Link className={` ${created && 'scale-105 transition-all duration-300 text-zinc-800 animate-bounce  '} font-semibold antialiased left-2 top-2 md:top-4 absolute link`} href={`${created ? '/' : '/login'}`}>
                    {`<-`}back to {`${created ? 'homepage' : 'login '}`}
                </Link>
            </form>
        </div>
    )
}

export default LoginSignup;
