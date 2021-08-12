import { ExpandMore, PersonOutline } from '@material-ui/icons'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './User.scss'

const User = ({ userInfo, setUserInfo, setIsLogin }) => {
  const [showMenu, setShowMenu] = useState(false)

  const hanleLogout = () => {
    setUserInfo({})
    setIsLogin(false)
    setShowMenu(false)
    localStorage.removeItem('token')
  }

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }
  let emailSliced = userInfo?.email?.slice(0, userInfo?.email.indexOf('@'))
  return (
    <div className="user" >
      <div className="user__btn" onClick={toggleMenu} >
        <PersonOutline className="user__btn-icon" />
        <div className="user__btn-name">{emailSliced}</div>
        <ExpandMore className="user__btn-icon user__btn-iconDown" />
      </div>

      {
        showMenu && <div className="user__menu">
          <Link to="/profile" onClick={() => setShowMenu(false)}>
            <div className="user__menu-item" >
              Thông tin
            </div>
          </Link>
          <div className="user__menu-item red" onClick={hanleLogout}>
            Đăng xuất
          </div>
        </div>
      }
    </div>
  )
}

export default User
