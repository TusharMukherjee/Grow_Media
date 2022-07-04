import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toggleSearchdis } from '../features/UserSlice';

const Sidebar: React.FC = () => {

  const dispatch = useDispatch();

  const navLinkStyle = ({isActive}:any) =>{
    return{
      color: isActive?'white':'#115e59',
      background: isActive? '#00796B':'white'
    }
  }

  function toggleSe(){
    dispatch(toggleSearchdis(true))
  }

  function toggleSeFalse(){
    dispatch(toggleSearchdis(false))
  }

  return (
        <div className=' lg:col-start-1 row-span-6 lg:col-span-2 lg:flex lg:h-screen lg:justify-center lg:bg-teal-600 lg:sticky lg:top-12 lg:bottom-0 lg:z-10'>
            <div className=' z-[70] lg:z-10 bg-teal-600 justify-center items-center w-screen lg:w-60 sm:w-screen mt-8 lg:pt-1 h-16 lg:h-1/2 sm:h-20 fixed sm:bottom-0 sm:grid gap-12 sm:gap-28 lg:gap-4 sm:grid-flow-col bottom-0 lg:top-12 grid grid-flow-col lg:flex lg:flex-col'>

              <NavLink to="/home" style={navLinkStyle} className={` z-10 hover:drop-shadow font-medium bg-white hover:border-teal-600 border text-teal-500 mb-3 h-12 w-48 pl-3 rounded-lg items-center hidden lg:flex lg:flex-row `}>
                <svg xmlns="http://www.w3.org/2000/svg" className="sm:h-6 sm:w-6 h-4 w-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                &nbsp;&nbsp;
                  <h1>
                    Home
                  </h1>
              </NavLink>

              <NavLink to="/explore" style={navLinkStyle} className={` z-10 hover:drop-shadow font-medium bg-white hover:border-teal-600 border text-teal-500 mb-3 h-12 w-48 pl-3 rounded-lg items-center hidden lg:flex lg:flex-row `}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="sm:h-6 sm:w-6 h-4 w-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  &nbsp;&nbsp;
                  <h1>Explore</h1>
              </NavLink>
              
              <NavLink to="/addblog" style={navLinkStyle} className={` z-10 hover:drop-shadow font-medium bg-white hover:border-teal-600 border text-teal-500 mb-3 h-12 w-48 pl-3 rounded-lg items-center hidden lg:flex lg:flex-row `}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="sm:h-6 sm:w-6 h-4 w-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  &nbsp;&nbsp;
                  <h1>Add Blog</h1>
              </NavLink>
              
              <NavLink to="/editprofile" style={navLinkStyle} className={` z-10 hover:drop-shadow font-medium bg-white hover:border-teal-600 border text-teal-500 mb-3 h-12 w-48 pl-3 rounded-lg items-center hidden lg:flex lg:flex-row `}>
              <svg xmlns="http://www.w3.org/2000/svg" className="sm:h-6 sm:w-6 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
                  &nbsp;&nbsp;
                  <h1>Edit Profile</h1>
              </NavLink>

              <NavLink to="/home" onClick={toggleSeFalse} style={navLinkStyle} className=' border-[0.25px] z-10 hover:drop-shadow font-medium bg-white lg:hover:border-teal-600 lg:border text-teal-500 sm:my-3 w-auto sm:w-auto p-2 sm:p-3 rounded-full flex justify-center justify-items-center lg:hidden '>
                <svg xmlns="http://www.w3.org/2000/svg" className="sm:h-6 sm:w-6 h-4 w-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </NavLink>

              {/* <NavLink to="/explore" onClick={toggleSeFalse} style={navLinkStyle} className=' border-[0.25px] z-10 hover:drop-shadow font-medium bg-white lg:hover:border-teal-600 lg:border text-teal-500 sm:my-3 w-auto sm:w-auto p-2 sm:p-3 rounded-full flex justify-center justify-items-center lg:hidden '>
                <svg xmlns="http://www.w3.org/2000/svg" className="sm:h-6 sm:w-6 h-4 w-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </NavLink> */}

              <NavLink to="/explore" onClick={toggleSe} style={navLinkStyle} className=' border-[0.25px] z-10 hover:drop-shadow font-medium bg-white lg:hover:border-teal-600 lg:border text-teal-500 sm:my-3 w-auto sm:w-auto p-2 sm:p-3 rounded-full flex justify-center justify-items-center lg:hidden '>
                <svg xmlns="http://www.w3.org/2000/svg" className="sm:h-6 sm:w-6 h-4 w-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </NavLink>

              <NavLink onClick={toggleSeFalse} to="/addblog" style={navLinkStyle} className={` border-[0.25px] z-10 hover:drop-shadow font-medium bg-white lg:hover:border-teal-600 lg:border text-teal-500 sm:my-3 w-auto sm:w-auto p-2 sm:p-3 rounded-full flex justify-center justify-items-center lg:hidden  `} >
                <svg xmlns="http://www.w3.org/2000/svg" className="sm:h-6 sm:w-6 h-4 w-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </NavLink>
              
              <NavLink to="/editprofile" onClick={toggleSeFalse} style={navLinkStyle} className=' border-[0.25px] z-10 hover:drop-shadow font-medium bg-white lg:hover:border-teal-600 lg:border text-teal-500 sm:my-3 w-auto sm:w-auto p-2 sm:p-3 rounded-full flex justify-center justify-items-center lg:hidden '>
                <svg xmlns="http://www.w3.org/2000/svg" className="sm:h-6 sm:w-6 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </NavLink>

            </div>
        </div>
  );
};

export default Sidebar;
