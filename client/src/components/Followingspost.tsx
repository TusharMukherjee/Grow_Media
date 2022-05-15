import { useQuery } from '@apollo/client'
import React from 'react'
import { Link } from 'react-router-dom'
import { USER_HOME_POSTS } from '../gqlQueries/queries/Explorequery'
import Sidebar from './Sidebar'

type allSearchBlogsUsers = {
    user_id: String
    profileImg: String
    username: String
    bio: String
}

type Blogs = {
    blogs:[blogs]
}

type blogs = {
    users: [allSearchBlogsUsers]
    blog_id: String
    heading: String
    content: String
    b_image: String
}

const Followingspost:React.FC = () => {

    const {data,loading} = useQuery<Blogs>(USER_HOME_POSTS);
    console.log(data?.blogs);

  return (
<>
    <div className='grid grid-cols-8'> <Sidebar/> <div className='col-start-3 col-span-6 flex flex-col mt-6'>
            {
                (loading)?(<p>Loading...</p>):
                data?.blogs.map((el) => {
                    return (
                        
                        <div className='bg-white grid grid-cols-8 items-center pt-8' key={Number(el.blog_id)}>
                            <Link to={`/read/${el.blog_id}`} className='bg-white col-start-2 col-span-6 grid grid-cols-5 grid-rows-6 h-52 mb-8 border rounded-md hover:drop-shadow' >
                                    <div className='col-span-3 row-span-1 flex flex-row  items-center border-b-[0.5px]'>
                                        <div className='ml-3 rounded-full h-5 w-5 bg-orange-400'></div>
                                        <h1 className='ml-3'>{el.users[0].username}</h1>
                                    </div>
                                    <div className='col-span-3 row-span-4  grid grid-rows-6 '>
                                        <h1 className=' text-xl row-start-1 row-span-3 pl-3 flex items-center'>{el.heading}</h1>
                                        <p className='text-base row-span-3 pl-3 flex items-center'>{el.content.slice(0,120) + "..."}</p>
                                    </div>
                                    <div className='col-start-4 col-span-2 row-start-1 row-span-6 flex justify-center items-center'>
                                        {/* <div className=' bg-purple-700 w-[12rem] h-[8rem]'></div> */}
                                        <img className=' w-[12rem] h-[8rem] object-cover' src={`https://res.cloudinary.com/dmtfoyuuq/image/upload/v1652613376/${el.b_image}`} alt="" />
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
                })
            }
            </div>
            </div>
      </>
)
}

export default Followingspost