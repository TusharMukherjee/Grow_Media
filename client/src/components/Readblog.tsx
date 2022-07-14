import Readwithcomment from './Readwithcomment'
import {useNavigate, useParams} from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { FOLLOWERS, IS_FOLLOWING, IS_LIKED, ONLYCMNT, REPTOTAL, SINGLE_BLOG} from '../gqlQueries/queries/Explorequery';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { userLoginInfo } from '../features/UserSlice';
import Sidebar from './Sidebar';
// import { allPosts, getAllMovies } from '../features/PostSlice'

type isFollow = {
      isFollowing:{
          status: boolean
      }
}|undefined

type data_onlyblog = {
  blog: [blog]

}

type blog = {
  blog_id: string
  bluser_id: string
  b_image: string
  heading: string
  content: string
  users: [data_onlyblog_users]
}

type data_onlyblog_users = {
  user_id: string
  profile_img: string
  username: string
  bio: string
}

const Readblog = () => {

    const {blog_id} = useParams<string>();
    const navigate = useNavigate();
    const selector = useSelector(userLoginInfo);
    const [isFollow,setIsFollow] = useState<isFollow>();
    const [onlybluser_id, setOnlybluser_id] = useState<string>();
    // console.log(isFollow?.isFollowing.status)
    
    // const { loading, data, refetch: refetch1 } = useQuery<SingleBlogOutput, SingleBlogVar>(SINGLE_BLOG,{
    //   onCompleted:(data)=> {
    //     const allcommData  = data?.blog[0].bcomments!;
    //     dispatch(postComm(allcommData));
    //   },
    //   variables: {blogId: Number(blog_id)}});

      const {loading, data:data_onlyblog} = useQuery<data_onlyblog>(SINGLE_BLOG,{
        onCompleted:(data)=>{
          // console.log(data?.blog[0].bluser_id);
          setOnlybluser_id(data?.blog[0]?.bluser_id);
        },
        variables:{
          blogId: Number(blog_id)
        }
      });
//       dispatch(bluser_id(data_onlyblog.blog[0].bluser_id));

      // const commSelector = useSelector(userOwnerId)
      // console.log(commSelector)
      // console.log(onlybluser_id);
    
        const {refetch:refetch_isFollowing} = useQuery(IS_FOLLOWING,{
          onCompleted:(data)=>{
              // console.log(data);
              setIsFollow(data);
          },
          variables:{
              userId:selector.user_id,
              followersId: onlybluser_id
          }
      });

      //check above

      const {data:onlyCMNT,refetch:refetch_onlycmnt} = useQuery(ONLYCMNT,{
        variables:{
          onlycommentsId : blog_id,
          userId: selector.user_id
        }
      })

      const {data:is_liked, refetch: refetch_isliked} = useQuery(IS_LIKED,{
        variables:{
          onlycommentsId : blog_id,
          userId: String(selector.user_id)
        }
      })

      const {data: repTOTAL, refetch:refetch_total} = useQuery(REPTOTAL,{
        variables:{
          totalcommentId: blog_id
        }
      })

      const {data:data_followers, refetch:refetch_followers} = useQuery(FOLLOWERS,{
          variables:{
              userId: Number(data_onlyblog?.blog[0]?.users[0]?.user_id)
          }
      });

      // console.log(data_onlyblog);
      // console.log(onlyCMNT);
      // console.log(repTOTAL);
    
    // console.log(allcommData);
    // console.log(selector);
    
  
    return (
            <div>
                <div className='grid grid-cols-12 sm:grid-cols-8 lg:grid-cols-12'>
                  { 
                  loading ?
                  (<div className='bg-teal-500 w-screen h-screen grid place-items-center'><div className=' h-32 w-32 border-white rounded-full border-t-[1rem] border-[0.5rem] border-t-teal-900 animate-spin ' ></div></div>)
                  :
                  (
                    (data_onlyblog?.blog[0]?.blog_id === undefined && navigator.onLine === true)
                    ?
                    <>
                    <div className=" h-screen grid place-content-center fixed w-screen col-span-12 bg-white text-teal-600">
                        <div className="grid place-items-center gap-8">
                            <h1 className=" text-4xl font-bold ">
                                💀 Blog not found
                            </h1>
                            <button onClick={()=> navigate(-1)} className=" font-light bg-teal-600 text-white w-fit px-4 py-2 rounded-md hover:shadow-xl hover:shadow-teal-800 ">Click to go back</button>
                        </div>
                    </div>
                    <div className=' lg:hidden sm:col-span-8 grid grid-cols-8'>
                      <Sidebar/>
                    </div>
                    </>
                    :
                  
                  <>
                    <div className=' sm:bg-white sm:col-start-2 sm:col-span-6 col-start-1 col-span-12 sm:py-16 lg:py-6 lg:col-span-8 lg:col-start-1'>
                        <div className=' sm:grid sm:grid-cols-11 items-center mt-12'>
                            <h1 className='  sm:col-start-2 sm:col-span-9 mx-10 sm:text-center text-xl sm:text-3xl font-bold'>{data_onlyblog?.blog[0]?.heading}</h1>
                            <div className='  sm:col-start-2 sm:col-span-9 mx-10 grid place-items-center  my-12'>
                                {/* <div className='h-60 w-96 bg-teal-700'></div> */}
                                <img className='h-60 object-cover' src={`https://res.cloudinary.com/dmtfoyuuq/image/upload/v1652613376/${data_onlyblog?.blog[0]?.b_image}`} alt="" />
                            </div>
                            <p className='sm:col-start-2 sm:col-span-9 mx-10 text-lg sm:text-xl mb-8'>{data_onlyblog?.blog[0]?.content}</p>
                        </div>
                    </div>
                    <div className='col-start-1 col-span-12 sm:col-start-0 sm:col-span-8 lg:col-start-9 lg:col-span-4 bg-teal-400 grid justify-center py-14 lg:z-10 h-full sm:h-screen lg:top-12 lg:right-0 lg:sticky lg:overflow-y-hidden lg:scrollbar'>
                        {/* <Readwithcomment bcomments = {selector} users = {ownerInfo} /> */}
                        <Readwithcomment refetch_followers={refetch_followers} data_followers={data_followers} refetch_total={refetch_total} refetch_isliked={refetch_isliked} is_liked={is_liked} data_onlyblog ={data_onlyblog} repTOTAL= {repTOTAL} onlyCMNT={onlyCMNT} refetch_isFollowing={refetch_isFollowing} refetchMut={refetch_onlycmnt} isFollow = {isFollow}/>
                    </div> 
                    <div className=' lg:hidden sm:col-span-8 grid grid-cols-8'>
                      <Sidebar/>
                    </div>
                  </>)
                  }
                    
                </div>
                
            </div>
    )
}

export default Readblog