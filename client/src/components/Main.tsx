import React from 'react';
import Posts from './Posts';

const Main: React.FC = () => {
  return (
      <div className='border col-start-3 col-span-6 flex flex-col items-center pt-11'>
          <Posts/>
      </div>
  );
};

export default Main;
