import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function GoogleLogin() {
    const navigate = useNavigate();
    useEffect(()=>{
        navigate("/")
    })
  return (
    <div>Requesting google</div>
  )
}

export default GoogleLogin;