import React from 'react';

const Navbar: React.FC = () => {
  return(
      <div className='col-span-7 flex justify-center border h-12 items-center sticky top-0'>
          <div className='flex flex-row justify-between mx-10 border w-full'>
            <h1>Logo</h1>
            <div>
                <input type="text" className='border outline-0'/>
                <button className='border w-8'>☻</button>
            </div>
            <h1>Profile</h1>
          </div>
      </div>
  )
};

export default Navbar;
