import React from 'react'

function Popup() {
    return (
        <div className='absolute  flex flex-col justify-center   w-[300px] items-center  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[200px] bg-neutral-400 rounded-lg   transform-gpu p-4'>
            <label htmlFor="newname" className=' text-xl font-medium'  >
                File Name
            </label>
            <input type="text" id='newname' placeholder='Enter the file name ' className=' border-2 rounded-2xl  outline-1  mx-4 px-4 py-2  w-full   ' />

            <div className='flex justify-evenly  items-center w-full mt-5'>
                <button
                    className='bg-neutral-600 w-24  py-1 rounded-xl'>
                    Save
                </button>
                <button className='bg-neutral-600 w-24 text-center  py-1 rounded-xl'>
                    Discard
                </button>
            </div>
        </div>
    )
}

export default Popup
