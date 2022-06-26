import { useQuery } from '@apollo/client';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { SEARCHUSER } from '../../gqlQueries/queries/Explorequery';
import Sidebar from '../Sidebar';
import Tabs from './Tabs';

type searchusertype = {
  user_id : string
  profile_img: string
  username: string
  bio: string
}

const People:React.FC = () => {

  const {searchquery} = useParams();
  const {data} = useQuery(SEARCHUSER,{
    variables:{
      searchkeyword: searchquery
    }
  });

  return (
      <>
      <div className='grid grid-cols-8'> <Sidebar/> <div className=' sm:col-start-1 sm:col-span-8 flex flex-col '>
      <Tabs/>
      {
        (data?.searchUser.length !== 0)?
        data?.searchUser.map((el:searchusertype,index:number) => {
          return (
            <Link to={`/profile/${el.user_id}`} key={index}>
              <div className='grid grid-cols-5'>
                <div className='col-start-2 col-span-3 mb-6 rounded-lg border-[0.5px] bg-white shadow-sm hover:shadow-teal-200'>
                <div className='grid grid-cols-8 h-32'>
                {
                    (el.profile_img !== null)?
                    <img src={`https://res.cloudinary.com/dmtfoyuuq/image/upload/v1652613376/${el.profile_img}`} alt={el.profile_img} className='col-span-1 bg-cover rounded-full h-16 w-16 ml-10 place-self-center'/>
                    :
                    <img src={`https://res.cloudinary.com/dmtfoyuuq/image/upload/v1656086069/e0gy9inebvobnauo1um2.gif`} alt="Default img (Grow_Media)" className='col-span-1 bg-cover rounded-full h-16 w-16 ml-10 place-self-center'/>
                }
                    <div className=' ml-8 col-span-5 flex flex-col justify-center pl-5'>
                        <h1 className='font-medium'>{el.username}</h1>
                        <p className='text-sm mt-1'>{el.bio}</p>
                    </div>
                </div>
                </div>
              </div>
            </Link> 
          )
        })
        :
          <div className='grid place-items-center'>
            <h1 className=' text-gray-600 text-lg mt-40 bg-gray-200 p-8 rounded-md '>
                No user found named "{searchquery}"
            </h1>
          </div>
      }
      
      </div>
      </div>

      
      </>
  );
};

export default People;
