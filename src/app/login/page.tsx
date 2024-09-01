'use client'
import Link from 'next/link'
import React, { useState } from 'react'

const LoginSignup = () => {
    const [gmail, setGmail] = useState<string | null>('')
    const [password, setPassword] = useState<string | null>('')
    const Login = () => {

        if (gmail === '' && password === 'admin') {

        }

        return (

            <div className=' h-screen w-screen flex flex-col justify-center items-center'>
                <div className='w-11/12 m-4 md:w-[400px] transition-all relative bg-zinc-500 h-[300px] flex flex-col gap-3 rounded-md justify-center items-center'>
                    <span className='text-3xl font-bold antialiased text-zinc-800 '>Account</span>
                    <input type="text" placeholder='email address' onChange={(e) => {
                        setGmail(e.target.value);
                    }} className=' w-11/12 md:w-9/12 h-9 rounded-xl border-2hover:border-teal-400 pl-4 text-wrap ' />
                    <input type="password" placeholder=' password' onChange={(e) => {
                        setPassword(e.target.value);
                    }} className='w-11/12 md:w-9/12 h-9 rounded-xl border-2hover:border-teal-400 pl-4 text-wrap ' />
                    <button type='submit' className='py-1 rounded-lg  bg-red-400  px-5' >LogIn</button>
                    <h6>{`don't have account yet,`}<span className='text-blue-300' >  <Link href="/signup" >click here</Link></span></h6>

                    <Link className={` font-semibold antialiased  left-2 top-2 md:top-4 absolute link `} href="/">
                        {`<-`}back to home
                    </Link>             </div>
            </div>
        )
    }

    export default LoginSignup
