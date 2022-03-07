import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Rootpage from './Rootpage'
import {useAuth} from './Auth'
import { useDispatch } from 'react-redux'
import { logIn } from '../features/UserSlice';
import { USER_LOGIN_INFO } from '../gqlQueries/queries/Explorequery'
import { useLazyQuery } from '@apollo/client'
const bcrypt = require('bcryptjs');

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
}

const Login = () => {

    const dispatch = useDispatch();
    // const loginSelector = useSelector(userLoginInfo);
  
    const auth = useAuth();
    const [user, setUser] = useState<string>('');
    const [loginPassword, setLoginPassword] = useState<string>('');
    const [emptyField,setEmptyField] = useState<boolean>(false);
    const [errorPass,setErrorPass] = useState<boolean>(false);
    const [errorUser,setErrorUser] = useState<boolean>(false);

    const navigate = useNavigate();

    const [checkLogLazyQuery,{loading,data}] = useLazyQuery<dataInfo, AuthVar>(USER_LOGIN_INFO,{variables: {username:user}});

    function loginHandler(){
        if(loginPassword.length > 0) {
            checkLogLazyQuery();
            if(data?.userAuthenticationCheck.length){
                
                bcrypt.compare(loginPassword,data.userAuthenticationCheck[0].password,function(err:any,res:any){
                    if(res){

                        auth?.login(true);
                        navigate('/home', {replace: true});

                        dispatch(logIn(
                            {
                                username:user?.trim(),
                                password: loginPassword
                            }
                        ));

                    }
                    else{
                        (!errorUser)?setErrorUser(false):
                        setErrorPass(true);
                    }
                })
            }
            else{
                console.log(data);
                (!errorPass)?setErrorUser(true):
                setErrorPass(false);
            }
        }
        else{
           setEmptyField(true);
        }
        
        
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
                        <input type="text" onChange={(e) => setUser((e.target.value).trim())} placeholder='Name' className=' bg-gray-200 text-gray-900 h-9 rounded-md outline-0 p-2' required/>
                    </div>
                    <div className=" my-5">
                        <input type="password" onChange={(e) => setLoginPassword(e.target.value)} placeholder='Password' className=' bg-gray-200 text-gray-900 h-9 rounded-md outline-0 p-2' required/>
                    </div>
                    <div className=" mt-5 flex justify-around">
                        <Link to="/" className=' text-blue-700'>
                            <button>
                                Sign Up?
                            </button>
                        </Link>
                        <button onClick={loginHandler} className=' bg-teal-500 rounded-md outline-0 hover:bg-teal-700 text-white py-1 px-2 '>
                            Log in
                        </button>
                    </div>
                    {(errorPass)?<><p className=' text-red-600 mt-5 w-48 text-center text-sm'>Password is incorrect</p></>:(<></>)}
                    {(errorUser)?<><p className=' text-red-600 mt-5 w-48 text-center text-sm'>User is incorrect</p></>:(<></>)}
                    {(emptyField)?<><p className=' text-red-600 mt-5 w-48 text-center text-sm'>Field can't be empty</p></>:(<></>)}
                </div>
            </div>
        </section>
    </main>
  )
}

export default Login