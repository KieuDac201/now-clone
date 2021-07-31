import { Lock, MailOutline, Person, Visibility, VisibilityOff } from '@material-ui/icons'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Form.scss'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaSignUp } from '../schema'


const options = { resolver: yupResolver(schemaSignUp) }

const SignUp = () => {

  const { register, handleSubmit, formState: { errors } } = useForm(options)
  const [loading, setLoading] = useState(false)
  const form = useForm()
  const history = useHistory()
  const [showPass, setShowPass] = useState(false)
  const [showPass2, setShowPass2] = useState(false)

  const onSubmit = data => {
    const dataCopy = { email: data.email, password: data.password, FullName: data.firstName + ' ' + data.lastName, phone: data.phone, address: data.address }
    console.log(dataCopy)
    setLoading(true)
    fetch('https://freeapi.code4func.com/api/v1/user/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataCopy)
    })
      .then(res => res.json())
      .then(info => {
        console.log(info)
        setLoading(false)
        history.push('/login')

      })
      .catch(err => {
        setLoading(false)
        console.log(err)
      })
  }

  return (
    <div className="formContainer">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="form__title">
          Đăng ký
        </h3>

        <div className="form__groups">
          <div>
            <div className="form__group">
              <Person className="form__group-icon" />
              <input type="text" placeholder="Họ" {...register("firstName")} />
            </div>
            <p className="form__error">{errors.firstName?.message}</p>
          </div>
          <div>
            <div className="form__group">
              <Person className="form__group-icon" />
              <input type="text" placeholder="Tên" {...register("lastName")} />
            </div>
            <p className="form__error">{errors.lastName?.message}</p>
          </div>
        </div>


        <div className="form__group">
          <Person className="form__group-icon" />
          <input type="text" placeholder="Số điện thoại" {...register("phone")} />
        </div>
        <p className="form__error">{errors.phone?.message}</p>

        <div className="form__group">
          <Person className="form__group-icon" />
          <input type="text" placeholder="Địa chỉ" {...register("address")} />
        </div>
        <p className="form__error">{errors.address?.message}</p>

        <div className="form__group">
          <MailOutline className="form__group-icon" />
          <input type="text" placeholder="Email" name="email" {...register("email")} />

        </div>
        <p className="form__error">{errors.email?.message}</p>
        <div className="form__group">
          <Lock className="form__group-icon" />
          <input type={showPass ? 'text' : 'password'} placeholder="Mật khẩu" name="password" {...register("password")} />
          {showPass ? <Visibility className="form__group-icon2" onClick={() => setShowPass(false)} /> : <VisibilityOff className="form__group-icon2" onClick={() => setShowPass(true)} />}
        </div>

        <p className="form__error">{errors.password?.message}</p>
        <div className="form__group">
          <Lock className="form__group-icon" />
          <input type={showPass2 ? 'text' : 'password'} placeholder="Xác nhận mật khẩu" name="password2" {...register("password2")} />
          {showPass2 ? <Visibility className="form__group-icon2" onClick={() => setShowPass2(false)} /> : <VisibilityOff className="form__group-icon2" onClick={() => setShowPass2(true)} />}
        </div>
        <p className="form__error">{errors.password2?.message}</p>



        <p className="form__signUp">
          Bạn đã có tài khoản <Link to="/login">Đăng nhập</Link>
        </p>

        <button className="form__btn" type="submit">
          {loading ? 'Loading...' : 'Đăng ký'}
        </button>

        <p className="form__desc">
          Chúng tôi không sử dụng thông tin của bạn với bất kỳ mục đích nào. Bằng cách đăng nhập hoặc đăng ký, bạn đồng ý với Chính sách quy định của Foody
        </p>

      </form>
    </div>
  )
}

export default SignUp
