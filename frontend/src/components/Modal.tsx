import React, { useState } from 'react'
import "./styles/Model.css"
import ReqList from './ReqList'
import { useAuth } from '../Providers/AuthContext'


type propType = {
  extended: boolean
}

function Modal(props: propType) {
  const [reqlist, setReqList] = useState(false);
  const context = useAuth();

  function logout() {
    context?.setUser(null);
    localStorage.clear();
    context?.setIsAuthenticated(false);
  }

  return props.extended ? (
    <div className='Model'>
      <div className='Model-list-item ' onClick={() => { setReqList(prev => !prev) }}>
        Requested List
      </div>
      <div className='Model-list-item ' onClick={() => { logout() }} >
        <span className='red'>LogOut</span>
      </div>
      {reqlist && (<ReqList reqList={reqlist} setReqList={setReqList} />)}
    </div>
  ) : (<></>)
}

export default Modal