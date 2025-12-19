import React, { useState } from 'react'
import './styles/sidebar.css'
import images from '../Providers/images'


function Sidebar() {
    const [online,setOnline]= useState(true);
    return (
        <div className='sidebar'>
            <div className='sticky-section'>

                <div className='heading'>
                    <h2>Chatty</h2>
                    <img src={images.DP} alt="profile image" className='profile' />
                </div>

                <div className='top-box'>
                    <input type="text" name="name"  id="search-name" placeholder='search the person ...'/>
                    <img src={images.expandImage} alt='close the sidebar' className='expandimg' />
                </div>

            </div>
            
            <div className='person-list'>

                <div className='person-card'>
                <img src={images.DP} alt="DP image" className='DP'  />
                <div className='person-name-container'>
                    <div className='name'>
                        Person name 1
                    </div>
                    <div className='person-status'>
                       {
                       online?(<div><span className='online-dot' >.</span> Online</div>)
                       :(<div>Last seen 1 hour ago</div>)
                       }
                    </div>
                </div>
                </div>
            
                <div className='person-card'>
                    <img src={images.DP} alt="DP image" className='DP'  />
                    <div className='person-name-container'>
                        <div className='name'>
                            Person name 2
                        </div>
                        <div className='person-status'>
                        {
                        online?(<div><span className='online-dot' >.</span> Online</div>)
                        :(<div>Last seen 1 hour ago</div>)
                        }
                        </div>
                    </div>
                </div>
                
                <div className='person-card'>
                    <img src={images.DP} alt="DP image" className='DP'  />
                    <div className='person-name-container'>
                        <div className='name'>
                            Person name 3
                        </div>
                        <div className='person-status'>
                        {
                        !online?(<div><span className='online-dot' >.</span> Online</div>)
                        :(<div>Last seen 1 hour ago</div>)
                        }
                        </div>
                    </div>
                </div>

                <div className='person-card'>
                    <img src={images.DP} alt="DP image" className='DP'  />
                    <div className='person-name-container'>
                        <div className='name'>
                            Person name 1
                        </div>
                        <div className='person-status'>
                        {
                        online?(<div><span className='online-dot' >.</span> Online</div>)
                        :(<div>Last seen 1 hour ago</div>)
                        }
                        </div>
                    </div>
                </div>

                <div className='person-card'>
                    <img src={images.DP} alt="DP image" className='DP'  />
                    <div className='person-name-container'>
                        <div className='name'>
                            Person name 1
                        </div>
                        <div className='person-status'>
                        {
                        online?(<div><span className='online-dot' >.</span> Online</div>)
                        :(<div>Last seen 1 hour ago</div>)
                        }
                        </div>
                    </div>
                </div>

                <div className='person-card'>
                    <img src={images.DP} alt="DP image" className='DP'  />
                    <div className='person-name-container'>
                        <div className='name'>
                            Person name 1
                        </div>
                        <div className='person-status'>
                        {
                        online?(<div><span className='online-dot' >.</span> Online</div>)
                        :(<div>Last seen 1 hour ago</div>)
                        }
                        </div>
                    </div>
                </div>


                <div className='person-card'>
                    <img src={images.DP} alt="DP image" className='DP'  />
                    <div className='person-name-container'>
                        <div className='name'>
                            Person name 1
                        </div>
                        <div className='person-status'>
                        {
                        online?(<div><span className='online-dot' >.</span> Online</div>)
                        :(<div>Last seen 1 hour ago</div>)
                        }
                        </div>
                    </div>
                </div>


                <div className='person-card'>
                    <img src={images.DP} alt="DP image" className='DP'  />
                    <div className='person-name-container'>
                        <div className='name'>
                            Person name 1
                        </div>
                        <div className='person-status'>
                        {
                        online?(<div><span className='online-dot' >.</span> Online</div>)
                        :(<div>Last seen 1 hour ago</div>)
                        }
                        </div>
                    </div>
                </div>


                <div className='person-card'>
                    <img src={images.DP} alt="DP image" className='DP'  />
                    <div className='person-name-container'>
                        <div className='name'>
                            Person name 1
                        </div>
                        <div className='person-status'>
                        {
                        online?(<div><span className='online-dot' >.</span> Online</div>)
                        :(<div>Last seen 1 hour ago</div>)
                        }
                        </div>
                    </div>
                </div>

                <div className='person-card'>
                    <img src={images.DP} alt="DP image" className='DP'  />
                    <div className='person-name-container'>
                        <div className='name'>
                            Person name 1
                        </div>
                        <div className='person-status'>
                        {
                        online?(<div><span className='online-dot' >.</span> Online</div>)
                        :(<div>Last seen 1 hour ago</div>)
                        }
                        </div>
                    </div>
                </div>


                <div className='person-card'>
                    <img src={images.DP} alt="DP image" className='DP'  />
                    <div className='person-name-container'>
                        <div className='name'>
                            Person name 1
                        </div>
                        <div className='person-status'>
                        {
                        online?(<div><span className='online-dot' >.</span> Online</div>)
                        :(<div>Last seen 1 hour ago</div>)
                        }
                        </div>
                    </div>
                </div>

                <div className='person-card'>
                    <img src={images.DP} alt="DP image" className='DP'  />
                    <div className='person-name-container'>
                        <div className='name'>
                            Person name 1
                        </div>
                        <div className='person-status'>
                        {
                        online?(<div><span className='online-dot' >.</span> Online</div>)
                        :(<div>Last seen 1 hour ago</div>)
                        }
                        </div>
                    </div>
                </div>

            </div>

            



        </div>
    )
}

export default Sidebar