import React from 'react';
import Tabs from './Tabs';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Posts from '../Posts';
import People from './People';

const MainSearch: React.FC = () => {
  return (
      <div className='bg-gray-600 border col-start-3 col-span-6 flex flex-col'>
        <Tabs/>
      </div>      
  );
};

export default MainSearch;
