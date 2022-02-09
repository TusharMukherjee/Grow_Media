import React from 'react';
import People from './People';

const Tabs:React.FC = () => {
  return (
      <div className='bg-gray-400 border grid grid-cols-8'>
        <div className='border grid grid-cols-4 h-10 col-span-8 mb-8 sticky top-12'>
          <div className='col-span-2 border flex justify-center items-center'>Blogs</div>
          <div className='col-span-2 border flex justify-center items-center'>People</div>
        </div>
        <People/>
      </div>
  );
};

export default Tabs;
