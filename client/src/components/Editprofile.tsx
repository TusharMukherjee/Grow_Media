import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logIn, userLoginInfo } from '../features/UserSlice'
import { EDITPROFILE_MUTATION, DELETE_PROFILE, LOG_OUT, UPDATEPFP } from '../gqlQueries/mutations/Allmutation'
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

const Editprofile:React.FC = () => {
    const dispatchJwt = useDispatch();

    // const [username, setUsername] = useState<string>();
    const [selectedImage, setSelectedImage] = useState<ArrayBuffer | string | null>("");
    const [grpData, setgrpData] = useState({
        bio:"",
        link:"",
        qualification:"",
        work:"",
        college:"",
        hometown: ""
    })

    const [delCover, setDelCover] = useState<boolean>(false);

    const [tologout, settologout] = useState<boolean>(false);

    const selector:selectortype = useSelector(userLoginInfo);
    // console.log(selector);
    const {data} = useQuery<infoquery, queryvar>(EDIT_QUERY,{ onCompleted(data){
        console.log(data);
        // setUsername(`${data.infoquery[0].username}`);
        (data?.infoquery[0]?.bio === undefined || data?.infoquery[0]?.bio === null )?setgrpData(prevData => ({ ...prevData, bio:""})):setgrpData(prevData => ({ ...prevData, bio:`${data?.infoquery[0]?.bio}`}));
        (data?.infoquery[0]?.link === undefined || data?.infoquery[0]?.link === null )?setgrpData(prevData => ({ ...prevData, link:""})):setgrpData(prevData => ({ ...prevData, link:`${data?.infoquery[0]?.link}`}));
        (data?.infoquery[0]?.usersExtraInfo[0]?.qualification === undefined )?setgrpData(prevData => ({ ...prevData, qualification:""})):setgrpData(prevData => ({ ...prevData, qualification:`${data?.infoquery[0]?.usersExtraInfo[0]?.qualification}`}));
        (data?.infoquery[0]?.usersExtraInfo[0]?.work===undefined )?setgrpData(prevData => ({ ...prevData, work:""})):setgrpData(prevData => ({ ...prevData, work:`${data?.infoquery[0]?.usersExtraInfo[0]?.work}`}));
        (data?.infoquery[0]?.usersExtraInfo[0]?.college===undefined)?setgrpData(prevData => ({ ...prevData, college:""})):setgrpData(prevData => ({ ...prevData, college:`${data?.infoquery[0]?.usersExtraInfo[0]?.college}`}));
        (data?.infoquery[0]?.usersExtraInfo[0]?.hometown===undefined)?setgrpData(prevData => ({ ...prevData, hometown:""})):setgrpData(prevData => ({ ...prevData, hometown:`${data?.infoquery[0]?.usersExtraInfo[0]?.hometown}`}));
    } ,variables:{infoqueryId: Number(selector.user_id)}});

    const [updateBio,{loading:loadingbio}] = useMutation (EDITPROFILE_MUTATION,{
        onCompleted(){
            navigate(`/profile/about/${selector.user_id}`)
        },
        variables: { userId: selector.user_id, bio: grpData.bio.trim(), link: grpData.link.trim(), qualification: grpData.qualification.trim(), hometown: grpData.hometown.trim(), work: grpData.work.trim(), college: grpData.college.trim()}
    });

    const [updatePfp] = useMutation(UPDATEPFP,{
        onCompleted:()=>{
            navigate(`/profile/${selector.user_id}`);
        },
        variables:{
            bImage:selectedImage,
            userId: selector.user_id
        }
    })

    const navigate = useNavigate();

    const [calllogout] = useMutation(LOG_OUT,{
        onCompleted:(data)=>{
            settologout(data?.logout);
        }
    });

    const [calldelete] = useMutation(DELETE_PROFILE,{
        onCompleted:()=>{
            calllogout();
        },
        variables:{
            userId: selector.user_id
        }
    });

    useEffect(()=>{
        if(tologout){
            navigate('/login');
            dispatchJwt(logIn(undefined));
        }
    },[tologout,dispatchJwt,navigate]);

    // console.log(tologout);

    function imagePreview(e: React.ChangeEvent<HTMLInputElement>){
        if(e.target.files){
            // console.log(typeof(e.target.files[0]));
            // getImageURL(file);
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onloadend = () => {
                setSelectedImage(reader.result);
                // console.log(reader.result);
            };
        }
    }

    useEffect(()=>{

        if(selectedImage!==""){
            updatePfp();
            // console.log("useEff Edit");
        }

    },[selectedImage,updatePfp]);

    // function getImageURL(file: File){
        
    // }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
		const { name, value } = e.target;
        console.log(e.target.value);
		setgrpData({
			...grpData,
			[name]: value,
		});
	};



    function delToggelOff(){
        setDelCover(false);
    }
    function delToggelOn(){
        setDelCover(true);
    }
    

  return (
      <>
      {
      
                    (loadingbio)?
                    <div className=' z-30 h-screen w-full bg-white grid place-items-center fixed'>
                        <h1 className=' z-40 text-xl'>Updating...</h1>
                    </div>
                    :
                    (delCover && 
                        <>
          
                            <div className=' h-screen w-screen top-0 z-30 fixed opacity-70 bg-gray-800'>
                            </div>
                            <div onClick={delToggelOff} className=' h-screen w-screen flex justify-center items-center top-0 fixed z-40'>
                                <div className='bg-white py-5 w-80 sm:h-1/6 sm:w-2/4 rounded-md border-[0.75px] border-gray-600'>
                                    <div className=' h-full w-full flex justify-center items-center'>
                                        <div className=' flex flex-col'>
                                            <h1 className=' mb-8 text-center text-lg text-red-500'>Are you sure you want to delete your account?</h1>
                                            <div className='flex flex-row justify-center justify-items-center sm:self-end'>
                                                <button onClick={delToggelOff} className=' border border-teal-500 rounded-md mr-5 p-1 bg-white hover:bg-gray-300 shadow-md  w-16'>
                                                    No
                                                </button>
                                                <button onClick={()=>calldelete()} className=' border rounded-md ml-5 p-1 bg-teal-500 hover:bg-teal-700 text-white  shadow-md w-16'>
                                                    Yes
                                                </button>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </div>

                        </>)
                }
            <div className='grid grid-cols-8 '> <Sidebar/> <div className=' col-span-8 sm:col-span-8 lg:col-start-3 lg:col-span-6 flex flex-col sm:mt-20'>
                <div className=' flex justify-center items-center h-full'>
                    <div className=' mb-24 w-screen sm:w-3/4 sm:border-[1px] sm:border-teal-500 sm:rounded-md flex flex-col justify-center items-center'>
                        <div className=' w-full sm:w-3/4 grid gap-8 p-5'>
                        <div>
                                <div>
                                    <h1 className='text-2xl font-semibold'>{data?.infoquery[0]?.username}</h1>
                                    <label htmlFor="imageinput" className=' cursor-pointer text-blue-700'>Change profile photo</label>
                                    <input onChange={imagePreview} className='hidden' type="file" accept=".gif,.jpg,.jpeg,.png" id='imageinput' />
                                </div>
                            </div>
                            <div className='sm:pl-4'>
                                <div className='flex flex-row justify-between w-full sm:w-10/12'>
                                    <label className='col-span-1' htmlFor="bio">Bio</label>
                                    <textarea maxLength={149} placeholder='Bio' name='bio' value= {grpData.bio} onChange={(e)=>handleChange(e)} id='bio'  className=' bg-slate-200 text-sm resize-none h-24 px-3 pt-2 w-48 rounded-md border-[1px] border-gray-400 focus:border-teal-500 outline-0 col-span-1'/>
                                </div>
                            </div>
                            <div className='sm:pl-4'>
                                <div className='flex flex-row justify-between w-full sm:w-10/12'>
                                    <label className='col-span-1' htmlFor="website">Website</label>
                                    <input maxLength={149} placeholder='Website' name='link' value= {grpData.link} onChange={(e)=>handleChange(e)} type="text" id='website'  className=' text-blue-800 px-3 w-48 text-sm rounded-md h-8 border-[1px] border-gray-400 focus:border-teal-500 bg-slate-200 outline-0 col-span-1'/>
                                </div>
                            </div> 
                        </div>
                            <div className='w-full sm:w-3/4 grid gap-8 p-5'>
                                <div className='flex flex-row justify-between w-full sm:w-10/12'>
                                    <h1 className='text-xl'>About</h1>
                                </div>
                                        <div className=' sm:pl-4 flex flex-row justify-between w-full sm:w-10/12'>
                                            <label className='col-span-1' htmlFor="qualificaton">Qualification</label>
                                            <input maxLength={9} placeholder='Qualification' name='qualification' value= {grpData.qualification} onChange={(e)=>handleChange(e)} type="text" id='qualificaton'  className=' px-3 w-48 text-sm rounded-md h-8 border-[1px] border-gray-400 focus:border-teal-500 bg-slate-200 outline-0 col-span-1'/>
                                        </div>
                                        <div className=' sm:pl-4 flex flex-row justify-between w-full sm:w-10/12'>
                                            <label className='col-span-1' htmlFor="work">Work</label>
                                            <input maxLength={14} placeholder='Work' name='work' value= {grpData.work} onChange={(e)=>handleChange(e)} type="text" id='work' className=' px-3 w-48 text-sm rounded-md h-8 border-[1px] border-gray-400 focus:border-teal-500 bg-slate-200 outline-0 col-span-1'/>
                                        </div>
                                        <div className=' sm:pl-4 flex flex-row justify-between w-full sm:w-10/12'>
                                            <label className='col-span-1' htmlFor="college">College</label>
                                            <input maxLength={14} placeholder='College' name='college' value= {grpData.college} onChange={(e)=>handleChange(e)} type="text" id='college' className=' px-3 w-48 text-sm rounded-md h-8 border-[1px] border-gray-400 focus:border-teal-500 bg-slate-200 outline-0 col-span-1'/>
                                        </div>
                                        <div className=' sm:pl-4 flex flex-row justify-between w-full sm:w-10/12'>
                                            <label className='col-span-1' htmlFor="hometown">Hometown</label>
                                            <input maxLength={14} placeholder='Hometown' name='hometown' value= {grpData.hometown} onChange={(e)=>handleChange(e)} type="text" id='hometown' className=' px-3 w-48 text-sm rounded-md h-8 border-[1px] border-gray-400 focus:border-teal-500 bg-slate-200 outline-0 col-span-1'/>
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