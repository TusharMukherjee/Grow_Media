import React from 'react';

const Sidebar: React.FC = () => {
  return (
        <div className='col-span-2 flex h-[38rem] border justify-center sticky top-12'>
            <div className='flex flex-col justify-center items-center border w-60 mt-5 py-1.5 h-1/2'>
                <div className='border mt-8 h-12 w-48 pl-3 rounded-lg flex items-center'>Explore</div>
                <div className='border mt-8 h-12 w-48 pl-3 rounded-lg flex items-center'>Following Posts</div>
                <div className='border mt-8 h-12 w-48 pl-3 rounded-lg flex items-center'>Edit Profile</div>
            </div>
        </div>
  );
};

export default Sidebar;
