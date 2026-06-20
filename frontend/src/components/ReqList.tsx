import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import images from '../Providers/images'
import { api } from '../api/api'
import "./styles/Req.css"

type Friend = {
    _id: string,
    name: string,
    Dp: string,
}

type props = {
    reqList: boolean,
    setReqList:React.Dispatch<React.SetStateAction<boolean>>,
    loadPersons?: () => void
}

function ReqList(props: props) {
    const [recData, setRecData] = useState<Friend[]>([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const loadData = async () => {
        try {
            setLoading(true);
            setError(false);
            const res = await api.get("/friends/requests");
            // Set the array of requests directly
            setRecData(res.data);
            setLoading(false);
        } catch (error) {
            setError(true);
            setLoading(false);
            console.log(error);
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    const RejectRequest = async (id: string) => {
        try {
            await api.post("/friends/reject",{friendId:id})
            loadData();
        } catch (error) {
            console.log(error);
        }
    }

    const AcceptRequest = async (id: string) => {
        try {
            await api.post("/friends/accept",{friendId:id})
            loadData();
            if (props.loadPersons) {
                props.loadPersons();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const PersonHtml = () => {
        if(recData.length === 0)
            return(<div style={{textAlign: "center", color: "var(--text-tertiary)", marginTop: "20px"}}>No requests</div>)

        return recData.map((friend) => (
            <div className='person-card' key={friend._id} >
                <img src={friend.Dp || images.DP} alt="DP image" className='DP' />
                <div className='person-name-container'>
                    <div className='name'>
                        {friend.name || "Unknown User"}
                    </div>
                    <div className='request-actions'>
                        <button className='req-btn reject' onClick={() => { RejectRequest(friend._id) }}>Reject</button>
                        <button className='req-btn accept' onClick={() => { AcceptRequest(friend._id) }}>Accept</button>
                    </div>
                </div>
            </div>
        ))
    }

    return props.reqList ? createPortal(
        <div className='req-container' onClick={(e) => { if (e.target === e.currentTarget) props.setReqList(false); }}>
            <div className='container'>
                <h3>Friend Requests</h3>
                <button className='X' onClick={()=>{props.setReqList(false)}}>✕</button>
                {loading && (<div style={{textAlign: "center", marginTop: "10px", color: "var(--text-tertiary)"}}>Loading...</div>)}
                {error && (<div style={{color: "var(--error)", textAlign: "center", marginTop: "10px"}}>Oops, an error occurred</div>)}
                {!loading && !error && PersonHtml()}
            </div>
        </div>,
        document.body
    ) : (<></>);
}

export default ReqList