import Readwithcomment from './Readwithcomment'
import {useParams} from 'react-router-dom'
import { useQuery } from '@apollo/client'

import {COUNT_CMNT_LIKE, FOLLOWERS, IS_FOLLOWING, IS_LIKED, ONLYCMNT, REPTOTAL, SINGLE_BLOG} from '../gqlQueries/queries/Explorequery';
import { useSelector, useDispatch } from 'react-redux';
import { bluser_id, getComm, postComm, postOwnerInfo, userOwnerId } from '../features/PostSlice'
import { useEffect, useState } from 'react';
import { userLoginInfo } from '../features/UserSlice';
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

    const dispatch = useDispatch();
    // const selector = useSelector(getComm);

    const {blog_id} = useParams<string>();
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
          console.log(data?.blog[0].bluser_id);
          console.log("okokok")
          setOnlybluser_id(data?.blog[0].bluser_id);
        },
        variables:{
          blogId: Number(blog_id)
        }
      });
//       dispatch(bluser_id(data_onlyblog.blog[0].bluser_id));

      // const commSelector = useSelector(userOwnerId);
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
              userId: Number(data_onlyblog?.blog[0].users[0].user_id)
          }
      });

      console.log(data_onlyblog);
      // console.log(onlyCMNT);
      // console.log(repTOTAL);
    
    // console.log(allcommData);
    // console.log(selector);
    
  
    return (
            <div>
                <div className='grid grid-cols-10'>
                  { 
                  loading ?
                  (<div className=' h-screen col-start-2 col-span-6 flex flex-row justify-center items-center'><h1>Loading...</h1></div>)
                  :
                  (<>
                    <div className='col-span-7 grid grid-cols-10 z-0'>
                        <div className='col-span-10 grid grid-cols-11 items-center mt-14'>
                            <h1 className='col-start-2 col-span-9 mx-10 text-3xl font-bold'>{data_onlyblog?.blog[0].heading}</h1>
                            <div className='col-start-2 col-span-9 mx-10 grid place-items-center  my-12'>
                                {/* <div className='h-60 w-96 bg-teal-700'></div> */}
                                <img className='h-60 w-96 object-cover' src={`https://res.cloudinary.com/dmtfoyuuq/image/upload/v1652613376/${data_onlyblog?.blog[0].b_image}`} alt="" />
                            </div>
                            <p className='col-start-2 col-span-9 mx-10 text-xl mb-8'>{data_onlyblog?.blog[0].content}</p>
                        </div>
                    </div>
                    <div className='col-span-3 bg-teal-400 grid justify-center py-14 z-10 h-screen sticky top-12 right-0 overflow-y-scroll'>
                        {/* <Readwithcomment bcomments = {selector} users = {ownerInfo} /> */}
                        <Readwithcomment refetch_followers={refetch_followers} data_followers={data_followers} refetch_total={refetch_total} refetch_isliked={refetch_isliked} is_liked={is_liked} data_onlyblog ={data_onlyblog} repTOTAL= {repTOTAL} onlyCMNT={onlyCMNT} refetch_isFollowing={refetch_isFollowing} refetchMut={refetch_onlycmnt} isFollow = {isFollow}/>
                    </div> 
                  </>)
                  }
                    
                </div>
                
            </div>
    )
}

export default Readblog