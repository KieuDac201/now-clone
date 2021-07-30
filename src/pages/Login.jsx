import { TextField } from '@material-ui/core'
import { Lock, MailOutline } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import './Form.scss'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"

const schema = yup.object().shape({
  email: yup.string().required('Vui lòng nhập email').email('Email không hợp lệ'),
  password: yup.string().required('Vui lòng nhập password'),
});
const options = { resolver: yupResolver(schema) }

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm(options)
  const onSubmit = data => console.log(data)

  return (
    <div className="formContainer" noValidate autoComplete="off">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="form__title">
          Đăng nhập
        </h3>
        <div className="form__group">
          <MailOutline className="form__group-icon" />
          <input type="text" placeholder="Email" name="email" {...register("email")} />

        </div>
        <p className="form__error">{errors.email?.message}</p>
        <div className="form__group">
          <Lock className="form__group-icon" />
          <input type="password" placeholder="Mật khẩu" name="password" {...register("password")} />

        </div>
        <p className="form__error">{errors.password?.message}</p>
        <div className="form__checkbox">
          <label htmlFor="Checkbox">
            <input type="checkbox" name="saveInfo" id="Checkbox" />
            <p>Lưu thông tin đăng nhập</p>
          </label>

          <a href="">Quên mật khẩu ?</a>
        </div>
        <button className="form__btn" type="submit">
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
