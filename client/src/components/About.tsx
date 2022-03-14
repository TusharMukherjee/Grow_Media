import React from 'react'

const About:React.FC = () => {
  return (
    <div className='col-start-2 col-span-6 grid grid-cols-8'> 
    <div className='bg-red-400  col-start-2 col-span-6 grid gap-1 pt-5'>
        <div className='p-2'>
            <h1 className='text-2xl mb-5'>Hometown</h1>
            <span className='bg-yellow-400 rounded-md py-1 px-2 text-sm'>Meerut, UP</span>
        </div>
        <hr />
        <div className='p-2'>
            <h1 className='text-2xl mb-5'>Qualification</h1>
            <span className='bg-yellow-400 rounded-md py-1 px-2 text-sm'>Under Grad</span>
        </div>
        <hr />
        <div className='p-2'>
            <h1 className='text-2xl mb-5'>Education</h1>
            <span className='bg-yellow-400 rounded-md py-1 px-2 text-sm'>SRM Institute of Science and Technology</span>
        </div>
        <hr />
        <div className='p-2'>
           <h1 className='text-2xl mb-5'>Skills</h1>
           <span className='bg-yellow-400 rounded-md py-1 px-2 text-sm'>C++</span> <span className='bg-yellow-400 rounded-md py-1 px-2 text-sm'>Javascript</span> <span className='bg-yellow-400 rounded-md py-1 px-2 text-sm'>Typescript</span> <span className='bg-yellow-400 rounded-md py-1 px-2 text-sm'>React</span> <span className='bg-yellow-400 rounded-md py-1 px-2 text-sm'>Node</span> <span className='bg-yellow-400 rounded-md py-1 px-2 text-sm'>Express</span> <span className='bg-yellow-400 rounded-md py-1 px-2 text-sm'>Knex&amp;Objection</span> <span className='bg-yellow-400 rounded-md py-1 px-2 text-sm'>SQL</span>
        </div>
        <hr />
        <div className='p-2'>
            <h1 className='text-2xl mb-5'>Hobbies / Intrests</h1>
            <span className='bg-yellow-400 rounded-md py-1 px-2 text-sm'>Football</span> <span className='bg-yellow-400 rounded-md py-1 px-2 text-sm'>Adventure</span>
        </div>
    </div>
    </div>
  )
}

export default About