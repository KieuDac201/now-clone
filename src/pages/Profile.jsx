import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './Profile.scss'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaUpdate } from "../schema";

const options = { resolver: yupResolver(schemaUpdate) };

const Profile = ({ userInfo }) => {
  const history = useHistory()
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(options);

  if (Object.keys(userInfo).length === 0) {
    history.push('/')
  }


  const onSubmit = (data) => {
    console.log(data)
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true)
      fetch("https://freeapi.code4func.com/api/v1/user/profile/update", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((info) => {
          setResponse(info)
          setLoading(false)
          setTimeout(() => {
            setShowForm(false)
            setResponse(null)
          }, 2000)
        })
        .catch((err) => {
          setError(err)
          setLoading(false)
        });
    } else {
      history.push('/login')
    }
  }
  const { fullName, email, phone, address } = userInfo
  return (
    <div className="profile">

      <div className="profile__info">
        <h3 className="profile__title">Profile</h3>
        <div className="left">
          <p>Họ và tên:</p>
          <p>Email:</p>
          <p>Số điện thoại:</p>
          <p>Địa chỉ:</p>
        </div>
        <div className="right">
          <p>{fullName}</p>
          <p>{email}</p>
          <p>{phone}</p>
          <p>{address}</p>
        </div>
        <div className="profile__btn" onClick={() => setShowForm(true)}>
          <Button variant="outlined" color="secondary">Cập nhật thông tin</Button>
        </div>
      </div>

      {
        showForm && <form className="profile__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="profile__form-group">
            <label htmlFor="name">Name</label>
            <input type="text" placeholder={fullName} {...register("fullName")} />
            <p className="error">{errors.fullName?.message}</p>
          </div>
          <div className="profile__form-group">
            <label htmlFor="name">Số điện thoại</label>
            <input type="text" placeholder={phone} {...register("phone")} />
            <p className="error">{errors.phone?.message}</p>
          </div>
          <div className="profile__form-group">
            <label htmlFor="name">Địa chỉ</label>
            <input type="text" placeholder={address} {...register("address")} />
            <p className="error">{errors.address?.message}</p>
          </div>
          <div className="profile__form-btn">
            <Button variant="outlined" color="secondary" type="submit">{loading ? 'Loading...' : 'Xác nhận'}</Button>
          </div>
          {response ? <div className="profile__state">{response.message}</div> : null}
        </form>
      }
    </div>
  )
}

export default Profile
