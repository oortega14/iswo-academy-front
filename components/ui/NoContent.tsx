import Image from 'next/image'
import React from 'react'

const NoContent = () => {
  return (
    <>
      <div className='flex h-full w-full flex-col items-center justify-center'>
        <Image
          src={'/images/no_content.webp'}
          width={500}
          height={500}
          alt='NoContentImage'
        />
        <h2 className='text-2xl font-bold'>Aún no tienes registros disponibles</h2>
      </div>
    </>
  )
}

export default NoContent
