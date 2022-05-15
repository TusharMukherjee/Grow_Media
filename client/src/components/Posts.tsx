import { useQuery } from '@apollo/client';
import React from 'react';
import { Link } from 'react-router-dom';
import {GET_ALL_BLOGS} from '../gqlQueries/queries/Explorequery'
import { useSelector, useDispatch } from 'react-redux';
import { allPosts, getAllMovies } from '../features/PostSlice'
import Sidebar from './Sidebar'

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
    b_image:string
    users:{
      user_id: string,
      username: string
    }[]
  }

  type blogs = {
      blogs: blogsData[]
  }

const Posts = () => {

    const dispatch = useDispatch();
    const allblogs = useSelector(getAllMovies);

    const {loading, data}= useQuery<blogs>(GET_ALL_BLOGS);
    if(data){
        // data.blogs.map((el:any) => {console.log(el)});
        console.log(data);
        dispatch(allPosts(data));
    }
    console.log(allblogs);

  return ( loading ? <div className='bg-teal-500 w-screen h-screen grid place-items-center'><div className=' h-32 w-32 border-white rounded-full border-t-[1rem] border-[1rem] border-t-teal-900 animate-spin ' ></div></div>:
      
      <div className='grid grid-cols-8'> <Sidebar/> <div className='col-start-3 col-span-6 flex flex-col mt-6'>
            {allblogs.blogs.map((allblogsEle:any) => {
                return(
                    <div className='bg-white grid grid-cols-8 items-center pt-8' key={allblogsEle.blog_id}>
                        <Link to={`/read/${allblogsEle.blog_id}`} className='bg-white col-start-2 col-span-6 grid grid-cols-5 grid-rows-6 h-52 mb-8 border rounded-md hover:drop-shadow' >
                                <div className='col-span-3 row-span-1 flex flex-row  items-center border-b-[0.5px]'>
                                    <div className='ml-3 rounded-full h-5 w-5 bg-orange-400'></div>
                                    <h1 className='ml-3'>{allblogsEle.users[0].username}</h1>
                                </div>
                                <div className='col-span-3 row-span-4  grid grid-rows-6 '>
                                    <h1 className=' text-xl row-start-1 row-span-3 pl-3 flex items-center'>{allblogsEle.heading}</h1>
                                    <p className='text-base row-span-3 pl-3 flex items-center'>{allblogsEle.content.slice(0,120) + "..."}</p>
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
                    </div>)
          })}
                    </div>
                    </div>

  );
};

export default Posts;
