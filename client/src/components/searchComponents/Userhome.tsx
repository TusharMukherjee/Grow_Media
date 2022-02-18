import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import About from '../About'
import Posts from '../Posts'

const Userhome: React.FC = () => {

    const profile_id = useParams();
    console.log(profile_id);

  return (
    <div className='col-span-8 grid grid-cols-8 mt-6'>
        <div className='col-start-2 col-span-6 grid grid-cols-5 h-56'>
            <div className=' col-span-2 h-56 flex justify-center items-center'>
                <div className='bg-purple-500 rounded-lg w-32 h-32'></div>
            </div>
            <div className='col-span-3 grid grid-rows-6'>
                <h1 className='row-start-2 row-span-1 flex w-3/4 items-center font-semibold'>Tushar Mukherjee</h1>
                <p className='row-start-3 row-span-2 flex w-3/4 items-center'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. At quas ex laborum atque natus sed voluptate eligendi error rerum quis?</p>
                <p className='row-start-5 row-span-1 flex w-3/4 items-center'>https://tailwindcss.com/docs/border-radius</p>
            </div>
        </div>
        <hr className='col-start-2 col-span-6'/>
        <div className='col-start-2 col-span-6 grid grid-cols-2 my-5 place-items-center'>
            <Link to="/profile" className='col-span-1 flex justify-center bg-purple-500 w-20 py-0.5 rounded-md'>
                <div className='text-white'>Blogs</div>
            </Link>
            <Link to="/profile/about" className='col-span-1 flex justify-center bg-purple-500 w-20 py-0.5 rounded-md'>
                <div className='text-white'>About</div>
            </Link>
        </div>
    </div>
  )
}

export default Userhome