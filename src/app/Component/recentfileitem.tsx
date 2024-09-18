import { useAppContext } from '@/Context/context'
import { useTheme } from '@/Context/themecontext'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

type Props = {
    title: string,
    key: number,
    language: string,
    id: string,
    codeContent: string

}
const RecentfileItem = ({ title, language, id, codeContent }: Props) => {
    const { theme } = useTheme();
    const { userData, setuserData } = useAppContext(); // removeit after middlware implemention

    const deleteCode = async () => {
        try {
            const response = await axios.post('api/code/delete', {
                userId: userData.id,
                codeId: id,
            });

            if (response.status === 200) {
                // Update context immediately after successful deletion
                const updatedFiles = userData.recentfiles?.filter((code) => code._id !== id);
                setuserData({ ...userData, recentfiles: updatedFiles });
            }
        } catch (error) {
            console.error('Error deleting code:', error);
        }
    };
    const openCode = async () => {
        if (codeContent !== undefined) {
            setuserData({ ...userData, currentfile: { codeContent: codeContent, language: language, title: title, _id: id } })
        }
    }
    return (


        <div key={id} className={`w-full max-w-full min-w-full
         ${theme == 'vs-dark' ?
                `bg-neutral-800  hover:bg-neutral-700 text-neutral-200`
                :
                `bg-neutral-200 hover:bg-neutral-300 text-neutral-900`}  
                min-h-9 max-h-9  transition-all text-left flex justify-around items-center    `}>
            <div onClick={openCode} className='flex px-4 justify-between   w-10/12   '>
                <p className=' overflow-x-auto remove-scrollbar pr-2f  text-nowrap' > {title}</p>
                <p> {language === 'javascript' ? '.js' : '.py'}</p>
            </div>
            <div className='w-2/12  min-w-8 '>
                <button type='button' onClick={deleteCode} className='ml-4 on text-md hover:text-red-600'>X</button>
            </div>
        </div>)

}

export default RecentfileItem
