'use client';
import { useAppContext } from '@/Context/context'
import { useTheme } from '@/Context/themecontext';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Nav = () => {
  const { theme, setTheme } = useTheme();
  const { userData } = useAppContext();
  const [datatoshow, setdatatoshow] = useState<string>('login')
  useEffect(() => {
    if (userData.name !== '') {
      setdatatoshow('@' + userData.name)
    }

  }, [userData])
  return (
    <div className={`w-full ${theme == 'vs-dark' ? `bg-neutral-900 border-t border-b border-grey-400 text-neutral-200 ` : `bg-light border-t  border-black text-neutral-900`}  h-16 flex justify-evenly items-center `} >
      <div className="w-6/12 h-fit text-center  ">
        <p className="font-extrabold antialiased text-xl  shadow-slate-500 ">
          
          <span className="text-2xl font-extrabold">
            &#264;
          </span>
          ode
          <span className="text-3xl font-extrabold">
            &#8475;
          </span>
         un
        </p>
      </div>
      <div className="w-4/12 h-fit  text-right flex justify-evenly gap-7 ">
        <Link  href={`${userData.name ? '/' : `/login`}`}>
          {datatoshow}
        </Link>
      </div>
      <div className="w-2/12 h-fit  text-right flex  justify-evenly gap-7 ">
       {theme =='vs-dark'? (<p onClick={()=> setTheme('light')} className='scale-125 cursor-pointer'>&#9728;</p>):
        (<p onClick={()=> setTheme('vs-dark')} className='scale-125 cursor-pointer rotate-45 text-  '> <span className=''>&#9789;</span></p>)}
      </div>
    </div >
  )
}

export default Nav
