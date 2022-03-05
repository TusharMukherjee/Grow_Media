import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Rootpage from './Rootpage'
import {useAuth} from './Auth'
import { useDispatch } from 'react-redux'
import { logIn } from '../features/UserSlice';
import { USER_LOGIN_INFO } from '../gqlQueries/queries/Explorequery'
import { useLazyQuery } from '@apollo/client'
import { type } from 'os'

type dataInfo= {
    userAuthenticationCheck : [userAuthenticationCheck]
}

type userAuthenticationCheck = {
    user_id: string;
    username: string;
    password: string;
}

type AuthVar = {
    username:string;
    password: string;
}

const Login = () => {

    const dispatch = useDispatch();
    // const loginSelector = useSelector(userLoginInfo);
  
    const auth = useAuth();
    const [user, setUser] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const [checkLogLazyQuery,{loading,data}] = useLazyQuery<dataInfo, AuthVar>(USER_LOGIN_INFO,{onCompleted:(data) => {

        (data.userAuthenticationCheck.length) ? (auth?.login(true)) : (console.log('not found'))
        
        navigate('/home', {replace: true});

            dispatch(logIn(
            {
                username:user?.trim(),
                password: password?.trim()
            }
        ));


    },variables: {username:user, password}});
    // const handleLogin = () => {

    //     dispatch(logIn(
    //         {
    //             username:user?.trim(),
    //             password: password?.trim()
    //         }
    //     ));
    //     // console.log(loginSelector);
    //     console.log({
    //         user, password
    //     });

    //     checkLogLazyQuery();
    //     // check();
    //     console.log(data?.userAuthenticationCheck[0].username);

    //     // auth?.login(user);
    //     // navigate('/home', {replace: true});
    // }

    

    // function check(){
    //     if(data?.[0]){
    //         auth?.login(user);
    //         navigate('/home', {replace: true});
    //     }
    // }

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
                        <input type="text" onChange={(e) => setUser((e.target.value).trim())} placeholder='Name' className=' bg-gray-200 text-gray-900 h-9 rounded-md outline-0 p-2' />
                    </div>
                    <div className=" my-5">
                        <input type="password" onChange={(e) => setPassword((e.target.value).trim())} placeholder='Password' className=' bg-gray-200 text-gray-900 h-9 rounded-md outline-0 p-2' />
                    </div>
                    <div className=" mt-5 flex justify-around">
                        <Link to="/" className=' text-blue-700'>
                            <button>
                                Sign Up?
                            </button>
                        </Link>
                        <button onClick={() => checkLogLazyQuery()} className=' bg-teal-500 rounded-md outline-0 hover:bg-teal-700 text-white py-1 px-2 '>
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