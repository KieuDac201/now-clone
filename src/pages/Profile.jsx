import React from 'react'
import { useHistory } from 'react-router-dom'
import './Profile.scss'

const Profile = ({ userInfo }) => {
  const history = useHistory()
  if (Object.keys(userInfo).length === 0) {
    history.push('/')
  }
  return (
    <div className="profile">
      <div>Họ tên : {userInfo.fullName}</div>
      <div>Email : {userInfo.email}</div>
      <div>Số điện thoại : {userInfo.phone}</div>
      <div>Địa chỉ : {userInfo.address}</div>
      <div>Vai trò : {userInfo.role}</div>

    </div>
  )
}

export default Profile
