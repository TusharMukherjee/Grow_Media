import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar';
import {useMutation} from '@apollo/client';
import {CREATE_POST} from '../gqlQueries/mutations/Allmutation';
import { useSelector } from 'react-redux'
import { userLoginInfo } from '../features/UserSlice'

type selectortype = {
    user_id:string
}

const Addblog:React.FC = () => {

    const navigate = useNavigate();

    const [selectedImage, setSelectedImage] = useState<ArrayBuffer | string | null>("");
    const [heading, setHeading] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [headingCount, setHeadingCount] = useState<number |  null>(75);
    const [bodyCount, setBodyCount] = useState<number |  null>(1000);

    const selector:selectortype = useSelector(userLoginInfo);

    const [createPost, {loading}] = useMutation(CREATE_POST,{
        onCompleted:() => {
            navigate('/home');
            return "posted"
        },
        onError:(error) => {
            console.log(error.message);
        },
        variables:{
            userId:selector.user_id,
            blogHeading: heading,
            blogContent: content,
            blogImage: selectedImage
        }
    })

    function checkHeadingCount(e: React.ChangeEvent<HTMLTextAreaElement>){
        setHeadingCount(75 - e?.target.value.length);
    }

    function checkBodyCount(e: React.ChangeEvent<HTMLTextAreaElement>){
        setBodyCount(1000 - e?.target.value.length);
    }
    

    function imagePreview(e: React.ChangeEvent<HTMLInputElement>){
        if(e.target.files){
            console.log(typeof(e.target.files[0]));
            const file = e.target.files[0];
            getImageURL(file);
        }
    }

    function getImageURL(file: File){
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setSelectedImage(reader.result);
            console.log(reader.result);
        };
    }
    

    function removeImageSelection(){
        setSelectedImage('');
    }

  return (
           (loading)
            ?
                <div className=' z-30 h-screen w-full bg-white grid place-items-center fixed'>
                    <h1 className=' z-40 text-xl'>Uploading...</h1>
                </div>
            :     
    <div className='grid grid-cols-8'> <Sidebar/> <div className='col-start-3 col-span-6 flex flex-col py-8 h-full'>
    <div className='grid grid-cols-8'>
        <div className=' col-start-2 col-span-6 grid gap-4 rounded-md shadow-md shadow-teal-300'>
                <textarea id="headingTextArea" maxLength={75} onChange={(e) => setHeading((e.target.value).trim())} onInput={checkHeadingCount} className=' resize-none outline-0 w-full p-4 text-3xl font-bold'  placeholder='Your Heading'></textarea>
                {
                    (headingCount! >= 1)?
                    <div className=' w-full flex justify-end py-2 pr-16 bg-white'>
                        <span className=' text-green-500 text-base' id='colorClass'>{headingCount}</span>
                    </div>
                    :
                    <div className=' w-full flex justify-end py-2 pr-16 bg-white'>
                        <span className=' text-red-500 text-base' id='colorClass'>{headingCount}</span>
                    </div>
                }
                
                {selectedImage
                    ? 
                        (<div className='grid justify-center items-center bg-white'>
                            <div className=' grid justify-center items-center'>
                                <img src={selectedImage as string} alt="" id = "imageHere" className=' z-0 object-cover h-56 mt-8'/>
                                <div className='cursor-pointer mb-8'>
                                    <button className='bg-teal-500 text-white px-2 py-1 rounded-b w-full' onClick={removeImageSelection} >Remove</button>
                                </div>
                            </div>
                            
                        </div>
                        )
                    :
                        (<>
                            {/* <label htmlFor="imageinput"  id='dropArea' className=' my-8 cursor-pointer flex justify-center items-center h-44 bg-gray-100'> */}
                                <div className=' my-8  flex justify-center items-center h-44 bg-gray-100' >
                                    <input className=' cursor-pointer z-20 absolute w-[40rem] opacity-0 h-44 flex justify-center items-center' type="file" accept=".jpg,.jpeg,.png" id='imageinput' onChange={imagePreview}/>
                                    <div className=' relative z-10 bg-transparent border self-center border-dashed border-gray-500 rounded-md w-52 h-32 flex justify-center items-center'>
                                        Add Photo
                                    </div>
                                </div>
                                
                            {/* </label> */}
                        
                        
                        </>)
                }
                <textarea onKeyDownCapture={(e) => e.key === 'Enter' && createPost()} name="content" className=' resize-none outline-0 w-full p-4 text-xl h-80' onChange={(e) => setContent((e.target.value).trim())} onInput={checkBodyCount} placeholder='Blog-content' maxLength={1000}></textarea>
                <div className="flex flex-row justify-between py-8 px-12">
                    {
                        (bodyCount! >= 1)?
                        <span className=' text-green-500 text-base' id='colorbClass'>{bodyCount}</span>
                        :
                        <span className=' text-red-500 text-base' id='colorbClass'>{bodyCount}</span>
                    }
                    
                    {
                        ((headingCount! >= 1 && bodyCount! >= 1) && (headingCount! !== 75 && bodyCount! !== 1000) && selectedImage !== "")?
                        <button onClick={()=>createPost()} className='bg-teal-500 text-white px-2 py-1 rounded-md' id='createButton'>Create</button>
                        :
                        <button className='bg-teal-500 text-white px-2 py-1 rounded-md' id='createButton' disabled>Create</button>
                    }
                    
                </div>
        </div>
    </div>
    </div>
    </div>
  )
}

export default Addblog