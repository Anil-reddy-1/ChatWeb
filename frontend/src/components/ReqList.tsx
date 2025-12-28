import React, { useEffect, useState } from 'react'
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
    setReqList:React.Dispatch<React.SetStateAction<boolean>>
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

    //to be written
    const RejectRequest = async (id: string) => {
        try {
            const res = await api.post("/friends/reject",{friendId:id})
            loadData();
        } catch (error) {
            console.log(error);
        }
    }


    //to be written
    const AcceptRequest = async (id: string) => {
        try {
            const res = await api.post("/friends/accept",{friendId:id})
            loadData();
        } catch (error) {
            console.log(error);
        }
    }

    const PersonHtml = () => {

        if(recData.length==0)
            return(<div>No requests</div>)

        return  recData.map((friend) => (
            <div className='person-card' key={friend._id} >
                <img src={friend.Dp || images.DP} alt="DP image" className='DP' />
                <div className='person-name-container'>
                    <div className='name'>
                        {friend.name}
                    </div>
                    <div className='person-status'>
                        <button className='request-button'
                        style={{backgroundColor:"red",color:"white",marginTop:2,marginLeft:4,marginRight:4,borderWidth:0.25,borderRadius:5}}
                         onClick={() => { RejectRequest(friend._id) }}
                         >
                            reject
                         </button>
                        <button className='request-button' style={{backgroundColor:"green",color:"white",borderWidth:0.25,borderRadius:5}} onClick={() => { AcceptRequest(friend._id) }}>accept</button>
                        {
                            // friend.isOnline ? (<div><span className='online-dot' >.</span> Online</div>)
                            //     : (<div>Last seen {friend.lastOnline.toDateString()}</div>)
                        }
                    </div>
                </div>
            </div>
        ))
    }





    return props.reqList ? (
        <div className='req-container'>
            <div className='container'>
                {loading&&(<div>Loading...</div>)}
                {error&&(<div>OOps an Error ocurred </div>)}
                {PersonHtml()}
                <button className='X' onClick={()=>{props.setReqList(prev=>!prev)}} >X</button>

            </div>
        </div>
    ) : (<></>);
}

export default ReqList