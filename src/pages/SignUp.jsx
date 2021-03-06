import {
  Lock,
  MailOutline,
  Person,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Form.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaSignUp } from "../schema";

const options = { resolver: yupResolver(schemaSignUp) };

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(options);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  const [dataCitys, setDataCitys] = useState([]);
  const [dataDistricts, setDataDistricts] = useState([]);
  const [dataAddress, setDataAddress] = useState([]);


  const fetchAddress = () => {
    fetch("https://provinces.open-api.vn/api/?depth=2")
      .then((res) => res.json())
      .then((data) => {
        setDataAddress(data);
        const citys = data.map((item) => ({
          label: item.name,
          value: item.codename,
        }));
        setDataCitys(citys);
        setDataDistricts(data[0].districts);
        console.log(dataCitys);
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = (data) => {

    const dataCopy = {
      email: data.email,
      password: data.password,
      FullName: data.firstName + " " + data.lastName,
      phone: data.phone,
      address: data.district + " " + data.city,
    };

    setLoading(true);
    fetch("https://freeapi.code4func.com/api/v1/user/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataCopy),
    })
      .then((res) => res.json())
      .then((info) => {
        setLoading(false);
        history.push("/login");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleOnChange = (e) => {
    const cityFiltered = dataAddress.filter((i) => i.name === e.target.value);
    console.log(cityFiltered[0].districts);
    setDataDistricts(cityFiltered[0].districts);
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  return (
    <div className="formContainer">
      <form className="form" onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <h3 className="form__title">????ng k??</h3>

        <div className="form__groups">
          <div>
            <div className="form__group">
              <Person className="form__group-icon" />
              <input type="text" placeholder="H???" {...register("firstName")} autoComplete='off' />
            </div>
            <p className="form__error">{errors.firstName?.message}</p>
          </div>
          <div>
            <div className="form__group">
              <Person className="form__group-icon" />
              <input type="text" placeholder="T??n" {...register("lastName")} />
            </div>
            <p className="form__error">{errors.lastName?.message}</p>
          </div>
        </div>

        <div className="form__group">
          <Person className="form__group-icon" />
          <input
            type="text"
            placeholder="S??? ??i???n tho???i"
            {...register("phone")}
          />
        </div>
        <p className="form__error">{errors.phone?.message}</p>

        <div className="form__groups">
          <div>
            <div className="form__group">
              <Person className="form__group-icon" />
              <select
                {...register("city")}
                placeholder="city"
                onChange={handleOnChange}
              >
                {dataCitys.map((i, index) => {
                  return (
                    <option value={i.label} key={i.codename}>
                      {i.label}
                    </option>
                  );
                })}
              </select>
            </div>
            <p className="form__error">{errors.city?.message}</p>
          </div>
          <div>
            <div className="form__group">
              <Person className="form__group-icon" />
              <select name="" id="" {...register("district")}>
                {dataDistricts.map((i) => {
                  return (
                    <option value={i.name} key={i.code}>
                      {i.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <p className="form__error">{errors.district?.message}</p>
          </div>
        </div>
        <p className="form__error">{errors.address?.message}</p>

        <div className="form__group">
          <MailOutline className="form__group-icon" />
          <input
            type="text"
            placeholder="Email"
            name="email"
            {...register("email")}
          />
        </div>
        <p className="form__error">{errors.email?.message}</p>
        <div className="form__group">
          <Lock className="form__group-icon" />
          <input
            type={showPass ? "text" : "password"}
            placeholder="M???t kh???u"
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

        <p className="form__error">{errors.password?.message}</p>
        <div className="form__group">
          <Lock className="form__group-icon" />
          <input
            type={showPass2 ? "text" : "password"}
            placeholder="X??c nh???n m???t kh???u"
            name="password2"
            {...register("password2")}
          />
          {showPass2 ? (
            <Visibility
              className="form__group-icon2"
              onClick={() => setShowPass2(false)}
            />
          ) : (
            <VisibilityOff
              className="form__group-icon2"
              onClick={() => setShowPass2(true)}
            />
          )}
        </div>
        <p className="form__error">{errors.password2?.message}</p>

        <p className="form__signUp">
          B???n ???? c?? t??i kho???n <Link to="/login">????ng nh???p</Link>
        </p>

        <button className="form__btn" type="submit">
          {loading ? "Loading..." : "????ng k??"}
        </button>

        <p className="form__desc">
          Ch??ng t??i kh??ng s??? d???ng th??ng tin c???a b???n v???i b???t k??? m???c ????ch n??o.
          B???ng c??ch ????ng nh???p ho???c ????ng k??, b???n ?????ng ?? v???i Ch??nh s??ch quy ?????nh
          c???a Foody
        </p>
      </form>
    </div >
  );
};

export default SignUp;
