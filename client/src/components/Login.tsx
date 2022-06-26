import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Rootpage from './Rootpage'
import { useDispatch } from 'react-redux'
import { logIn } from '../features/UserSlice';
import { USER_LOGIN_INFO } from '../gqlQueries/mutations/Allmutation'
import { useSelector } from 'react-redux';
import { userLoginInfo } from '../features/UserSlice';
import { useMutation } from '@apollo/client'

type dataInfo= {
    userAuthenticationCheck : userAuthenticationCheck
}

type userAuthenticationCheck = {
    user_id: string;
    username: string;
    authorized: Boolean;
}

type AuthVar = {
    username:string;
    password: string;
}

const Login = () => {
    const dispatch = useDispatch();
    const selector = useSelector(userLoginInfo);

    const [user, setUser] = useState<string>('');
    const [loginPassword, setLoginPassword] = useState<string>('');
    const [errorPass,setErrorPass] = useState<boolean>(false);
    const [errorUser,setErrorUser] = useState<boolean>(false);
    const [emptyField,setEmptyField] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    
    const [callLogin,{loading}] = useMutation<dataInfo, AuthVar>(USER_LOGIN_INFO,{onCompleted(data){

         if(data?.userAuthenticationCheck.authorized === true){
            setIsLoading(loading);
            setErrorPass(false);
            setErrorUser(false);
            dispatch(logIn(
                {
                    user_id: Number(data.userAuthenticationCheck.user_id)
                }
            ));
            
            navigate('/home');
            
        }
        if(data?.userAuthenticationCheck.authorized === false){
            setErrorPass(true);
            setErrorUser(false);
            setEmptyField(false);
        }
        
    },onError(){
        if(!user || !loginPassword){
            setEmptyField(true);
        }
        else{
          setErrorUser(true);  
          setEmptyField(false);
          setErrorPass(false);
        }
    },variables:{username:user, password: loginPassword}});

    useEffect(()=>{
        if(selector){
            navigate('/home', {replace: true});
        }
    },[selector, navigate]);

    return (

    <main className='grid sm:grid-rows-6 sm:grid-cols-7 grid-cols-7 h-screen w-screen' >
        <section className=' sm:hidden sm:row-span-2 sm:col-span-7 w-screen h-full sm:rounded-b-full col-span-3 bg-teal-500 grid place-content-center '>
            <Rootpage/>
        </section>
        <section className=' sm:row-span-6 sm:col-span-7 w-screen h-full col-span-4 grid place-content-center'>
            <div className=' sm:z-0 sm:fixed sm:top-0 w-screen h-1/2 sm:rounded-b-full col-span-3 bg-teal-500 grid place-content-center '>
            </div>
            <div className=' bg-white border-[0.25px] h-auto w-auto border-gray-300 rounded-md shadow-md sm:z-10'>
                <div className=' grid place-content-center py-5 sm:gap-4'>
                    <h1 className=' font-light text-teal-500 sm:text-4xl text-2xl text-center mb-8 '>Log In</h1>
                    <div className=" my-5">
                        <input onKeyDownCapture={(e) => e.key === 'Enter' && callLogin()} type="text" onChange={(e) => setUser((e.target.value).trim())} placeholder='Name' className=' bg-gray-200 text-gray-900 sm:text-lg sm:h-12 sm:w-80 sm:mx-10 h-9 rounded-md outline-0 p-2' required/>
                    </div>
                    <div className=" my-5">
                        <input onKeyDownCapture={(e) => e.key === 'Enter' && callLogin()} type="password" onChange={(e)=> setLoginPassword((e.target.value))} placeholder='Password' className=' bg-gray-200 text-gray-900 sm:text-lg sm:h-12 sm:w-80 sm:mx-10 h-9 rounded-md outline-0 p-2' required/>
                    </div>
                    <div className=" sm:text-lg mt-5 flex justify-around">
                        <Link to="/" className=' text-blue-700'>
                            <button>
                                Sign Up?
                            </button>
                        </Link>
                        <button onClick={()=>callLogin()} className=' bg-teal-500 rounded-md outline-0 hover:bg-teal-700 text-white py-1 px-2 '>
                            Log in
                        </button>
                    </div>
                    {(isLoading)?(<><p className=' text-teal-600 mt-5 sm:w-full text-center sm:text-lg text-sm' >Logging In...</p></>):(<></>)}
                    {(errorPass)?<><p className=' text-red-600 mt-5 sm:w-full text-center sm:text-lg text-sm'>Password is incorrect</p></>:(<></>)}
                    {(errorUser)?<><p className=' text-red-600 mt-5 sm:w-full text-center sm:text-lg text-sm'>User is incorrect</p></>:(<></>)}
                    {(emptyField)?<><p className=' text-red-600 mt-5 sm:w-full text-center sm:text-lg text-sm'>Field can't be empty</p></>:(<></>)}
                </div>
            </div>
        </section>
    </main>
  )
}

export default Login