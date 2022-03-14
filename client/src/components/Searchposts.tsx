import React from 'react'
import { Link } from 'react-router-dom'
import Tabs from './searchComponents/Tabs'
import Sidebar from './Sidebar'

const Searchposts:React.FC = () => {
  return (
      <>
    <div className='grid grid-cols-8'> <Sidebar/> <div className='col-start-3 col-span-6 flex flex-col'>
    <div>
        <Tabs/>
        <div className='bg-white grid grid-cols-8 items-center pt-8'>
            <Link to="/read" className='col-start-2 col-span-6'>
                    <div className='bg-white  grid grid-cols-5 grid-rows-6 h-52 mb-8 border-teal-500 shadow-md hover:shadow-teal-200 rounded-md border-[0.5px]'>
                        <div className='col-span-5 row-span-1 flex flex-row  items-center border-b-2'>
                            <div className='ml-3 rounded-full h-5 w-5 bg-stone-700'></div>
                            <h1 className='ml-3'>Username</h1>
                        </div>
                        <div className='col-span-4 row-span-4  grid grid-rows-6 '>
                            <h1 className=' text-xl row-start-1 row-span-3 pl-3 flex items-center'>This is a Heading, lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
                            <p className='text-base row-span-3 pl-3 flex items-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae expedita perspiciatis eius reiciendis labore tempore. Sapiente voluptas</p>
                        </div>
                        <div className='col-span-1 row-span-4 flex justify-center items-center'>
                            <div className=' bg-purple-700 w-28 h-28'></div>
                        </div>
                        <div className=' row-span-1 grid grid-cols-2 w-56 items-center pl-3'>
                            <div className='col-span-1 flex justify-center'>
                                10 ♥
                            </div>
                            <div className='col-span-1 flex justify-center'>
                                4 ▲▼
                            </div>
                        </div>
                    </div>
            </Link>
            
      </div>
        
    </div>
    </div>
    </div>
    </>
  )
}

export default Searchposts