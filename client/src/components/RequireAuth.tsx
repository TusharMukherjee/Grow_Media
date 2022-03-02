import React from 'react'
import { useAuth } from './Auth'
import {Navigate} from 'react-router-dom'

const RequireAuth = ({children}:any) => {

    const auth = useAuth();

    if(!auth?.user){
        return <Navigate to ='/login'/>
    }
    return children;
}

export default RequireAuth