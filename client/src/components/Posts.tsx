import { useQuery } from '@apollo/client';
import React from 'react';
import { Link } from 'react-router-dom';
import {GET_ALL_BLOGS} from '../gqlQueries/queries/Explorequery'

// type PostType = {
//     posts: {}
// }

// type Props = {
//     [key: string]: any;
// };

type blogsData = {
    blog_id:string,
    heading:string,
    content:string
    users:{
      user_id: string,
      username: string
    }[]
  }

  type blogs = {
      blogs: blogsData[]
  }

const Posts = () => {

    const {loading, data}= useQuery<blogs>(GET_ALL_BLOGS);
    if(data){
        // data.blogs.map((el:any) => {console.log(el)});
        console.log(data);
    }

  return (
      <>
      { loading ? (<p>Loading...</p>):(
            data?.blogs.map((allblogs:any) => {
              return (
                    <div className='bg-white grid grid-cols-8 items-center pt-8' key={allblogs.blog_id}>
                        <Link to={`/read/${allblogs.blog_id}`} className='bg-white col-start-2 col-span-6 grid grid-cols-5 grid-rows-6 h-52 mb-8 border rounded-md hover:drop-shadow' >
                                <div className='col-span-3 row-span-1 flex flex-row  items-center border-b-[0.5px]'>
                                    <div className='ml-3 rounded-full h-5 w-5 bg-orange-400'></div>
                                    <h1 className='ml-3'>{allblogs.users[0].username}</h1>
                                </div>
                                <div className='col-span-3 row-span-4  grid grid-rows-6 '>
                                    <h1 className=' text-xl row-start-1 row-span-3 pl-3 flex items-center'>{allblogs.heading}</h1>
                                    <p className='text-base row-span-3 pl-3 flex items-center'>{allblogs.content.slice(0,120) + "..."}</p>
                                </div>
                                <div className='col-start-4 col-span-2 row-start-1 row-span-6 flex justify-center items-center'>
                                    <div className=' bg-purple-700 w-[12rem] h-[8rem]'></div>
                                </div>
                                <div className=' row-span-1 grid grid-cols-2 w-56 items-center pl-3'>
                                    <div className='col-span-1 flex justify-center'>
                                        10 ♥
                                    </div>
                                    <div className='col-span-1 flex justify-center'>
                                        4 ▲▼
                                    </div>
                                </div> 
                        </Link>      
                    </div>
              )
          }))
      }
      </>

  );
};

export default Posts;
