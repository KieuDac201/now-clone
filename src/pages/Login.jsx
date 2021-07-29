import { TextField } from '@material-ui/core'
import { Lock, MailOutline } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import './Form.scss'

const Login = () => {
  return (
    <div className="formContainer" noValidate autoComplete="off">
      <form className="form">
        <h3 className="form__title">
          Sign in
        </h3>
        <div className="form__group">
          <MailOutline className="form__group-icon" />
          <input type="text" placeholder="Email" name="email" />
        </div>
        <div className="form__group">
          <Lock className="form__group-icon" />
          <input type="password" placeholder="Password" name="password" />
        </div>
        <div className="form__checkbox">
          <label htmlFor="Checkbox">
            <input type="checkbox" name="saveInfo" id="Checkbox" />
            <p>Lưu thông tin đăng nhập</p>
          </label>

          <a href="">Quên mật khẩu ?</a>
        </div>
        <button className="form__btn">
          Đăng nhập
        </button>
        <p className="form__signUp">
          Bạn chưa có tài khoản <Link to="/sign-up">Đăng ký</Link>
        </p>
        <p className="form__desc">
          Chúng tôi không sử dụng thông tin của bạn với bất kỳ mục đích nào. Bằng cách đăng nhập hoặc đăng ký, bạn đồng ý với Chính sách quy định của Foody
        </p>

      </form>
    </div>
  )
}

export default Login
