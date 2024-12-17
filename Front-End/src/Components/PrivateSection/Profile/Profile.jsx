import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const {userInfo} = useSelector((state)=>state.authInfo)
  const navigate = useNavigate()

  const handleLogout = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('isLoggedIn')
    navigate('/login')
    window.location.reload()
  }
  return (
    <div>
      <h1>Profile</h1>
      <h1>{userInfo && userInfo.name}</h1>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  )
}

export default Profile
