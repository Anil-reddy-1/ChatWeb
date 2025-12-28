import React, { useContext } from 'react'
import Chat from '../components/chat'
import Sidebar from '../components/sidebar.tsx'
import '../components/styles/Home.css'
import { useAuth } from '../Providers/AuthContext.tsx'
import SignIn from '../components/Signin.tsx'
function Home() {
    const context = useAuth();
    
    if(!context?.isAuthenticated) return (<SignIn/>)
    
    console.log(context.isAuthenticated,context.user)
    
    return (
        <div className='home-container'>
           
            
            <Sidebar />
            <Chat />

        </div>
    )
}

export default Home