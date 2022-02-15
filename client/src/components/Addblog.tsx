import React from 'react'
import { useState } from 'react';
import {Removeclose} from '../Icons/Removeclose'

const Addblog:React.FC = () => {

    const [selectedImage, setSelectedImage] = useState<ArrayBuffer | string | null>();

    const imageFile:Element | null = document.querySelector('#imageinput');
    

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
        };
    }
    
    // function imagePreview(e: React.ChangeEvent<HTMLInputElement>){
    //     console.log(e.target.files);
    //     if(e.target.files && e.target.files.length > 0){
    //         setSelectedImage(e.target.files[0]);
    //         console.log(selectedImage);
    //     }
    // }

    


  return (
    <div className='grid grid-cols-8'>
        <div className=' col-start-2 col-span-6 grid gap-4 rounded-md shadow-md shadow-teal-300'>
                <textarea name="" id="" className=' resize-none outline-0 w-full p-4 text-3xl font-bold'  placeholder='Your Heading'></textarea>
                {selectedImage
                    ? 
                        (<div className='flex justify-center items-center bg-red-300'>
                            <div className="">
                              <Removeclose/>  
                            </div>
                            
                            {/* <img src={selectedImage as string} alt="" id = "imageHere" className=' object-cover h-56 my-8'/> */}
                        </div>
                        )
                    :
                        (<>
                        <label htmlFor="imageinput" className=' my-8 cursor-pointer flex justify-center items-center h-44 bg-gray-100'>
                            <div className=' border border-dashed border-gray-500 rounded-md w-52 h-32 flex justify-center items-center'>
                                Add Photo
                            </div>
                        </label>
                        <input className='hidden' type="file" accept=".gif,.jpg,.jpeg,.png" id='imageinput' onChange={imagePreview}/>
                        </>)
                }
                <textarea name="" id="" className=' resize-none outline-0 w-full p-4 text-xl h-80' placeholder='Blog-content'></textarea>
                <div className="grid justify-end py-8 px-12 ">
                    <button className='bg-teal-500 text-white px-2 py-1 rounded-md'>Create</button>
                </div>
        </div>
    </div>
  )
}

export default Addblog