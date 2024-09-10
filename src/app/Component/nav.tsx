'use client';
import { useAppContext } from '@/Context/context'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Nav = () => {
  const { userData } = useAppContext();
  const [datatoshow, setdatatoshow] = useState<string>('login')
  useEffect(() => {
    if (userData.name !== '') {
      setdatatoshow('@' + userData.name)
      console.log(userData);
    }

  }, [userData])
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
        <Link className={`link text-zinc-200`} href={`${userData.name ? '/' : `/login`}`}>
          {datatoshow}
        </Link>
      </div>
    </div >
  )
}

export default Nav
