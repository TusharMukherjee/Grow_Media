import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { IS_FOLLOWING, PROFILE, PROFILE_INFO } from '../gqlQueries/queries/Explorequery'
import { useDispatch } from 'react-redux'
import { homeBlogsStore } from '../features/PostSlice'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { homeBlogsDataStore } from '../features/PostSlice'
import { userLoginInfo } from '../features/UserSlice'
import { FOLLOW, UNFOLLOW } from '../gqlQueries/mutations/Allmutation'

type blogs = {
        blog_id: string;
        heading: string;
        content: string;
        b_image:string;
}


type UserInfoType = {
        user: [{
            profileImg: string;
            username: string;
            email: string;
            bio: string;
            link: string;
            blogs: blogs[];
        }]
}

type UserId = {
    userId:number;
}

type isFollow = {
      isFollowing:{
          status: boolean
      }
}|undefined

const Userhome: React.FC = () => {

    const navigate = useNavigate();

    const {profile_id} = useParams();

    const homeBlogsDataSelector: UserInfoType = useSelector(homeBlogsDataStore);
    console.log(homeBlogsDataSelector);

    const{data} = useQuery(PROFILE_INFO,{variables:{
        userId: Number(profile_id)
    }});

    const selector = useSelector(userLoginInfo);

    const {data:data_isFollowing,refetch:refetch_isFollowing} = useQuery<isFollow>(IS_FOLLOWING,{
        variables:{
            userId:selector.user_id,
            followersId: Number(profile_id)
        }
    });
    console.log(data_isFollowing?.isFollowing.status);

    const [followFun] = useMutation(FOLLOW,{
        onCompleted:(data) => {
            console.log(data);
            refetch_isFollowing();
        },
        variables:{
            userId:selector.user_id,
            followersId:Number(profile_id)
        }
    });

    const [unfollowFun] = useMutation(UNFOLLOW,{
        onCompleted:(data) => {
            console.log(data);
            refetch_isFollowing();
        },
        variables:{
            userId:selector.user_id,
            followersId:Number(profile_id)
        }
    })

    console.log(data);

  return (
      <>
        <div className='col-span-8 grid grid-cols-8 mt-6'>
            <div className='col-start-2 col-span-6 grid grid-cols-5 h-56'>
                <div className=' col-span-2 h-56 flex justify-center items-center'>
                    <div className='bg-purple-500 rounded-lg w-32 h-32'></div>
                </div>
                <div className='col-span-3 flex flex-col justify-center '>
                    <div className=' w-4/6 flex items-center font-semibold my-2 justify-between' ><h1>{data?.user[0].username}</h1>
                    {
                        (Number(selector.user_id) === Number(profile_id))
                        ?
                        <></>
                        :
                        (data_isFollowing?.isFollowing.status)
                        ?
                        <button onClick={()=>unfollowFun()} className=' outline-0 border-2 border-teal-500 bg-white text-teal-500 px-2 py-1 rounded-md'>Unfollow</button>
                        :
                        <button onClick={()=>followFun()} className=' outline-0 bg-teal-500 text-white px-2 py-1 rounded-md'>Follow</button>

                    }
                    </div>
                    <div className=' w-4/6 my-2 flex justify-between'>
                        <div className=""> 100 Blogs</div>
                        <div className=""> 114 Followers </div>
                        <div className=""> 316 Following </div>
                    </div>
                    <p className=' w-4/6 flex items-center '>{data?.user[0].bio == null ? '' : data?.user[0].bio}</p>
                    <a href={data?.user[0].link} className=' w-4/6 my-1 flex items-center' >{data?.user[0].link}</a>
                </div>
            </div>
            <hr className='col-start-2 col-span-6'/>
            <div className='col-start-2 col-span-6 grid grid-cols-2 my-5 place-items-center'>
                <button onClick={() => navigate(`/profile/${profile_id}`)} className='text-white col-span-1 flex justify-center bg-purple-500 w-20 py-0.5 rounded-md'>Blogs</button>
                <button onClick={() => navigate(`/profile/about/${profile_id}`)} className='text-white col-span-1 flex justify-center bg-purple-500 w-20 py-0.5 rounded-md'>About</button>
            </div>
        </div>
        <Outlet/>
      </>
    
  )
}

export default Userhome