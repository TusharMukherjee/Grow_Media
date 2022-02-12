import React from 'react';
import Editprofile from '../Editprofile';
import { Link } from 'react-router-dom';



import Posts from '../Posts';
import People from './People';

const Tabs:React.FC = () => {
  return (
        <div className='grid grid-cols-4 mb-8 sticky top-12'>
          <Link to="/search/blogs" className='col-span-2'>
            <div className=' active:bg-teal-500 active:text-white bg-white text-teal-600 py-1 border-r-[1px] border-b-[1px] flex justify-center items-center'>Blogs</div>
          </Link>
          <Link to="/search/people" className='col-span-2'>
            <div className='active:bg-teal-500 active:text-white bg-white text-teal-600 py-1 border-r-[1px] border-b-[1px] flex justify-center items-center'>People</div>
          </Link>
        </div>
      
  );
};

export default Tabs;
