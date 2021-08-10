import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Detail from "./components/Detail";
import Footer from "./components/Footer";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const checkLogin = () => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      fetch("https://freeapi.code4func.com/api/v1/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setIsLogin(true);
          setUserInfo(data.data);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);
  return (
    <>
      <Navbar
        isLogin={isLogin}
        userInfo={userInfo}
        setIsLogin={setIsLogin}
        setUserInfo={setUserInfo}
      />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/detail/:id">
          <Detail />
        </Route>
        <Route path="/login">
          <Login setIsLogin={setIsLogin} setUserInfo={setUserInfo} />
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/profile">
          <Profile userInfo={userInfo} />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
