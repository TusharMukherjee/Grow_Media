import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { logIn, mobileInfo, onlineInfo, toggleSearchdis, toggleSearchInfo, toggleSidedis, toggleSideInfo, userLoginInfo } from '../features/UserSlice';
import { LOG_OUT } from '../gqlQueries/mutations/Allmutation';

const Navbar: React.FC = () => {

  const selector = useSelector(userLoginInfo);
  const selectOnline = useSelector(onlineInfo);
  const mobile = useSelector(mobileInfo);
  const dispatchJwt = useDispatch();
  const toggleSide = useSelector(toggleSideInfo);

  const navigate = useNavigate();
  const [searchquery,setsearchquery] = useState("");
  // const [mobile, setMobile] = useState(false);
  const [logout, setlogout] = useState();

  const [calllogout] = useMutation(LOG_OUT,{
    onCompleted:(data)=>{
      setlogout(data);
    }
  });
  // let toggleSearch:boolean = false;
  const toggleSearch = useSelector(toggleSearchInfo);
  

  const handleLogout = () => {
    calllogout();
  }

  useEffect(()=>{
    
    if(logout){
      navigate('/login');
      dispatchJwt(logIn(undefined));
    }
    if(window.location.href.match(/http:\/\/localhost:3000\/search\/blogs\//g) !== null || window.location.href.match(/http:\/\/localhost:3000\/search\/people\//g)){
      dispatchJwt(toggleSearchdis(true));
    }
    
    // if(window.innerWidth < 640){
    //   setMobile(true);
    // }
    // else{
    //   setMobile(false);
    // }
  },[logout,navigate,dispatchJwt]);

  const navLinkStyle = ({isActive}:any) =>{
    return{
      color: isActive?'#115e59':'white'
    }
  }

  function toggleSeFalse(){
    dispatchJwt(toggleSearchdis(false));
  }

  function searchandremove(){
    if(searchquery.trim()!==""){
      navigate(`/search/blogs/${searchquery.trim()}`);
    }
    setsearchquery("");
  }
  

  return(
    <>
      <div className='col-span-7 flex justify-center h-12 items-center sticky left-0 right-0 top-0 sm:sticky sm:left-0 sm:right-0 sm:top-0 z-[80]  bg-teal-600'>
        <div className=' flex justify-center items-center mx-auto grow'>
            <div className=' flex flex-row justify-between mx-5 w-full'>
              <NavLink onClick={toggleSeFalse} to="/home" className='font-semibold text-white'>
                <h1>{(mobile)?"GM":"GrowMedia"}</h1>
              </NavLink>
              
              <div className= {`${toggleSearch? 'visible': 'hidden'} flex flex-row lg:flex lg:flex-row border-[1px] border-teal-900 w-48 sm:w-52 `}>
                  <input value={searchquery} onKeyDownCapture={(e) => e.key === 'Enter' && searchandremove()} onChange={(e)=>setsearchquery(e.target.value)} type="text" placeholder='Search' className=' text-white bg-teal-800 pl-3 outline-0 w-40 sm:w-44' required/>
                  <button onClick={()=>searchandremove()} className='w-8 bg-teal-700 p-[4px]'>
                    <svg className='text-white h-4' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z" fill="currentColor" /></svg>
                  </button>
              </div>

              <div className='flex justify-end '>
                <div className='flex flex-row gap-10 '>
                  <NavLink onClick={toggleSeFalse} to="/addblog" style={navLinkStyle} className={`hidden lg:visible font-semibold text-white `} >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 6C12.5523 6 13 6.44772 13 7V11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H13V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V13H7C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11H11V7C11 6.44772 11.4477 6 12 6Z" fill="currentColor" /><path fillRule="evenodd" clipRule="evenodd" d="M5 22C3.34315 22 2 20.6569 2 19V5C2 3.34315 3.34315 2 5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5ZM4 19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V5C20 4.44772 19.5523 4 19 4H5C4.44772 4 4 4.44772 4 5V19Z" fill="currentColor" /></svg>
                  </NavLink>
                  { (selector && 
                  <NavLink onClick={toggleSeFalse} to={`/profile/${selector.user_id}`} style={navLinkStyle} className={` font-semibold text-white ${mobile?"hidden":"visible"} `}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM14 7C14 8.10457 13.1046 9 12 9C10.8954 9 10 8.10457 10 7C10 5.89543 10.8954 5 12 5C13.1046 5 14 5.89543 14 7Z" fill="currentColor" /><path d="M16 15C16 14.4477 15.5523 14 15 14H9C8.44772 14 8 14.4477 8 15V21H6V15C6 13.3431 7.34315 12 9 12H15C16.6569 12 18 13.3431 18 15V21H16V15Z" fill="currentColor" /></svg>
                  </NavLink>)}

                  <div onClick={() => handleLogout()} className={` cursor-pointer font-semibold text-white ${mobile?"hidden":"visible"} `}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.51428 20H4.51428C3.40971 20 2.51428 19.1046 2.51428 18V6C2.51428 4.89543 3.40971 4 4.51428 4H8.51428V6H4.51428V18H8.51428V20Z" fill="currentColor" /><path d="M13.8418 17.385L15.262 15.9768L11.3428 12.0242L20.4857 12.0242C21.038 12.0242 21.4857 11.5765 21.4857 11.0242C21.4857 10.4719 21.038 10.0242 20.4857 10.0242L11.3236 10.0242L15.304 6.0774L13.8958 4.6572L7.5049 10.9941L13.8418 17.385Z" fill="currentColor" /></svg>
                  </div>

                  <div onClick={() => {dispatchJwt(toggleSidedis(true))}} className={` cursor-pointer font-semibold text-white ${mobile?"visible":"hidden"} `}>
                    {
                      toggleSide?
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      :
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                      </svg>
                    }
                  </div>

                </div>
                
              </div>
            </div>
            
        </div>
      </div>

      <div className=' sticky left-0 top-12 right-0 status text-center bg-red-600 text-white z-20'>{(selectOnline===false)?"Offline":""}</div>

      {
        mobile?
        <div className={` z-[70] fixed top-0 right-0 h-screen bg-teal-500 w-2/5 flex flex-col px-5 justify-center justify-items-center ease-in-out duration-300 ${toggleSide?" translate-x-0 ":" translate-x-full "}`}>
        <NavLink onClick={()=>{dispatchJwt(toggleSidedis(false)); toggleSeFalse();}} to={`/profile/${selector?.user_id}`} style={navLinkStyle} >
          <div className={` mb-8 font-light hover:drop-shadow bg-white hover:border-teal-600 border text-teal-500 h-10 w-28 pl-3 flex justify-items-center rounded-lg items-center `}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>&nbsp;Profile</span>
          </div>
        </NavLink>

        <div onClick={() => { toggleSeFalse(); handleLogout();}} className={`mb-8 font-light hover:drop-shadow bg-white hover:border-teal-600 border text-teal-500 h-10 w-28 pl-3 flex justify-items-center rounded-lg items-center `}>
          <svg xmlns="http://www.w3.org/2000/svg" className="  h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>&nbsp;Logout</span>
        </div>

        <NavLink onClick={()=>{dispatchJwt(toggleSidedis(false)); toggleSeFalse();}} to={`/appinfo`} style={navLinkStyle} >
          <div className={`font-light hover:drop-shadow bg-white hover:border-teal-600 border text-teal-500 h-10 w-28 pl-3 flex justify-items-center rounded-lg items-center `}>
              <svg xmlns="http://www.w3.org/2000/svg" className="sm:h-6 sm:w-6 h-6 w-6"fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            <span>&nbsp;About</span>
          </div>
        </NavLink>

      </div>
      :
      <></>
      }
      
      <Outlet/>
    </>
      
  )
};

export default Navbar;