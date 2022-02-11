import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return(
      <div className='col-span-7 flex justify-center h-12 items-center sticky top-0 z-20  bg-teal-500'>
          <div className='flex flex-row justify-between mx-10 w-full'>
            <Link to="/explore" className=' font-semibold text-white '>
              <h1>Logo</h1>
            </Link>
            
            <div>
                <input type="text" className='border outline-0'/>
                <button className='border w-8 bg-white'>☻</button>
            </div>
            <Link to="/profile" className=' font-semibold text-white '>
              <h1>Profile</h1>
            </Link>
            
          </div>
      </div>
  )
};

export default Navbar;
