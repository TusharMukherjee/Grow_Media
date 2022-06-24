import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { SEARCHBLOG } from '../../gqlQueries/queries/Explorequery';

type searchblogs = {
        blog_id: string,
        heading: string,
        content: string,
        b_image: string,
        user_id: string,
        profile_img: string,
        username: string,
        totalblikes: string,
        totalbcomments: string 
}

const Posts = () => {

    const {searchquery} = useParams();

    const {data} = useQuery(SEARCHBLOG,{
        variables:{
            searchkeyword: searchquery
        }
    })

    return (
        <>
        {   (data?.searchBlog.length !== 0)?
            data?.searchBlog.map((el:searchblogs) => {
                return(
                    <div className='bg-white grid grid-cols-8 items-center pt-8' key={Number(el.blog_id)}>
                        <Link to={`/read/${el.blog_id}`} className='bg-white col-start-2 col-span-6 grid grid-cols-5 grid-rows-6 h-52 mb-8 border rounded-md hover:drop-shadow' >
                                <div className='col-span-3 row-span-1 flex flex-row  items-center border-b-[0.5px]'>
                                <img src={`https://res.cloudinary.com/dmtfoyuuq/image/upload/v1652613376/${el.profile_img}`} className='ml-3 rounded-full h-5 w-5'/>
                                    <h1 className='ml-3'>{el.username}</h1>
                                </div>
                                <div className='col-span-3 row-span-4  grid grid-rows-6 '>
                                    <h1 className=' text-xl row-start-1 row-span-3 pl-3 flex items-center'>{el.heading}</h1>
                                    <p className='text-base row-span-3 pl-3 flex items-center'>{el.content.slice(0,120) + "..."}</p>
                                </div>
                                <div className='col-start-4 col-span-2 row-start-1 row-span-6 flex justify-center items-center'>
                                <img className=' w-[12rem] h-[8rem] object-cover' src={`https://res.cloudinary.com/dmtfoyuuq/image/upload/v1652613376/${el.b_image}`} alt={el.b_image} />
                                </div>
                                <div className=' row-span-1 grid grid-cols-2 w-56 items-center pl-3'>
                                    <div className='col-span-1 flex justify-center'>
                                            <span className=' text-small'>{el.totalblikes}</span> 
                                            &nbsp;
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                            </svg>
                                    </div>
                                    <div className='col-span-1 flex justify-center'>
                                            <span className=' text-small'>{el.totalbcomments} </span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                                                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                                            </svg>
                                    </div>
                                </div> 
                        </Link>      
                    </div>
                )
            })
            :
            <div className=' grid place-items-center '>
                <h1 className=' mt-32 text-3xl text-gray-600'>
                    No blog found!
                </h1>
            </div>
        }
        </>
    )

};


export default Posts;
