import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import Rootpage from './Rootpage'
// import {useAuth} from './Auth'
import { useDispatch } from 'react-redux'
import { logIn } from '../features/UserSlice';
import { jwtAfterLogin } from '../features/UserSlice';
import { USER_LOGIN_INFO } from '../gqlQueries/mutations/Allmutation'
import { FROM_COOKIE } from '../gqlQueries/mutations/Allmutation'
import { useMutation } from '@apollo/client'
// import { useHistory } from 'react-router-dom'

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

type verifyjwtFunc = {
    verifyjwtFunc:{
        userId: Number
    }
}

const Login = () => {

    const dispatch = useDispatch();

    // const auth = useAuth();
    const [user, setUser] = useState<string>('');
    const [loginPassword, setLoginPassword] = useState<string>('');
    const [errorPass,setErrorPass] = useState<boolean>(false);
    const [errorUser,setErrorUser] = useState<boolean>(false);
    const [emptyField,setEmptyField] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const location = useLocation();
    // const {data} = useQuery(FROM_COOKIE);
    // console.log(data);
    
    const [callLogin,{loading,data}] = useMutation<dataInfo, AuthVar>(USER_LOGIN_INFO,{onCompleted(data){
         console.log("1");
        
    },onError(){
        if(!user || !loginPassword){
            setEmptyField(true);
        }
        else{
          setErrorUser(true);  
          setEmptyField(false);
          setErrorPass(false);
        }
    }});

    useEffect(()=>{
        console.log("completed")
        checkMutation();
            if(data?.userAuthenticationCheck.authorized === true){
                setIsLoading(loading);
                setErrorPass(false);
                setErrorUser(false);
                console.log("if");
                console.log(data);
                // auth?.login(true);
                dispatch(logIn(
                    {
                        id: data.userAuthenticationCheck.user_id,
                        username:user?.trim()
                    }
                ));
                
                navigate('/home', {replace: true});
                
                
            }
            if(data?.userAuthenticationCheck.authorized === false){
                console.log("if 2")
                setErrorPass(true);
                setErrorUser(false);
                setEmptyField(false);
            }       
    },[]);

    const [checkMutation] = useMutation<verifyjwtFunc>(FROM_COOKIE,{onCompleted(data){
        console.log(data);
        dispatch(jwtAfterLogin(data));
        console.log(location)
        // auth?.login(true);
        // if(location.pathname === `/login` || location.pathname === `/`){
         navigate(-1);
        // }
    }})

    // useEffect(() =>{
        
    // },[]);

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
                        <input type="password" onChange={(e)=>setLoginPassword((e.target.value))} placeholder='Password' className=' bg-gray-200 text-gray-900 h-9 rounded-md outline-0 p-2' required/>
                    </div>
                    <div className=" mt-5 flex justify-around">
                        <Link to="/" className=' text-blue-700'>
                            <button>
                                Sign Up?
                            </button>
                        </Link>
                        <button onClick={()=>callLogin({variables:{username:user, password: loginPassword}})} className=' bg-teal-500 rounded-md outline-0 hover:bg-teal-700 text-white py-1 px-2 '>
                            Log in
                        </button>
                    </div>
                    {(isLoading)?(<><p className=' text-teal-600 mt-5 w-48 text-center text-sm' >Logging In...</p></>):(<></>)}
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