import React from 'react'

const Addblog:React.FC = () => {
  return (
    <div className='grid grid-cols-12 my-9'>
        <div className=' col-start-3 col-span-8 h-[44rem]'>
            <div className=' grid h-auto gap-4 rounded-md shadow-lg shadow-teal-300'>
                <textarea name="" id="" className=' resize-none outline-0 w-full p-4 text-3xl font-bold'  placeholder='Your Heading'></textarea>
                <label htmlFor="imageinput" className=' my-8 cursor-pointer flex justify-center items-center h-44 bg-gray-100'>
                    <div className=' border border-dashed border-gray-500 rounded-md w-52 h-32 flex justify-center items-center'>
                        Add Photo
                    </div>
                </label>
                <input className='hidden' type="file" accept=".gif,.jpg,.jpeg,.png" id='imageinput'/>
                <textarea name="" id="" className=' resize-none outline-0 w-full p-4 text-xl h-80' placeholder='Blog-content'></textarea>
            </div>
        </div>
    </div>
  )
}

export default Addblog