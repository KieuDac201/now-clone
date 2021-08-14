import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Detail from "./components/Detail";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "./features/cart/cart";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart.carts);

  const checkLogin = () => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("https://freeapi.code4func.com/api/v1/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Token is expired") {
            localStorage.removeItem("token");
            return;
          }
          setIsLogin(true);
          setUserInfo(data.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const fetchCart = () => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("https://freeapi.code4func.com/api/v1/order/shopping-cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Token is expired") {
            localStorage.removeItem("token");
            return;
          }
          dispatch(setCart(data.data.items));
        })
        .catch((err) => console.log(err));
    } else {
    }
  };
  useEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    fetchCart();
  }, [isLogin]);
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
          <Detail setIsLogin={setIsLogin} setUserInfo={setUserInfo} />
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
        <Route path="/cart">
          <Cart carts={carts} isLogin={isLogin} />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
