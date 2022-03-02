import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { PROFILE } from '../../gqlQueries/queries/Explorequery'

type UsersBlog = {
        blog_id: string;
        heading: string;
        content: string;
        b_image: string;
        tb_likes: number;
}


type UserInfoType = {
        user: [{
            profileImg: string;
            username: string;
            email: string;
            bio: string;
            link: string;
            blogs: UsersBlog[];
        }]
}

type UserId = {
    userId:number;
}


const Userhome: React.FC = () => {

    const navigate = useNavigate();

    const [profileID, setProfileID] = useState<string | undefined>('');

    const {profile_id} = useParams();
    console.log(profile_id);

    useEffect(() => {

        setProfileID(profile_id);

    },[]);

    

    const {loading, data} = useQuery<UserInfoType, UserId>(PROFILE,{variables: {userId:Number(profile_id)}});
    console.log(data);
  return (
      <>
        <div className='col-span-8 grid grid-cols-8 mt-6'>
            <div className='col-start-2 col-span-6 grid grid-cols-5 h-56'>
                <div className=' col-span-2 h-56 flex justify-center items-center'>
                    <div className='bg-purple-500 rounded-lg w-32 h-32'></div>
                </div>
                <div className='col-span-3 flex flex-col justify-center '>
                    <h1 className=' w-4/6 flex items-center font-semibold my-2'>{data?.user[0].username}</h1>
                    <div className=' w-4/6 my-2 flex justify-between'>
                        <div className=""> {data?.user[0].blogs.length} Blogs</div>
                        <div className=""> 114 Followers </div>
                        <div className=""> 316 Following </div>
                    </div>
                    <p className=' w-4/6 flex items-center '>{data?.user[0].bio == null ? '' : data?.user[0].bio}</p>
                    <p className=' w-4/6 my-1 flex items-center'>{data?.user[0].link}</p>
                </div>
            </div>
            <hr className='col-start-2 col-span-6'/>
            <div className='col-start-2 col-span-6 grid grid-cols-2 my-5 place-items-center'>
                <button onClick={() => navigate(`/profile/${profileID}`)} className='text-white col-span-1 flex justify-center bg-purple-500 w-20 py-0.5 rounded-md'>Blogs</button>
                <button onClick={() => navigate(`/profile/about/${profileID}`)} className='text-white col-span-1 flex justify-center bg-purple-500 w-20 py-0.5 rounded-md'>About</button>
            </div>
        </div>
        <Outlet/>
      </>
    
  )
}

export default Userhome