'use client';

import { useAppContext } from '@/Context/context'
import { useTheme } from '@/Context/themecontext';
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { Tooltip } from '@nextui-org/tooltip';

const Nav = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { userData,setuserData } = useAppContext();
  const [datatoshow, setdatatoshow] = useState<string>('login')

  const logout = async () => {
    if (userData.name !== '' && userData.id !== '') {
      try {
        const response = await axios.get('/api/auth/logout');
        if (response.status === 200) {
          setuserData({ id: '', name: '', recentfiles: [], currentfile: null });
          router.push('/'); // Navigate programmatically
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    if (userData.name !== '') {
      setdatatoshow(`@${userData.name}`);
    }

  }, [userData])
  return (
    <div className={`w-full ${theme == 'vs-dark' ? `bg-neutral-900 border-t border-b border-grey-400 text-neutral-200 ` : `bg-light border-t  border-black text-neutral-900`}  h-16 flex justify-evenly items-center `} >
      <div className="w-6/12 h-fit text-center  ">
        <Link href={'/'} className="font-extrabold antialiased text-xl  shadow-slate-500 ">
          
          <span className="text-2xl font-extrabold">
            &#264;
          </span>
          ode
          <span className="text-3xl font-extrabold">
            &#8475;
          </span>
         un
        </Link>
      </div>
      <div className="w-4/12 h-fit  text-right flex justify-evenly gap-7  ">
        <Link className='cursor-pointer px-2 rounded-lg ' onClick={logout}  href={`${!userData.name &&`/login`}`}>
        <Tooltip
         className='rounded-lg'
         showArrow
         placement="bottom"
         content={userData.name ? ' Click for Logout' : ' click for Login'}
         classNames={{
             base: [
                 // arrow color
                 "before:bg-stone-400 "  ,
             ],
             content: [
                 "py-[6px] px-4 shadow-xl  rounded-md ",
                 "text-gray-800 bg-neutral-400",
             ],
         }}
     >
         {datatoshow}
         </Tooltip>
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
