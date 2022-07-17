import { Link } from 'react-router-dom'

import { useParams } from 'react-router-dom'
import { HOMEBLOGS } from '../gqlQueries/queries/Explorequery'

import { useQuery } from '@apollo/client'
import Sidebar from './Sidebar'
import { useDispatch } from 'react-redux'
import { toggleSearchdis } from '../features/UserSlice'

type homeblogs = {
    homeBlogs:{
        blog_id: string,
        heading: string,
        content: string,
        b_image: string,
        user_id: string,
        profile_img: string,
        username: string,
        totalblikes: string,
        totalbcomments: string 
    }[]
}

const HomePosts = () => {

const {profile_id} = useParams();
const dispatch = useDispatch();

const {loading,data:data_homeblogs} = useQuery<homeblogs>(HOMEBLOGS,{
    variables:{
        homeBlogsId: Number(profile_id)
    }
});

function toggleSeFalse(){
    dispatch(toggleSearchdis(false))
}


  return (
    (loading)?(<div className='bg-teal-200 h-screen fixed top-0 left-0 bottom-0 right-0 w-screen grid place-items-center'><div className=' h-28 w-28 border-white rounded-full border-t-[0.5rem] border-[0.5rem] border-t-teal-500 animate-spin ' ></div></div>):
       <div className=' sm:col-span-8 grid grid-cols-8'>  <div className='lg:hidden'><Sidebar/></div> <div className='sm:col-start-2 sm:col-span-6 lg:col-start-3 lg:col-span-4 col-start-1 col-span-8 flex flex-col justify-center items-center pb-16'>
        {
            (data_homeblogs?.homeBlogs.length !== 0)?
            data_homeblogs?.homeBlogs.map((el:any) => {
                    return(
                        <div className='bg-white grid grid-cols-12 sm:grid-cols-8 items-center pt-6 sm:pt-8' key={Number(el.blog_id)}>
                        <Link onClick={toggleSeFalse} to={`/read/${el.blog_id}`} className='bg-white col-start-2 sm:col-start-2 sm:col-span-6 col-span-10 grid grid-cols-5 grid-rows-6 h-48 sm:h-52 mb-6 sm:mb-8 border rounded-md hover:drop-shadow' >
                                <div className='col-span-3 row-span-1 flex flex-row  items-center border-b-[0.5px]'>
                                {
                                    (el.profile_img !== null)?
                                    <img src={`https://res.cloudinary.com/dmtfoyuuq/image/upload/v1652613376/${el.profile_img}`} alt={el.profile_img} className='ml-3 rounded-full object-cover h-4 w-4 sm:h-5 sm:w-5'/>
                                    :
                                    <img src={`https://res.cloudinary.com/dmtfoyuuq/image/upload/v1656086069/e0gy9inebvobnauo1um2.gif`} alt="Default img (Grow Media)" className='ml-3 rounded-full object-cover h-4 w-4 sm:h-5 sm:w-5'/>
                                }
                                    
                                    <h1 className='ml-3 text-xs font-light sm:text-xl lg:text-base'>{el.username}</h1>
                                </div>
                                <div className='col-span-3 row-span-4  grid grid-rows-6 '>
                                    <h1 className=' text-sm font-medium sm:text-xl row-start-1 row-span-3 pl-3 flex items-center'>{el.heading}</h1>
                                    <p className=' text-xs sm:text-base row-span-3 pl-3 flex items-center'>{el.content.slice(0,90) + "..."}</p>
                                </div>
                                <div className='col-start-4 col-span-2 row-start-1 row-span-6 flex justify-center items-center'>
                                    {/* <div className=' bg-purple-700 w-[12rem] h-[8rem]'></div> */}
                                    <img className=' h-[6rem] sm:h-[8rem] object-cover' src={`https://res.cloudinary.com/dmtfoyuuq/image/upload/v1652613376/${el.b_image}`} alt={el.b_image} />
                                </div>
                                <div className=' row-span-1 grid grid-cols-2 w-56 items-center pl-3'>
                                    <div className='col-span-1 flex justify-center'>
                                        <span className=' font-light text-xs sm:text-base'>{el.totalblikes}</span> 
                                        &nbsp;
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className='col-span-1 flex justify-center'>
                                        <span className=' font-light text-xs sm:text-base'>{el.totalbcomments} </span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                                            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                                        </svg>
                                    </div>
                                </div> 
                        </Link>      
                    </div>)
                }
                )
                    :
                    <div className='grid place-items-center'>
                        <h1 className=' text-gray-600 text-lg mt-20 bg-gray-200 p-8 rounded-md '>
                            No blog from user!
                        </h1>
                    </div>
}
                </div>
                </div>
)
}

export default HomePosts