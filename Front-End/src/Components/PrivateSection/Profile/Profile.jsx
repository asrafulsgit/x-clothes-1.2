import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './Profile.css'
import Nav from '../../App/Nav/Nav'
import Footer from '../../App/Footer/Footer'
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
    <div className='profile-page'>
      <Nav />
      <div className="main-profile-section">
        <h1 className='profile-title'>Profile</h1>
        <div className="user-info-div">
          <p className='user-name'>
           User Name : {userInfo && userInfo.name}
          </p>
          <p className='user-email'>
            Email : {userInfo && userInfo.email}
          </p>
        </div>
        <button className='user-logout-btn' onClick={handleLogout}>Log Out</button>
      </div>
      <Footer />
    </div>
  )
}

export default Profile
