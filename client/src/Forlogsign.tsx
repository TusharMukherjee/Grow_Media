import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { userLoginInfo } from './features/UserSlice';

const Forlogsign = () => {

    const selector = useSelector(userLoginInfo);
    console.log(Object.keys(selector.users).length == 0);
    const navigate = useNavigate();

    if(Object.keys(selector.users).length == 0){
        navigate('/login');
    }

  return (
    <></>
  )
}

export default Forlogsign