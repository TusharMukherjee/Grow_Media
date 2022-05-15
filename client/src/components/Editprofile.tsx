import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userLoginInfo } from '../features/UserSlice'
import { EDITPROFILE_MUTATION, DELETE_PROFILE, LOG_OUT } from '../gqlQueries/mutations/Allmutation'
import { EDIT_QUERY } from '../gqlQueries/queries/Explorequery'
import Sidebar from './Sidebar'

type selectortype = {
    user_id:string
}

type queryvar = {
    infoqueryId:number
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

type mutationVAR = {
    user_id: number
    bio: String,
    link: String,
    qualification: String,
    hometown: String,
    work: String,
    college: String
}

const Editprofile:React.FC = () => {

    // const [username, setUsername] = useState<string>();
    const [bio, setBio] = useState<string>();
    const [link, setLink] = useState<string>();
    const [qualification, setQualification] = useState<string>();
    const [work, setWork] = useState<string>();
    const [college, setCollege] = useState<string>();
    const [hometown, setHometown] = useState<string>();

    const [delCover, setDelCover] = useState<boolean>(false);

    const [tologout, settologout] = useState<boolean>(false);
    const [checkB,setCheckB] = useState<boolean>(false);

    const selector:selectortype = useSelector(userLoginInfo);
    console.log(selector);
    const {data} = useQuery<infoquery, queryvar>(EDIT_QUERY,{ onCompleted(data){
        // setUsername(`${data.infoquery[0].username}`);
        setBio(`${data?.infoquery[0].bio}`);
        setLink(`${data?.infoquery[0].link}`);
        setQualification(`${data?.infoquery[0].usersExtraInfo[0].qualification}`);
        setWork(`${data?.infoquery[0].usersExtraInfo[0].work}`);
        setCollege(`${data?.infoquery[0].usersExtraInfo[0].college}`);
        setHometown(`${data?.infoquery[0].usersExtraInfo[0].hometown}`);
    } ,variables:{infoqueryId: Number(selector.user_id)}});

    const [updateBio, {loading}] = useMutation (EDITPROFILE_MUTATION,{
        variables: {userId: selector.user_id, bio: bio, link: link, qualification: qualification, hometown: hometown, work: work, college: college}
    });
    const navigate = useNavigate();

    const [calllogout] = useMutation(LOG_OUT,{
        onCompleted(data){
            settologout(data);
        }
    });

    // const handleLogout = () => {
    //     calllogout();
    // }

    useEffect(()=>{
        if(tologout){
            navigate('/login');
        }
    },[tologout]);

    console.log(data);

    function delToggelOff(){
        setDelCover(false);
    }
    function delToggelOn(){
        setDelCover(true);
    }
    

  return (
      <>
      {
                    (delCover && 
                        <>
          
                            <div className=' h-screen w-screen top-0 z-30 fixed opacity-70 bg-gray-800'>
                            </div>
                            <div onClick={delToggelOff} className=' h-screen w-screen flex justify-center items-center top-0 fixed z-40'>
                                <div className='bg-white h-1/3 w-1/3 rounded-md border-[0.75px] border-gray-600'>
                                    <div className=' h-full w-full flex justify-center items-center'>
                                        <div className=' flex flex-col'>
                                            <h1 className=' mb-8 text-lg text-red-500'>Are you sure you want to delete your account?</h1>
                                            <div className=' self-end'>
                                                <button onClick={delToggelOff} className=' border border-teal-500 rounded-md mr-5 p-1 bg-white hover:bg-gray-300 shadow-md  w-16'>
                                                    No
                                                </button>
                                                <button onClick={()=>calllogout()} className=' border rounded-md ml-5 p-1 bg-teal-500 hover:bg-teal-700 text-white  shadow-md w-16'>
                                                    Yes
                                                </button>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </div>

                        </>)
                }
            <div className='grid grid-cols-8 '> <Sidebar/> <div className='col-start-3 col-span-6 flex flex-col my-8'>
                <div className=' p-8 flex justify-center items-center h-full'>
                    <div className=' w-3/4 border-[1px] border-teal-500 rounded-md flex flex-col justify-center items-center'>
                        <div className=' w-3/4 grid gap-8 p-5'>
                        <div className=''>
                                <div>
                                    <h1 className='text-2xl font-semibold'>{data?.infoquery[0].username}</h1>
                                    <label htmlFor="imageinput" className=' cursor-pointer text-blue-700'>Change profile photo</label>
                                    <input className='hidden' type="file" accept=".gif,.jpg,.jpeg,.png" id='imageinput' />
                                </div>
                            </div>
                            <div className='pl-4'>
                                <div className='flex flex-row justify-between w-10/12'>
                                    <label className='col-span-1' htmlFor="bio">Bio</label>
                                    <textarea value= {`${bio}`} onChange={e => {setBio(e.target.value)}} id='bio'  className=' bg-slate-200 text-sm resize-none h-24 px-3 pt-2 w-48 rounded-md border-[1px] border-gray-400 focus:border-teal-500 outline-0 col-span-1'/>
                                </div>
                            </div>
                            <div className='pl-4'>
                                <div className='flex flex-row justify-between w-10/12'>
                                    <label className='col-span-1' htmlFor="website">Website</label>
                                    <input value= {`${link}`} onChange={e => {setLink(e.target.value)}} type="text" id='website'  className=' px-3 w-48 rounded-md h-8 border-[1px] border-gray-400 focus:border-teal-500 bg-slate-200 outline-0 col-span-1'/>
                                </div>
                            </div> 
                        </div>
                            <div className=' w-3/4 grid gap-8 p-5'>
                                <div className='flex flex-row justify-between w-10/12'>
                                    <h1 className='text-xl'>About</h1>
                                </div>
                                        <div className=' pl-4 flex flex-row justify-between w-10/12'>
                                            <label className='col-span-1' htmlFor="qualificaton">Qualification</label>
                                            <input value= {`${qualification}`} onChange={e => {setQualification(e.target.value)}} type="text" id='qualificaton'  className=' px-3 w-48 rounded-md h-8 border-[1px] border-gray-400 focus:border-teal-500 bg-slate-200 outline-0 col-span-1'/>
                                        </div>
                                        <div className=' pl-4 flex flex-row justify-between w-10/12'>
                                            <label className='col-span-1' htmlFor="work">Work</label>
                                            <input value= {`${work}`} onChange={e => {setWork(e.target.value)}} type="text" id='work' className=' px-3 w-48 rounded-md h-8 border-[1px] border-gray-400 focus:border-teal-500 bg-slate-200 outline-0 col-span-1'/>
                                        </div>
                                        <div className=' pl-4 flex flex-row justify-between w-10/12'>
                                            <label className='col-span-1' htmlFor="college">College</label>
                                            <input value= {`${college}`} onChange={e => {setCollege(e.target.value)}} type="text" id='college' className=' px-3 w-48 rounded-md h-8 border-[1px] border-gray-400 focus:border-teal-500 bg-slate-200 outline-0 col-span-1'/>
                                        </div>
                                        <div className=' pl-4 flex flex-row justify-between w-10/12'>
                                            <label className='col-span-1' htmlFor="hometown">Hometown</label>
                                            <input value= {`${hometown}`} onChange={e => {setHometown(e.target.value)}} type="text" id='hometown' className=' px-3 w-48 rounded-md h-8 border-[1px] border-gray-400 focus:border-teal-500 bg-slate-200 outline-0 col-span-1'/>
                                        </div>
                            </div>
                            <div className=' w-3/4 grid gap-8 p-3 m-6'>
                                <div className='flex flex-row justify-between w-10/12'>
                                    <button onClick={delToggelOn} className=' px-2 py-1 bg-red-500 hover:bg-red-700 text-white rounded-md'>Delete Account</button>
                                    <button onClick={()=>updateBio()} className=' px-2 py-1 bg-teal-500 hover:bg-teal-700 text-white rounded-md'>Update</button>
                                </div>
                            </div>

                    </div>
                </div>
                    
                </div>
            </div>
            </>
  )
}

export default Editprofile