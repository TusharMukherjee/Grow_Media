import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';

const Navbar: React.FC = () => {

  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth?.logout();
    navigate('/login');
  }

  return(
    <>
      <div className='col-span-7 flex justify-center h-12 items-center sticky top-0 z-20  bg-teal-500'>
            <div className='flex flex-row justify-between mx-10 w-full'>
              <Link to="/home" className=' font-semibold text-white '>
                <h1>Logo</h1>
              </Link>
              
              <div>
                  <input type="text" className='border outline-0'/>
                  <button className='border w-8 bg-white'>☻</button>
              </div>

              <div className=' flex flex-row gap-10'>
                <Link to="/addblog" className=' font-semibold text-white '>
                  <h1>Add Blog</h1>
                </Link>

                <Link to="/profile" className=' font-semibold text-white '>
                  <h1>Profile</h1>
                </Link>

                <div onClick={handleLogout} className=' cursor-pointer font-semibold text-white '>
                  Log Out
                </div>
              </div>
            </div>
      </div>
      <Outlet/>
    </>
      
  )
};

export default Navbar;
