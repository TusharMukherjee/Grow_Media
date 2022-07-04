import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Rootpage from './Rootpage'
import { SIGN_UP_MUTATION } from '../gqlQueries/mutations/Allmutation'
import { useMutation } from '@apollo/client';

type mutationType = {
    user_id: Number
    username: String
    email: String
    password: String
}

type mutationVar = {
    input:{
        username:String;
        email: String;
        password: String;
    }
}

const Signup = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<boolean>(false);

    const emailRegex = RegExp(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      );
    
    const navigate = useNavigate();

    const [addSignUpInfo,{loading}] = useMutation<{
        createUser: mutationType,
        input: mutationVar
    }>(SIGN_UP_MUTATION,
        {
            onCompleted:() => {
                navigate('/login');
            },
            onError:(error) => {
                console.log(error.message);
            },
            variables:{
                input:{
                    username,
                    email,
                    password
                }
            }
        }
    );

    if (loading) console.log("loading");

    const Sign_up_the_user = async() =>{
        if(email.trim().replace(/\s/g, '').match(emailRegex)){
            setEmailError(false);
            addSignUpInfo();
        }
        else{
            setEmailError(true);
            console.log("email not authorized")
        }
    }


  return (
    <main className='grid grid-cols-7 grid-rows-6 h-screen w-screen' >
        <section className=' hidden row-span-2 col-span-7 lg:row-span-6 lg:col-start-1 lg:col-span-3 lg:w-full w-screen h-full lg:h-screen lg:rounded-none rounded-b-full bg-teal-500 lg:grid place-content-center '>
            <Rootpage/>
        </section>
        <section className='  row-span-6 col-span-7 lg:col-span-4 lg:row-span-6 w-screen lg:w-full h-full grid place-content-center '>
            <div className=' lg:hidden sm:z-0 z-0 sm:fixed fixed sm:top-0 top-0 w-screen h-1/2 sm:rounded-b-full rounded-b-full col-span-3 bg-teal-500 grid place-content-center'>
            </div>
            <div className=' bg-white border-[0.25px] h-auto w-auto border-gray-300 rounded-md shadow-md z-10 sm:z-10'>
                <div className=' grid place-content-center py-5 sm:gap-4 gap-1'>
                    <h1 className=' font-light text-teal-500 sm:text-4xl text-2xl lg:text-2xl text-center sm:mb-8 lg:mb-6 mb-6 '>Sign Up</h1>
                    <div className=" my-5 lg:my-2">
                        <input type="text" onChange={(e) => setUsername((e.target.value).trim().replace(/\s/g, ''))} placeholder='Username' className=' bg-gray-200 text-gray-900 text-sm sm:text-lg lg:text-base sm:h-12 lg:h-10 h-8 sm:w-80 w-60 lg:w-60 sm:mx-10 lg:mx-6 mx-6 rounded-md outline-0 p-2' required/>
                    </div>
                    <div className=" my-5 lg:my-2">
                        <input type="email" onChange={(e) => setEmail((e.target.value).trim().replace(/\s/g, ''))} placeholder='Email' className=' bg-gray-200 text-gray-900 text-sm sm:text-lg lg:text-base sm:h-12 lg:h-10 h-8 sm:w-80 w-60 lg:w-60 sm:mx-10 lg:mx-6 mx-6 rounded-md outline-0 p-2' required/>
                    </div>
                    <div className=" my-5 lg:my-2">
                        <input onKeyDownCapture={(e) => e.key === 'Enter' && Sign_up_the_user()} type="password" onChange={(e) => setPassword((e.target.value).trim())} placeholder='Password' className=' bg-gray-200 text-gray-900 text-sm sm:text-lg lg:text-base sm:h-12 lg:h-10 h-8 sm:w-80 w-60 lg:w-60 sm:mx-10 lg:mx-6 mx-6 rounded-md outline-0 p-2' required/>
                    </div>
                    <div className=" text-sm sm:text-lg lg:text-base mt-5 flex justify-around">
                        <Link to="/login" className=' text-blue-700'>
                            <button>
                                Log in?
                            </button>
                        </Link>
                        <button onClick={() => Sign_up_the_user()} className=' bg-teal-500 rounded-md outline-0 hover:bg-teal-700 text-white py-1 px-2 '>
                            Sign Up
                        </button>
                    </div>
                    {(emailError)?(<><p className=' text-red-600 mt-5 w-full text-center sm:text-lg lg:text-sm text-sm' >Email not recognized</p></>):(<></>)}
                </div>
            </div>
        </section>
    </main>
  )
}

export default Signup