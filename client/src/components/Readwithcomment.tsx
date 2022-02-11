import React from 'react'

const Readwithcomment:React.FC = () => {
  return (
    <div className='flex flex-col items-center'>
        <div className=' h-auto w-80 flex flex-col bg-white rounded-md'>
            <div className='flex flex-row items-center p-4'>
                <div className='bg-teal-900 h-20 w-20 rounded-md'></div>
                <div className='flex flex-col'>
                   <h1 className='pl-4'>Tushar Mukherjee</h1>
                   <p className='pl-4'>10K Followers</p> 
                </div>
            </div>
            <p className='px-4 pb-4'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. perferendis deleniti.</p>
            <div className='pl-4 pb-4'>
               <button className=' bg-teal-500 text-white px-2 py-1 rounded-md'>Follow</button> 
            </div>
        </div>

        <div className=' w-80 my-5 py-1 px-2 rounded-md'>
            <div className='grid grid-cols-2 gap-3'>
                <button className=' rounded-md py-1 px-2 col-span-1 bg-white'>
                    80 Likes
                </button>
                <button className=' rounded-md py-1 px-2 col-span-1 bg-white'>
                    12 Comm.
                </button>
            </div>
        </div>

        <div className='flex flex-col items-center'>
            <textarea className=' w-80 rounded-md resize-none my-4' name="" id="" cols={30} rows={5}></textarea>
            <div className='w-80 my-2 rounded-md bg-white'>
                <div className='flex flex-row p-4'>
                    <div className=' rounded-full h-6 w-6 bg-stone-700'></div>
                    <div className='ml-4'>
                        <h1>Tushar Mukherjee</h1>
                    </div>
                </div>
                <div className='px-4 pb-4'>
                    <p className='w-72'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur nesciunt eveniet est accusamus, officia inventore placeat cumque praesentium sit expedita.</p>
                </div>
                <div className='px-4 pb-4'>
                    <button className='px-2 py-1 rounded-md bg-teal-500 text-white'>12 Like</button>
                    <button className='px-2 py-1 ml-3 rounded-md bg-teal-500 text-white'>Reply</button>
                </div>
            </div>

            <div className='w-80 my-2 rounded-md bg-white flex flex-col justify-center'>
                <div className='flex flex-row p-4'>
                    <div className=' rounded-full h-6 w-6 bg-stone-700'></div>
                    <div className='ml-4'>
                        <h1>Tushar Mukherjee</h1>
                    </div>
                </div>
                <div className='px-4 pb-4'>
                    <p className='w-72'>Lorem ipsum dolor, nesciunt eveniet est accusamus, officia inventore placeat cumque praesentium sit expedita.</p>
                </div>
                <div className='px-4 pb-4'>
                    <button className='px-2 py-1 rounded-md bg-teal-500 text-white'>12 Like</button>
                    <button className='px-2 py-1 ml-3 rounded-md bg-teal-500 text-white'>3 Reply</button>
                </div>
                {/* reply cmnt */}
                <div className='flex flex-row ml-8'>
                    <div className=' rounded-full h-5 w-5 bg-stone-700'></div>
                    <div className='ml-2'>
                        <h1 className=' text-base font-semibold'>Tushar Mukherjee</h1>
                    </div>
                </div>
                <div className='pb-4'>
                    <p className=' text-sm pl-16 pr-4 w-72'>Lorem ipsum dolor, nesciunt eveniet est accusamus, officia inventore placeat cumque praesentium sit expedita.</p>
                </div>

                <div className='flex flex-row ml-8'>
                    <div className=' rounded-full h-5 w-5 bg-stone-700'></div>
                    <div className='ml-2'>
                        <h1 className=' text-base font-semibold'>Tushar Mukherjee</h1>
                    </div>
                </div>
                <div className='pb-4'>
                    <p className=' text-sm pl-16 pr-4 w-72'>Lorem ipsum dolor, nesciunt eveniet est accusamus, officia inventore placeat cumque praesentium sit expedita.</p>
                </div>

                <div className='flex flex-row ml-8'>
                    <div className=' rounded-full h-5 w-5 bg-stone-700'></div>
                    <div className='ml-2'>
                        <h1 className=' text-base font-semibold'>Tushar Mukherjee</h1>
                    </div>
                </div>
                <div className='pb-4'>
                    <p className=' text-sm pl-16 pr-4 w-72'>Lorem ipsum dolor, nesciunt eveniet est accusamus, officia inventore placeat cumque praesentium sit expedita.</p>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Readwithcomment