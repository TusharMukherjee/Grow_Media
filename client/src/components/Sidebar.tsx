import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
        <div className=' col-start-1 col-span-2 flex h-screen justify-center bg-teal-400 sticky top-12 z-10'>
            <div className='flex flex-col justify-center items-center w-60 mt-8 pt-1.5 h-1/2 fixed top-12'>

              <Link to="/home" className='z-10 hover:drop-shadow font-medium bg-white hover:border-teal-600 border text-teal-500 mb-3 h-12 w-48 pl-3 rounded-lg flex items-center'>
                  <div>Home</div>
              </Link>

              <Link to="/explore" className='z-10 hover:drop-shadow font-medium bg-white hover:border-teal-600 border text-teal-500 mb-3 h-12 w-48 pl-3 rounded-lg flex items-center'>
                  <div>Explore</div>
              </Link>
              
              <Link to="/editprofile" className='z-10 hover:drop-shadow font-medium bg-white hover:border-teal-600 border text-teal-500 mb-3 h-12 w-48 pl-3 rounded-lg flex items-center'>
                  <div>Edit Profile</div>
              </Link>                
            </div>
        </div>
  );
};

export default Sidebar;
