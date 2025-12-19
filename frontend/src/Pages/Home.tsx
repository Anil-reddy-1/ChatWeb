import React from 'react'
import Chat from '../components/chat'
import Sidebar from '../components/sidebar.tsx'
import '../components/styles/Home.css'
function Home() {
    return (
        <div className='home-container'>
            <Sidebar />
            <Chat />

        </div>
    )
}

export default Home