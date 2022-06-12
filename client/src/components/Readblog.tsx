import Readwithcomment from './Readwithcomment'
import {useParams} from 'react-router-dom'
import { useQuery } from '@apollo/client'

import {COUNT_CMNT_LIKE, IS_FOLLOWING, SINGLE_BLOG} from '../gqlQueries/queries/Explorequery';
import { useSelector, useDispatch } from 'react-redux';
import { getComm, postComm, postOwnerInfo } from '../features/PostSlice'
import { useEffect, useState } from 'react';
import { userLoginInfo } from '../features/UserSlice';
// import { allPosts, getAllMovies } from '../features/PostSlice'


type SingleBlogOutput = {
    blog:[{
      blog_id: string;
      heading: string;
      content: string;
      b_image: string;
      users: users[];
      bcomments: bcomments[]
        }];
}

type users = {
        user_id: string;
        username: string;
        bio: string | null;
}

type SingleBlogVar = {
    blogId: number;
}

type bcomments = {
    bcomment_id: string;
    blcomment:string;
    totalBlogComments:number
    replyComments:{
      rcomment_id:string;
      replied_comment:string;
      replyUsers:{
        user_id: string;
        profile_img: string;
        username: string;
      }[];
    }[];
    blogsComUsers: {
      user_id: string;
      profile_img: string;
      username: string;
    }[];
}

type isFollow = {
      isFollowing:{
          status: boolean
      }
}|undefined


const Readblog = () => {

    const dispatch = useDispatch();
    // const selector = useSelector(getComm);

    const {blog_id} = useParams<string>();
    const selector = useSelector(userLoginInfo);
    const [isFollow,setIsFollow] = useState<isFollow>();
    console.log(isFollow?.isFollowing.status)
    
    const { loading, data, refetch: refetch1 } = useQuery<SingleBlogOutput, SingleBlogVar>(SINGLE_BLOG,{
      onCompleted:(data)=> {
        const allcommData  = data?.blog[0].bcomments!;
        dispatch(postComm(allcommData));
      },
      variables: {blogId: Number(blog_id)}});

      // const {} = useQuery(COUNT_CMNT_LIKE, {
      //   variables:{
      //     bcommentId
      //   }
      // })

        const ownerInfo = data?.blog[0].users!;
        console.log(ownerInfo);
        dispatch(postOwnerInfo(ownerInfo));
        const allcommData  = data?.blog[0].bcomments!;
        dispatch(postComm(allcommData));
    
        const {refetch:refetch_isFollowing} = useQuery(IS_FOLLOWING,{
          onCompleted:(data)=>{
              console.log(data);
              setIsFollow(data);
          },
          variables:{
              userId:selector.user_id,
              followersId: data?.blog[0].users[0].user_id
          }
      });
    
    // console.log(allcommData);
    // console.log(selector);
    
  
    return (
            <div>
                <div className='grid grid-cols-10'>
                  { loading ?
                    (<div className=' h-screen col-start-2 col-span-6 flex flex-row justify-center items-center'><h1>Loading...</h1></div>)
                    :
                    (<>
                      <div className='col-span-7 grid grid-cols-10 z-0'>
                          <div className='col-span-10 grid grid-cols-11 items-center mt-14'>
                              <h1 className='col-start-2 col-span-9 mx-10 text-3xl font-bold'>{data?.blog[0].heading}</h1>
                              <div className='col-start-2 col-span-9 mx-10 grid place-items-center  my-12'>
                                  {/* <div className='h-60 w-96 bg-teal-700'></div> */}
                                  <img className='h-60 w-96 object-cover' src={`https://res.cloudinary.com/dmtfoyuuq/image/upload/v1652613376/${data?.blog[0].b_image}`} alt="" />
                              </div>
                              <p className='col-start-2 col-span-9 mx-10 text-xl mb-8'>{data?.blog[0].content}</p>
                          </div>
                      </div>
                      <div className='col-span-3 bg-teal-400 grid justify-center py-14 z-10 h-screen sticky top-12 right-0 overflow-y-scroll'>
                          {/* <Readwithcomment bcomments = {selector} users = {ownerInfo} /> */}
                          <Readwithcomment refetch_isFollowing={refetch_isFollowing} refetchMut={refetch1} isFollow = {isFollow}/>
                      </div> 
                    </>)
                  }
                    
                </div>
                
            </div>
    )
}

export default Readblog