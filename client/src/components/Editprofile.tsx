import React from 'react'
import Sidebar from './Sidebar'

const Editprofile:React.FC = () => {
  return (
    <div className='grid grid-cols-8 '> <Sidebar/> <div className='col-start-3 col-span-6 flex flex-col my-8'>
    <div className='grid grid-cols-7'>
        <div className='col-start-2 col-span-5 border-teal-500 border-[0.5px] grid grid-cols-10 gap-5 shadow-lg'>
            <div className=' col-start-2 col-span-8 my-8'>
                <h1 className='text-2xl font-semibold'>tushar.mkj</h1>
                <label htmlFor="imageinput" className=' cursor-pointer text-blue-700'>Change profile photo</label>
                <input className='hidden' type="file" accept=".gif,.jpg,.jpeg,.png" id='imageinput' />
            </div>
            <div className=' col-start-2 col-span-8 border-teal-500 h-20 grid items-center pl-5 grid-cols-2 gap-5'>
                <label className='col-span-1' htmlFor="bio">Bio</label>
                <input type="text" id='bio'  className=' w-48 rounded-md border-[1px] border-teal-500 outline-0 col-span-1'/>
            </div>
            <div className=' col-start-2 col-span-8 border-teal-500 h-20 grid items-center pl-5 grid-cols-2 gap-5'>
                <label className='col-span-1' htmlFor="website">Website</label>
                <input type="text" id='website'  className=' w-48 rounded-md border-[1px] border-teal-500 outline-0 col-span-1'/>
            </div>
            <div className=' col-start-2 col-span-8 border-teal-500 h-20 grid items-center pl-5 grid-cols-2 gap-5'>
                <label className='col-span-1' htmlFor="hometown">Hometown</label>
                <input type="text" id='hometown' className=' w-48 rounded-md border-[1px] border-teal-500 outline-0 col-span-1'/>
            </div>
            <div className=' col-start-2 col-span-8 border-teal-500 h-20 grid items-center pl-5 grid-cols-2 gap-5'>
                <label className='col-span-1' htmlFor="qualification">Qualification</label>
                <input type="text" id='qualification'  className=' w-48 rounded-md border-[1px] border-teal-500 outline-0 col-span-1'/>
            </div>
            <div className=' col-start-2 col-span-8 border-teal-500 h-20 grid items-center pl-5 grid-cols-2 gap-5'>
                <label className='col-span-1' htmlFor="education">Education</label>
                <input type="text" id='education' className=' w-48 rounded-md border-[1px] border-teal-500 outline-0 col-span-1'/>
            </div>
            <div className=' col-start-2 col-span-8 border-teal-500 h-52 grid p-5 grid-cols-2 gap-5 content-between'>
                <div className="col-span-2 grid grid-cols-2 gap-5">
                    <label className='col-span-1' htmlFor="skills">Skills</label>
                    <textarea id='skills' className=' w-48 rounded-md border-[1px] border-teal-500 outline-0 h-20 resize-none col-span-1'/>
                </div>
                
                <div className='col-span-2 self-baseline'>
                    <span className='bg-yellow-400 rounded-md py-1 px-2 text-sm inline-block mb-2'>C++</span> <span className='bg-yellow-400 rounded-md py-1 px-2 text-sm inline-block mb-2'>Javascript</span> <span className='bg-yellow-400 rounded-md py-1 px-2 text-sm inline-block mb-2'>Typescript</span> <span className='bg-yellow-400 rounded-md py-1 px-2 text-sm inline-block mb-2'>React</span> <span className='bg-yellow-400 rounded-md py-1 px-2 text-sm inline-block mb-2'>Node</span> <span className='bg-yellow-400 rounded-md py-1 px-2 text-sm inline-block mb-2'>Express</span> <span className='bg-yellow-400 rounded-md py-1 px-2 text-sm inline-block mb-2'>Knex&amp;Objection</span> <span className='bg-yellow-400 rounded-md py-1 px-2 text-sm inline-block mb-2'>SQL</span>
                </div>                
            </div>
            <div className=' h-16 col-start-2 col-span-8 border-teal-500 grid grid-cols-2 gap-5 mb-5'>
                <div className=' col-start-2 col-span-1 flex flex-col justify-center items-center'>
                    <button className=' px-2 py-1 bg-teal-500 text-white rounded-md'>Update</button>
                </div>
            </div>
        </div>
        
    </div>
    </div>
    </div>
  )
}

export default Editprofile