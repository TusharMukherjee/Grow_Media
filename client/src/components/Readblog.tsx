import { match } from 'assert'
import React from 'react'
import Readwithcomment from './Readwithcomment'
import {useParams} from 'react-router-dom'
import { useQuery } from '@apollo/client'

import {SINGLE_BLOG} from '../gqlQueries/queries/Explorequery';

type SingleBlogOutput = {
    blog:{
        blog_id: string;
        heading: string;
        content: string;
        users: {
            user_id: string;
            username: string;
            bio: string | null;
        }[]
    }[]
}

type SingleBlogVar = {
    blogId: number;
}

const Readblog = () => {
    const {blog_id} = useParams<string>();
    console.log(Number(blog_id));

    const { loading, data } = useQuery<SingleBlogOutput, SingleBlogVar>(SINGLE_BLOG,{variables: {blogId: Number(blog_id)}})
    console.log(data);

  return (
    <div>
        <div className='grid grid-cols-10'>
            <div className='col-span-7 grid grid-cols-10 z-0'>
                <div className='col-span-10 grid grid-cols-11 items-center mt-14'>
                    <h1 className='col-start-2 col-span-9 mx-10 text-3xl font-bold'>{data?.blog[0].heading}</h1>
                    <div className='col-start-2 col-span-9 mx-10 grid place-items-center  my-12'>
                        <div className='h-60 w-96 bg-teal-700'></div>
                    </div>
                    <p className='col-start-2 col-span-9 mx-10 text-xl mb-8'>{data?.blog[0].content}</p>
                </div>
            </div>
            <div className='col-span-3 bg-teal-400 grid justify-center py-14 z-10 h-screen sticky top-12 right-0 overflow-y-scroll'>
                <Readwithcomment user_id={`${data?.blog[0].users[0].user_id}`} username={`${data?.blog[0].users[0].username}`} bio={`${data?.blog[0].users[0].bio}`} />
            </div> 
        </div>
        
    </div>
  )
}

export default Readblog