import { useAppContext } from '@/Context/context'
import axios from 'axios'
import React from 'react'

type Props = {
    title: string,
    key: number,
    language: string,
    id: string

}
const RecentfileItem = ({ title, key, language, id }: Props) => {
const {userData}=useAppContext();

const delteCode= async()=>{
try {
    const response=await axios.post('http://localhost:3000/api/code/delete',{userId:userData.id,codeId:id})
    if (response.status === 200) {
        console.log(response.data)
    }
} catch (error) {
    console.log(error)
}
}

    return (


        <div key={id} onClick={() => console.log(title)} className='w-full max-w-full min-w-fit hover:bg-neutral-800 min-h-9 max-h-9 hover:border-zinc-700 border-zinc-900 border
        transition-all rounded bg-zinc-900  text-left flex justify-around items-center  text-white '>
            <div className='flex px-4 justify-between   w-9/12   '>
                <p className='   overflow-hidden' > {title}</p>
                <p> {language === 'javascript' ? '.js' : '.py'}</p>
            </div>
            <div className='w-3/12  min-w-8 '>
                <button type='button' onClick={()=>{delteCode()}} className='ml-4 on text-md hover:text-red-600'>X</button>
            </div>
        </div>)

}

export default RecentfileItem
