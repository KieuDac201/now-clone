import React from "react";
import logo from "../images/logo.png";
import { Menu, Close, SearchOutlined, ShoppingCart } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import "./Navbar.scss";
import { Link, useHistory } from "react-router-dom";
import User from "./User";
import Search from "../pages/Search";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from '../features/product/product'
import Cart from "./Cart";

function Navbar({ isLogin, userInfo, setIsLogin, setUserInfo }) {

    const [showMenu, setShowMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false)
    const [cates, setCates] = useState([])
    const dispatch = useDispatch()
    const history = useHistory()
    const cartLength = useSelector((state) => state.cart.carts.length);

    useEffect(() => {
        const fetchCate = async () => {
            const res = await fetch(`https://freeapi.code4func.com/api/v1/cate/list`)
            const data = await res.json()
            setCates(data.data)
        }
        fetchCate()

    }, []);
    useEffect(() => {
        const fetchCate = async () => {
            const res = await fetch(`https://freeapi.code4func.com/api/v1/cate/list`)
            const data = await res.json()
            setCates(data.data)
        }
        fetchCate()

    }, []);

    const handleClick = (cateId) => {
        console.log(cateId)
        const fetchProduct = async () => {
            const res = await fetch(`https://freeapi.code4func.com/api/v1/cate/food/${cateId}/0/30`)
            const data = await res.json()
            console.log(data.data)
            if (data.data) {
                dispatch(setProduct(data.data))
            }
            history.push('/')
        }
        fetchProduct()
        setShowMenu(false)
    }

    return (
        <header>
            <nav className="navbar">
                <div className="navbar__logo">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>
                {showMenu && (
                    <ul className="navbar__menu">
                        {
                            cates.map(item => <li className="navbar__item" onClick={() => handleClick(item.cateId)} key={item.cateId}>
                                {item.cateName}
                            </li>)
                        }
                        <Close style={{ fontSize: 26 }} className="navbar__menu-close" onClick={() => setShowMenu(false)} />
                    </ul>
                )}
                <Link to="/cart" className="navbar__cart">
                    <ShoppingCart className="navbar__cart-icon" />
                    <div className="navbar__cart-bagde">{cartLength}</div>
                </Link>
                <div className="navbar__search" onClick={() => setShowSearch(true)}>
                    <SearchOutlined />
                </div>
                {
                    showSearch && <Search setShowSearch={setShowSearch} />
                }
                <div className="navbar__btn">
                    {isLogin ? (
                        <User
                            userInfo={userInfo}
                            setIsLogin={setIsLogin}
                            setUserInfo={setUserInfo}
                        />
                    ) : (
                        <Link to="/login">
                            <Button variant="outlined" color="primary" className="btn">
                                Đăng nhập
                            </Button>
                        </Link>
                    )}
                </div>
                <div
                    className="navbar__menuIcon"
                    onClick={() => setShowMenu(true)}
                >
                    <Menu style={{ fontSize: 26 }} />
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
