import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { userLoginInfo } from './features/UserSlice';

const PrivateRoute = ({children, path }: {children: any, path: string}) => {
    const selector = useSelector(userLoginInfo);

    return selector ? (
        children
    ):(
        <Navigate replace to={'/login'} state={{ path: `${path}` }}/>
    )
}

export default PrivateRoute