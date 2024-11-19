import React from 'react'

function loading() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <h1 className='text-3xl font-bold text-neutral-800'>Loading <span className='animate-bounce'>.</span><span className='animate-bounce delay-75'>.</span><span className='animate-bounce delay-150'>.</span>
      </h1>
    </div>
  )
}

export default loading
