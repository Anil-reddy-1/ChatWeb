import React, { useEffect, useState, useRef } from 'react'
import './styles/chat.css'
import images from '../Providers/images'
import { usePerson } from '../Providers/selectPersonContext';
import { useAuth } from '../Providers/AuthContext';
import { socket } from '../api/socket';
import axios from 'axios';
import { api } from '../api/api';


type Message = {
    _id: string,
    msg: string,
    time: Date,
    sender: string,
    chatId: string
}

const GUIDE_BOT_MSG: Message = {
    _id: "guide-msg-1",
    msg: "Welcome to Chatty Flow! 🎉\n\nHere is a quick guide on how to use the app:\n1. Search for friends using the search bar on the top left.\n2. Send them a request by clicking the 'request' button.\n3. Check your incoming requests by clicking your profile picture on the top left.\n4. Accept requests to start chatting!\n\nEnjoy your stay!",
    time: new Date(),
    sender: "guide-bot-123",
    chatId: "guide-bot-chat"
}

function Chat() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [error, setError] = useState("");;
    const personContext = usePerson();
    const context = useAuth();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);




    const loadMessages = async () => {
        try {
            if (personContext?.chatId === "guide-bot-chat") {
                setMessages([GUIDE_BOT_MSG]);
                setError("");
                return;
            }

            if (personContext?.chatId) {
                setError("");
                const res = await api.get(`/message/${personContext?.chatId}`)
                setMessages(res.data);
                console.log(res.data);
                if (res.data.length == 0) {
                    setError("no messages ")
                }
                setError("");
            } else {
                setError("select a user to load chat");
            }
        } catch (error) {
            setError("failed to load Chat ");
            console.log(error);
        }
    }



    const sendMessage = () => {
        if (!message.trim()) return;

        if (personContext?.chatId === "guide-bot-chat") {
            setMessages(prev => [...prev, {
                _id: "user-msg-" + Date.now(),
                msg: message,
                time: new Date(),
                sender: context?.user?.id || "",
                chatId: "guide-bot-chat"
            }]);
            setMessage("");
            return;
        }

        socket.emit("sendMessage", {
            chatId: personContext?.chatId,
            msg: message,
            time: new Date(),
            sender: context?.user?.id
        })
        console.log("message sent ")
        setMessage("");

    }

    useEffect(() => {

        if (!personContext?.chatId) return

        socket.emit("joinRoom", personContext?.chatId)


        const handleMessage = (msg: Message) => {
            setMessages(prev => [...prev, msg])
        }

        socket.on("message", handleMessage)
        loadMessages()

        return () => {
            socket.off("message", handleMessage)
        }
    }, [personContext?.chatId])





    return (
        <div className='chat-container'>

            <div className='top-bar'>
                <img src={images.DP} alt="DP image" className='DP' />
                <div className='person-name-container'>
                    <div className='name'>
                        {personContext?.person?.name}
                    </div>
                    <div className='person-status'>
                        {
                            // personContext?.person?.isOnline ? (<div><span className='online-dot' >.</span> Online</div>)
                            //     : (<div>Last seen  {personContext?.person?.lastOnline.toLocaleTimeString()}</div>)
                        }
                    </div>
                </div>

                <div className='threedots'>⋮</div>

            </div>

            <div className='message-list'>
                {error.length > 0 && (<div className='message-error'>{error}</div>)}
                {messages.length <= 0 ? (<div className='message-error'>no Messages yet</div>) :
                    messages.map((msg) => (
                        <div className={`message ${msg.sender === context?.user?.id ? "sent" : "received"}`} key={msg._id} style={{ whiteSpace: "pre-wrap" }}>
                            {msg.msg}
                            <span className='timestamp'>{new Date(msg.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                    ))
                }
                <div ref={messagesEndRef} />

            </div>

            <div className="input-area">
                <textarea name='message' value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }} placeholder='Type A message...' />
                <button type='submit' onClick={sendMessage}>Send</button>
            </div>


        </div>

    )
}

export default Chat