import React, { createContext, useContext, useState } from "react"



interface User{
    name:string,
    id:string,
    token:string,
}

interface Authcontext{
    user:User|null,
    setUser:React.Dispatch<React.SetStateAction<User|null>>,
    isAuthenticated:Boolean,
    setIsAuthenticated:React.Dispatch<React.SetStateAction<Boolean>>
}

//creating context
const AuthContext= createContext<Authcontext|undefined>(undefined);
//creating provider
export const AuthProvider:React.FC<{children:React.ReactNode}>= ({children})=>{
    const [user,setUser]=useState<User|null>(null)
    const [isAuthenticated,setIsAuthenticated]=useState<Boolean>(!!user)
    return(
        <AuthContext.Provider value={{user,setUser,isAuthenticated,setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )    
}
//create custom hook
export const useAuth=()=>{
    const context = useContext(AuthContext);
    if(context) return context;
    return null;
}