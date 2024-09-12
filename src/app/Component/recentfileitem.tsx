import { useAppContext } from '@/Context/context'
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

    const { userData, setuserData } = useAppContext(); // removeit after middlware implemention

    const deleteCode = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/code/delete', {
                userId: userData.id,
                codeId: id,
            });

            if (response.status === 200) {
                // Update context immediately after successful deletion
                const updatedFiles = userData.recentfiles?.filter((code) => code._id !== id);
                setuserData({ ...userData, recentfiles: updatedFiles });
                console.log('Code deleted:', response.data);
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


        <div key={id} onClick={() => console.log(title)} className='w-full max-w-full min-w-fit hover:bg-neutral-800 min-h-9 max-h-9 hover:border-zinc-700 border-zinc-900 border
        transition-all rounded bg-zinc-900  text-left flex justify-around items-center  text-white '>
            <div onClick={openCode} className='flex px-4 justify-between   w-9/12   '>
                <p className=' overflow-x-auto remove-scrollbar pr-2f  text-nowrap' > {title}</p>
                <p> {language === 'javascript' ? '.js' : '.py'}</p>
            </div>
            <div className='w-3/12  min-w-8 '>
                <button type='button' onClick={deleteCode} className='ml-4 on text-md hover:text-red-600'>X</button>
            </div>
        </div>)

}

export default RecentfileItem
