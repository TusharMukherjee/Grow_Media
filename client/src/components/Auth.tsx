import React, {createContext, useContext, useState} from 'react'

type authType = {
    booleanLog: boolean;
    login(booleanLog:boolean): void;
    logout(): void;
}

const AuthContext = createContext<authType | null>(null);

const Auth = ({children}:any) => {

    const [booleanLog, setBooleanLog] = useState<boolean>(false);
    
    const login = (booleanLog:boolean) => {
        setBooleanLog(booleanLog);
    }

    const logout = () => {
        setBooleanLog(false);
    }

  return (
    <AuthContext.Provider value = {{booleanLog, login, logout}}>
        {children}
    </AuthContext.Provider>
  )
}

export default Auth
export const useAuth = () => {
    return useContext(AuthContext);
}