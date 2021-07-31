import React from 'react'

const UserInfo = ({ userInfo, setUserInfo, setIsLogin }) => {
  console.log(userInfo)

  const handleClick = () => {
    setUserInfo({})
    setIsLogin(false)
    localStorage.removeItem('token')
  }
  return (
    <div>
      <p>{userInfo.fullName}</p>
      <button onClick={handleClick}>log out</button>
    </div>
  )
}

export default UserInfo
