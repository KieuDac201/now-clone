import { Lock, MailOutline, Person } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import './Form.scss'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"

const schema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên'),
  email: yup.string().required('Vui lòng nhập email').email('Email không hợp lệ'),
  password: yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu tối thiếu 6 ký tự'),
  password2: yup.string().oneOf([yup.ref('password'), null], 'Mật khẩu không khớp').required('Vui lòng nhập xác nhận mật khẩu'),
});

const options = { resolver: yupResolver(schema) }

const SignUp = () => {

  const { register, handleSubmit, formState: { errors } } = useForm(options)
  const form = useForm()
  console.log(form)
  const onSubmit = data => console.log(data)

  return (
    <div className="formContainer">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="form__title">
          Đăng ký
        </h3>

        <div className="form__group">
          <Person className="form__group-icon" />
          <input type="text" placeholder="Họ tên" name="name" {...register("name")} />
        </div>
        <p className="form__error">{errors.name?.message}</p>

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
        <div className="form__group">
          <Lock className="form__group-icon" />
          <input type="password" placeholder="Xác nhận mật khẩu" name="password2" {...register("password2")} />
        </div>
        <p className="form__error">{errors.password2?.message}</p>



        <p className="form__signUp">
          Bạn đã có tài khoản <Link to="/login">Đăng nhập</Link>
        </p>

        <button className="form__btn" type="submit">
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
