import React, { useState } from 'react'
import './styles/chat.css'
import images from '../Providers/images'

function Chat() {
    const [online, setOnline] = useState(true);

    return (
        <div className='chat-container'>

            <div className='top-bar'>
                <img src={images.DP} alt="DP image" className='DP' />
                <div className='person-name-container'>
                    <div className='name'>
                        Person name 1
                    </div>
                    <div className='person-status'>
                        {
                            online ? (<div><span className='online-dot' >.</span> Online</div>)
                                : (<div>Last seen 1 hour ago</div>)
                        }
                    </div>
                </div>

                <div className='threedots'>.<br />.<br />.</div>

            </div>

            <div className='message-list'>

                <div className="message sent">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, quos?
                    <span className='timestamp'>12/21/2006 4:12 am</span>
                </div>

                <div className="message received">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, quos?
                    <span className='timestamp'>12/21/2006 4:12 am</span>
                </div>

                <div className="message sent">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, quos?
                    <span className='timestamp'>12/21/2006 4:12 am</span>
                </div>

                <div className="message received">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, quos?
                    <span className='timestamp'>12/21/2006 4:12 am</span>
                </div>

                <div className="message sent">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, quos?
                    <span className='timestamp'>12/21/2006 4:12 am</span>
                </div>

                <div className="message received">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, quos?
                    <span className='timestamp'>12/21/2006 4:12 am</span>
                </div>

                <div className="message sent">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, quos?
                    <span className='timestamp'>12/21/2006 4:12 am</span>
                </div>

                <div className="message received">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, quos?
                    <span className='timestamp'>12/21/2006 4:12 am</span>
                </div>

                <div className="message sent">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, quos?
                    <span className='timestamp'>12/21/2006 4:12 am</span>
                </div>

                <div className="message received">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, quos?
                    <span className='timestamp'>12/21/2006 4:12 am</span>
                </div>


                <div className="message sent">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, quos?
                    <span className='timestamp'>12/21/2006 4:12 am</span>
                </div>

                <div className="message received">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, quos?
                    <span className='timestamp'>12/21/2006 4:12 am</span>
                </div>

                <div className="message sent">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, quos?
                    <span className='timestamp'>12/21/2006 4:12 am</span>
                </div>

                <div className="message received">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, quos?
                    <span className='timestamp'>12/21/2006 4:12 am</span>
                </div>

            </div>
            
            <div className="input-area">
                <textarea className='' />
                <button>Send</button>
            </div>


        </div>

    )
}

export default Chat