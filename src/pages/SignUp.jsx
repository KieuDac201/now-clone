import { Lock, MailOutline, Person } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import './Form.scss'

const SignUp = () => {
  return (
    <div className="formContainer">
      <form className="form">
        <h3 className="form__title">
          Sign up
        </h3>
        <div className="form__group">
          <Person className="form__group-icon" />
          <input type="text" placeholder="Name" name="name" />
        </div>
        <div className="form__group">
          <MailOutline className="form__group-icon" />
          <input type="text" placeholder="Email" name="email" />
        </div>
        <div className="form__group">
          <Lock className="form__group-icon" />
          <input type="password" placeholder="Password" name="password" />
        </div>
        <div className="form__group">
          <Lock className="form__group-icon" />
          <input type="password" placeholder="Confirm password" name="password2" />
        </div>

        <p className="form__signUp">
          Bạn đã có tài khoản <Link to="/login">Đăng nhập</Link>
        </p>

        <button className="form__btn">
          Đăng ký
        </button>

        <p className="form__desc">
          Chúng tôi không sử dụng thông tin của bạn với bất kỳ mục đích nào. Bằng cách đăng nhập hoặc đăng ký, bạn đồng ý với Chính sách quy định của Foody
        </p>

      </form>
    </div>
  )
}

export default SignUp
