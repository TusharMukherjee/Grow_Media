import React from 'react';
import Editprofile from '../Editprofile';
import { Link } from 'react-router-dom';



import Posts from '../Posts';
import People from './People';

const Tabs:React.FC = () => {
  return (
        <div className='bg-gray-400 border grid grid-cols-4 mb-8 sticky top-12'>
          <Link to="/search/blogs" className='col-span-2'>
            <div className='bg-yellow-400 py-1 border flex justify-center items-center'>Blogs</div>
          </Link>
          <Link to="/search/people" className='col-span-2'>
            <div className='bg-yellow-400 py-1 border flex justify-center items-center'>People</div>
          </Link>
        </div>
      
  );
};

export default Tabs;
