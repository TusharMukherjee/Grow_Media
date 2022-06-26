import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { mobileInfo, toggleSearchdis, toggleSearchInfo } from '../features/UserSlice';

const Sidebar: React.FC = () => {

  const dispatch = useDispatch();
  const mobile = useSelector(mobileInfo);
  const toggleSearch = useSelector(toggleSearchInfo);

  const navLinkStyle = ({isActive}:any) =>{
    return{
      color: isActive?'white':'#115e59',
      background: isActive? '#009688':'white'
    }
  }

  function toggleSe(){
    dispatch(toggleSearchdis(true))
  }

  function toggleSeFalse(){
    dispatch(toggleSearchdis(false))
  }

  return (
        <div>
            <div className=' bg-teal-500 justify-center items-center w-screen sm:w-screen mt-8 h-16 sm:h-20 fixed sm:bottom-0 sm:grid gap-12 sm:gap-28 sm:grid-flow-col bottom-0 grid grid-flow-col'>

              <NavLink to="/home" style={navLinkStyle} className={` z-10 hover:drop-shadow font-medium bg-white hover:border-teal-600 border text-teal-500 mb-3 h-12 w-48 pl-3 sm:w-auto p-3 rounded-lg items-center hidden lg:visible `}>
                  <h1>
                    Home
                  </h1>
              </NavLink>

              <NavLink to="/explore" style={navLinkStyle} className={` z-10 hover:drop-shadow font-medium bg-white hover:border-teal-600 border text-teal-500 mb-3 h-12 w-48 pl-3 rounded-lg items-center hidden lg:visible `}>
                  <div>Explore</div>
              </NavLink>
              
              <NavLink to="/editprofile" style={navLinkStyle} className={` z-10 hover:drop-shadow font-medium bg-white hover:border-teal-600 border text-teal-500 mb-3 h-12 w-48 pl-3 rounded-lg items-center hidden lg:visible `}>
                  <div>Edit Profile</div>
              </NavLink>

              <NavLink to="/home" onClick={toggleSeFalse} style={navLinkStyle} className=' border-[0.25px] z-10 hover:drop-shadow font-medium bg-white lg:hover:border-teal-600 lg:border text-teal-500 sm:my-3 w-auto sm:w-auto p-2 sm:p-3 rounded-full flex justify-center justify-items-center '>
                <svg xmlns="http://www.w3.org/2000/svg" className="sm:h-6 sm:w-6 h-4 w-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </NavLink>

              {/* <NavLink to="/explore" onClick={toggleSeFalse} style={navLinkStyle} className=' border-[0.25px] z-10 hover:drop-shadow font-medium bg-white lg:hover:border-teal-600 lg:border text-teal-500 sm:my-3 w-auto sm:w-auto p-2 sm:p-3 rounded-full flex justify-center justify-items-center '>
                <svg xmlns="http://www.w3.org/2000/svg" className="sm:h-6 sm:w-6 h-4 w-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </NavLink> */}

              <NavLink to="/explore" onClick={toggleSe} style={navLinkStyle} className=' border-[0.25px] z-10 hover:drop-shadow font-medium bg-white lg:hover:border-teal-600 lg:border text-teal-500 sm:my-3 w-auto sm:w-auto p-2 sm:p-3 rounded-full flex justify-center justify-items-center '>
                <svg xmlns="http://www.w3.org/2000/svg" className="sm:h-6 sm:w-6 h-4 w-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </NavLink>

              <NavLink onClick={toggleSeFalse} to="/addblog" style={navLinkStyle} className={` border-[0.25px] z-10 hover:drop-shadow font-medium bg-white lg:hover:border-teal-600 lg:border text-teal-500 sm:my-3 w-auto sm:w-auto p-2 sm:p-3 rounded-full flex justify-center justify-items-center  `} >
                <svg xmlns="http://www.w3.org/2000/svg" className="sm:h-6 sm:w-6 h-4 w-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </NavLink>
              
              <NavLink to="/editprofile" onClick={toggleSeFalse} style={navLinkStyle} className=' border-[0.25px] z-10 hover:drop-shadow font-medium bg-white lg:hover:border-teal-600 lg:border text-teal-500 sm:my-3 w-auto sm:w-auto p-2 sm:p-3 rounded-full flex justify-center justify-items-center '>
                <svg xmlns="http://www.w3.org/2000/svg" className="sm:h-6 sm:w-6 h-4 w-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </NavLink>

            </div>
        </div>
  );
};

export default Sidebar;
