import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Tabs from './Tabs';

const People:React.FC = () => {
  return (
      <>
      <div className='grid grid-cols-8'> <Sidebar/> <div className='col-start-3 col-span-6 flex flex-col'>
      <Tabs/>

      <Link to="/profile">
        <div className='grid grid-cols-5'>
          <div className='col-start-2 col-span-3 mb-6 rounded-lg border-[0.5px] border-teal-500 bg-white shadow-md hover:shadow-teal-200'>
          <div className='grid grid-cols-8 h-32'>
              <div className='col-span-1 rounded-full h-16 w-16 ml-5 bg-stone-700 place-self-center'></div>
              <div className='col-span-5 flex flex-col justify-center pl-5'>
                  <h1 className='font-medium'>Tushar Mukherjee</h1>
                  <p className='text-sm mt-1'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas aut neque nulla voluptatem, iure itaque obcaecati.</p>
              </div>
              <div className='col-span-2 place-self-center text-white'><button className='bg-green-500 px-3 py-0.5 rounded-2xl'>Follow</button></div>
          </div>
          </div>
      </div>
      </Link>
      </div>
      </div>

      
      </>
  );
};

export default People;
