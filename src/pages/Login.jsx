import {
  Lock,
  MailOutline,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Form.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaLogin } from "../schema";

const options = { resolver: yupResolver(schemaLogin) };

const Login = ({ setIsLogin, setUserInfo }) => {
  const [loginError, setLoginError] = useState({ email: "", password: "" });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(options);
  const history = useHistory();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false)


  const onSubmit = (data) => {
    setLoginError({ email: "", password: "" });
    console.log(data);
    setLoading(true)
    fetch("https://freeapi.code4func.com/api/v1/user/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((info) => {
        if (info.code === 500) {
          setLoginError({ password: "", email: info.message });
        }
        if (info.code === 401) {
          setLoginError({ email: "", password: info.message });
        }
        if (info.code === 200) {
          localStorage.setItem("token", info.data.token);
          setIsLogin(true);
          setUserInfo(info.data);
          history.push("/");
        }
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
      });
  };

  return (
    <div className="formContainer" noValidate autoComplete="off">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="form__title">Đăng nhập</h3>
        <div className="form__group">
          <MailOutline className="form__group-icon" />
          <input
            type="text"
            placeholder="Email"
            name="email"
            {...register("email")}
          />
        </div>
        <p className="form__error">
          {errors.email?.message}
          {loginError.email}
        </p>
        <div className="form__group">
          <Lock className="form__group-icon" />
          <input
            type={showPass ? "text" : "password"}
            placeholder="Mật khẩu"
            name="password"
            {...register("password")}
          />
          {showPass ? (
            <Visibility
              className="form__group-icon2"
              onClick={() => setShowPass(false)}
            />
          ) : (
            <VisibilityOff
              className="form__group-icon2"
              onClick={() => setShowPass(true)}
            />
          )}
        </div>
        <p className="form__error">
          {errors.password?.message}
          {loginError.password}
        </p>
        <div className="form__checkbox">
          <label htmlFor="Checkbox">
            <input type="checkbox" name="saveInfo" id="Checkbox" />
            <p>Lưu thông tin đăng nhập</p>
          </label>
          <a href="">Quên mật khẩu ?</a>
        </div>
        <button className="form__btn" type="submit">
          {loading ? 'Loading...' : 'Đăng nhập'}
        </button>
        <p className="form__signUp">
          Bạn chưa có tài khoản <Link to="/sign-up">Đăng ký</Link>
        </p>
        <p className="form__desc">
          Chúng tôi không sử dụng thông tin của bạn với bất kỳ mục đích nào.
          Bằng cách đăng nhập hoặc đăng ký, bạn đồng ý với Chính sách quy định
          của Foody
        </p>
      </form>
    </div>
  );
};

export default Login;
