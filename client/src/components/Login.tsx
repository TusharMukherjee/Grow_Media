import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Rootpage from './Rootpage'
import {useAuth} from './Auth'

const Login = () => {
  
    const auth = useAuth();
    const [user, setUser] = useState<string | undefined>();
    // const [password, setPassword] = useState<string>();
    const navigate = useNavigate();

    const handleLogin = () => {
        auth?.login(user);
        navigate('/home', {replace: true});
    }

    return (

    <main className='grid grid-cols-7 h-screen' >
        <section className=' col-span-3 bg-teal-500 grid place-content-center '>
            <Rootpage/>
        </section>
        <section className='col-span-4 grid place-content-center'>
            <div className=' bg-white border-[0.25px] h-full w-80 border-gray-300 rounded-md shadow-md   '>
                <div className=' grid place-content-center py-5'>
                    <h1 className=' font-light text-teal-500 text-2xl text-center mb-8 '>Log In</h1>
                    <div className=" my-5">
                        <input type="text" onChange={(e) => setUser(e.target.value)} placeholder='Name' className=' bg-gray-200 text-gray-900 h-9 rounded-md outline-0 p-2' />
                    </div>
                    <div className=" my-5">
                        <input type="password" placeholder='Password' className=' bg-gray-200 text-gray-900 h-9 rounded-md outline-0 p-2' />
                    </div>
                    <div className=" mt-5 flex justify-around">
                        <Link to="/" className=' text-blue-700'>
                            <button>
                                Sign Up?
                            </button>
                        </Link>
                        <button onClick={handleLogin} className=' bg-teal-500 rounded-md outline-0 hover:bg-teal-700 text-white py-1 px-2 '>
                            Log in
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </main>
  )
}

export default Login