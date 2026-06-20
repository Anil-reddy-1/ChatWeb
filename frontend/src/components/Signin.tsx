import React, { useEffect, useState } from 'react'
import "./styles/SignIn.css"
import { useAuth } from '../Providers/AuthContext';
import {api} from '../api/api'
import { connectSocket } from '../api/socket';


function SignIn() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState('');
    const [error, setError] = useState("");
    const context = useAuth();

    useEffect(() => {
        const stored = localStorage.getItem("ChatUserData");
        if (stored) {
            const user = JSON.parse(stored);
            context?.setUser(user);
            context?.setIsAuthenticated(true);
            connectSocket(user.token);
        }
    }, [])

    async function Login(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        if (name.trim().length < 5) {
            setError("user name must be greater than 4 character");
            return
        }

        if (!email.includes("@gmail.com")) {
            setError("must be a valid email");
            return
        }

        if (password.trim().length < 8) {
            setError("password must be atleast 8 characters");
            return;
        }


        try {
            const userData = await api.post("/user", { name, email, password })
            const user = { name: userData.data.name, token: userData.data.token, id: userData.data.id };
            context?.setUser(user)
            context?.setIsAuthenticated(true);
            localStorage.setItem("ChatUserData", JSON.stringify(user))
            connectSocket(user.token);
            console.log(context?.user);
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message)
            } else setError("something went wrong")
        }

    }


    return (
        <div className='main-card'>

            <form action="" onSubmit={Login} className="sign-in-container">

                <h2>Login|Signup</h2>
                <div className='input'>
                    <label htmlFor="user-name"  >User Name</label>
                    <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className='User-name' name='user-name' placeholder='User name' />
                </div>
                <div className='input'>
                    <label htmlFor="user-name">Email</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className='email' name='email' placeholder='ex:- example@gmail.com' />
                </div>
                <div className='input'>
                    <label htmlFor="password">Password</label>
                    <input type='password' required value={password} onChange={(e) => setPassword(e.target.value)} name='password' placeholder='minimum 8 characters' />
                </div>
                <label id="err" className='error' >{error}</label>
                <button type='submit'>Login</button>

            </form>
        </div>
    )
}

export default SignIn