import { useQuery } from '@apollo/client'
import React from 'react'
import { useParams } from 'react-router-dom'
import { EDIT_QUERY } from '../gqlQueries/queries/Explorequery'
import Sidebar from './Sidebar'

type infoquery = {
    infoquery: [allInfo]
}

type allInfo = {
    user_id: number
    username: String
    bio: String,
    link: String,
    usersExtraInfo: [usersExtraInfo | undefined]
}
type usersExtraInfo = {
    qualification: String,
    hometown: String,
    work: String,
    college: String
}

const About:React.FC = () => {
    const {profile_id} = useParams();

    const {data} = useQuery<infoquery>(EDIT_QUERY,{variables:{infoqueryId: Number(profile_id)}});
    console.log(data);

  return (
    <div className='col-start-2 col-span-6 grid grid-cols-8 my-12'> 
    <Sidebar/>
    <div className='bg-white  col-start-3 col-span-4 grid gap-1 border-[1px] border-gray-300 rounded-md px-5'>
        <div className='px-12 py-5'>
            <h1 className='text-2xl mb-5'>Hometown</h1>
            {
                (data?.infoquery[0].usersExtraInfo[0]?.hometown === undefined || data?.infoquery[0].usersExtraInfo[0]?.hometown === "")
                ?
                <span className='bg-teal-500 text-white rounded-md py-1 px-2 text-sm'>Information not given by user</span>
                :
                <span className='bg-teal-500 text-white rounded-md py-1 px-2 text-sm'>{data?.infoquery[0].usersExtraInfo[0]?.hometown}</span>
            }
            
        </div>
        <hr />
        <div className='px-12 py-5'>
            <h1 className='text-2xl mb-5'>Qualification</h1>
            {
                (data?.infoquery[0].usersExtraInfo[0]?.qualification === undefined || data?.infoquery[0].usersExtraInfo[0]?.qualification === "")
                ?
                <span className='bg-teal-500 text-white rounded-md py-1 px-2 text-sm'>Information not given by user</span>
                :
                <span className='bg-teal-500 text-white rounded-md py-1 px-2 text-sm'>{data?.infoquery[0].usersExtraInfo[0]?.qualification}</span>
            }
        </div>
        <hr />
        <div className='px-12 py-5'>
            <h1 className='text-2xl mb-5'>Work</h1>
            {
                (data?.infoquery[0].usersExtraInfo[0]?.work === undefined || data?.infoquery[0].usersExtraInfo[0]?.work === "")
                ?
                <span className='bg-teal-500 text-white rounded-md py-1 px-2 text-sm'>Information not given by user</span>
                :
                <span className='bg-teal-500 text-white rounded-md py-1 px-2 text-sm'>{data?.infoquery[0].usersExtraInfo[0]?.work}</span>
            }
        </div>
        <hr />
        <div className='px-12 py-5'>
            <h1 className='text-2xl mb-5'>College</h1>
            {
                (data?.infoquery[0].usersExtraInfo[0]?.college === undefined || data?.infoquery[0].usersExtraInfo[0]?.college === "")
                ?
                <span className='bg-teal-500 text-white rounded-md py-1 px-2 text-sm'>Information not given by user</span>
                :
                <span className='bg-teal-500 text-white rounded-md py-1 px-2 text-sm'>{data?.infoquery[0].usersExtraInfo[0]?.college}</span>
            }
        </div>
    </div>
    </div>
  )
}

export default About