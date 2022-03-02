import React, {createContext, useContext, useState} from 'react'

type authType = {
    user: string;
    login(user:string|undefined): void;
    logout(): void;
}

const AuthContext = createContext<authType | null>(null);

const Auth = ({children}:any) => {

    const [user, setUser] = useState<string>('');
    
    const login = (user:string) => {
        setUser(user);
    }

    const logout = () => {
        setUser('');
    }

  return (
    <AuthContext.Provider value = {{user, login, logout}}>
        {children}
    </AuthContext.Provider>
  )
}

export default Auth
export const useAuth = () => {
    return useContext(AuthContext);
}