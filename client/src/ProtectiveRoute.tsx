import React from 'react';
import {Navigate} from 'react-router-dom'

import { useSelector } from 'react-redux';
import { jwtLogin } from './features/UserSlice';

type verifyjwtFunc = {
    verifyjwtFunc:{
       user_id: Number 
    }
  }

export function ProtectiveRoute({
    children,
    path,
}: {
    children: React.ReactElement;
    path: string;
}) {

    const selector:verifyjwtFunc = useSelector(jwtLogin);
    
    return selector?.verifyjwtFunc?.user_id ? (
        children
    ) : (
        // <>Test </>
        <Navigate to="/login" state={{ previousPath: `${path}` }} />
    );
}