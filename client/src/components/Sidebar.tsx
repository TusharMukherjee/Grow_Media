import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
        <div className='col-span-2 flex h-[38rem] border flex justify-center sticky top-12'>
            <div className='flex flex-col justify-center items-center border w-60 mt-8 pt-1.5 h-1/2'>
              <Link to="/explore" className='border mb-8 h-12 w-48 pl-3 rounded-lg flex items-center'>
                  <div>Explore</div>
              </Link>
              <Link to="/followingspost" className='border mb-8 h-12 w-48 pl-3 rounded-lg flex items-center'>
                  <div>Following Posts</div>
              </Link>
              <Link to="/editprofile" className='border mb-8 h-12 w-48 pl-3 rounded-lg flex items-center'>
                  <div>Edit Profile</div>
              </Link>                
            </div>
        </div>
  );
};

export default Sidebar;
