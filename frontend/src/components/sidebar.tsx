import React, { useEffect, useState } from 'react'
import './styles/sidebar.css'
import images from '../Providers/images'
import { usePerson } from '../Providers/selectPersonContext'
import { api } from '../api/api'
import { useAuth } from '../Providers/AuthContext'
import Modal from './Modal'
import { AxiosResponse } from 'axios'

type Friend = {
    id: string,
    name: string,
    isOnline: boolean,
    lastMessage: string,
    Dp: string,
    chatId:string,
}
type FilterFriend = {
    _id: string,
    name: string,
}



function Sidebar() {
    const [searchString, setSearchString] = useState("");
    const [data, setData] = useState<Friend[]>([]);
    const [filteredData, setFilteredData] = useState<FilterFriend[]>([]);
    const context = useAuth();
    const personContext = usePerson();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [extend, setExtend] = useState(false);

    const loadPersons = async () => {
        try {
            setLoading(true);
            setError(false);
            const personData = await api.get("/friends");
            setData(personData.data);
            console.log(personData.data)
            setLoading(false)
        } catch (error) {
            setError(true);
            setLoading(false);
            console.log(error);
            setData([]);
        }
    }

    const loadSearch = async () => {
        try {
            setLoading(true);
            setError(false);
            if (searchString === "") {
                setFilteredData([]);
                loadPersons();
                return;
            }
            const searchedData = await api.get(`/user/${searchString}`)
            setFilteredData(searchedData.data)
            setLoading(false)

        } catch (error) {
            setError(true);
            setLoading(false);
            console.log(error);
        }
    }

    useEffect(() => {
        loadPersons();
    }, [])

    useEffect(() => {
        loadSearch();
    }, [searchString])

    

 



    const selectPerson = (person: Friend) => {
        if (!personContext) return;
        personContext.setPerson(person);
    }



    const sendRequest = async (id: string) => {
        try {
            const res = await api.post("/friends", { friendId: id })
            window.alert("Request Sent");
        } catch (error:any) {
            console.log(error);
            window.alert(error?.response?.data.message);
        }
    }

    const personHtml = () => {
        return data.length == 0 ? (<>no friends</>) :
            data.map((friend) => (
                <div className='person-card' key={friend.id} onClick={() => selectPerson(friend)}>
                    <img src={friend.Dp || images.DP} alt="DP image" className='DP' />
                    <div className='person-name-container'>
                        <div className='name'>
                            {friend.name}
                        </div>
                        <div className='person-status'>
                            
                                <div className='status-row'>
                                    <span className={`online-dot ${friend.isOnline ? 'online' : 'offline'}`}></span>
                                    <span>{friend.isOnline ? 'Online' : 'Offline'}</span>
                                </div>
                                <div className='message-preview'>{friend.lastMessage || "Send Message"}</div>
                            
                        </div>
                    </div>
                </div>
            ))
    }

    const searchedPersonHtml = () => {
        console.log(filteredData)
        return filteredData.map((friend) => (
            <div className='person-card' key={friend._id} >
                <img src={ images.DP} alt="DP image" className='DP' />
                <div className='person-name-container'>
                    <div className='name'>
                        {friend.name}
                    </div>
                    <div className='person-status'>
                        {
                            <button className='request-button' onClick={() => { sendRequest(friend._id) }}>request</button>
                            // friend.isOnline ? (<div><span className='online-dot' >.</span> Online</div>)
                            //     : (<div>{friend.lastOnline.toDateString()}</div>)
                        }
                    </div>
                </div>
            </div>
        ))
    }


    return (
        <div className='sidebar'>
            <div className='sticky-section'>

                <div className='heading'>
                    <h2>{context?.user?.name}</h2>
                    <img src={images.DP} alt="profile image" className='profile' onClick={() => { setExtend(prev => !prev) }} />
                    <Modal extended={extend} />
                </div>

                <div className='top-box'>
                    <input type="text" name="name" id="search-name" placeholder='search the person ...' value={searchString} onChange={(e) => { setSearchString(e.target.value) }} />
                    <img src={images.search} alt='close the sidebar' className='expandimg' />
                </div>

            </div>

            <div className='person-list'>
                {loading && (<div className='loading'>Loading...</div>)}
                {error && (<div className='loading'>error occured while search</div>)}

                {filteredData.length === 0 ? personHtml() : searchedPersonHtml()}


            </div>


        </div>
    )
}

export default Sidebar