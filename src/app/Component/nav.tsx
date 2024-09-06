'use client';
import { useAppContext } from '@/Context/context'
import Link from 'next/link'
import React from 'react'

const Nav = () => {
  const { userData } = useAppContext();
  return (
    <div className="w-full bg-zinc-800  h-16 flex justify-evenly items-center " >
      <div className="w-6/12 h-fit text-center  ">
        <p className="font-extrabold antialiased text-xl text-zinc-200 shadow-slate-500 ">
          <span className="text-3xl font-extrabold">
            &#8475;
          </span>
          emote
          <span className="text-2xl font-extrabold">
            &#264;
          </span>
          ode
        </p>
      </div>
      <div className="w-6/12 h-fit  text-right text-zinc-200 flex justify-evenly gap-7 ">
        {userData.name==='' ? `${ userData?.name }` : <Link className={`link text-zinc-200`} href="/login">
          login
        </Link>}
      </div>
    </div>
  )
}

export default Nav
