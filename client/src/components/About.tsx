import { useQuery } from '@apollo/client'
import React from 'react'
import { useSelector } from 'react-redux'
import { userLoginInfo } from '../features/UserSlice'
import { EDIT_QUERY } from '../gqlQueries/queries/Explorequery'

type selectortype = {
    user_id:string
}

type infoquery = {
    infoquery: [allInfo]
}

type allInfo = {
    user_id: number
    username: String
    bio: String,
    link: String,
    usersExtraInfo: [usersExtraInfo]
}
type usersExtraInfo = {
    qualification: String,
    hometown: String,
    work: String,
    college: String
}

const About:React.FC = () => {

    const selector:selectortype = useSelector(userLoginInfo);

    const {data} = useQuery<infoquery>(EDIT_QUERY,{variables:{infoqueryId: Number(selector.user_id)}});

  return (
    <div className='col-start-2 col-span-6 grid grid-cols-8 my-12'> 
    <div className='bg-white  col-start-3 col-span-4 grid gap-1 border-[1px] border-gray-300 rounded-md px-5'>
        <div className='px-12 py-5'>
            <h1 className='text-2xl mb-5'>Hometown</h1>
            <span className='bg-teal-500 text-white rounded-md py-1 px-2 text-sm'>{data?.infoquery[0].usersExtraInfo[0].hometown}</span>
        </div>
        <hr />
        <div className='px-12 py-5'>
            <h1 className='text-2xl mb-5'>Qualification</h1>
            <span className='bg-teal-500 text-white rounded-md py-1 px-2 text-sm'>{data?.infoquery[0].usersExtraInfo[0].qualification}</span>
        </div>
        <hr />
        <div className='px-12 py-5'>
            <h1 className='text-2xl mb-5'>Work</h1>
            <span className='bg-teal-500 text-white rounded-md py-1 px-2 text-sm'>{data?.infoquery[0].usersExtraInfo[0].work}</span>
        </div>
        <hr />
        <div className='px-12 py-5'>
            <h1 className='text-2xl mb-5'>College</h1>
            <span className='bg-teal-500 text-white rounded-md py-1 px-2 text-sm'>{data?.infoquery[0].usersExtraInfo[0].college}</span>
        </div>
    </div>
    </div>
  )
}

export default About