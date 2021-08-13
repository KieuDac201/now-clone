import React from "react";
import logo from "../images/logo.png";
import { Menu, Close, SearchOutlined } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import User from "./User";
import Search from "../pages/Search";
import { useDispatch } from "react-redux";
import { setProduct } from '../features/product/product'

function Navbar({ isLogin, userInfo, setIsLogin, setUserInfo }) {

    const [showMenuMore, setShowMenuMore] = useState(false);
    const [isMobile, setIsMoble] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false)
    const [cates, setCates] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchCate = async () => {
            const res = await fetch(`https://freeapi.code4func.com/api/v1/cate/list`)
            const data = await res.json()
            setCates(data.data)
        }
        fetchCate()

        window.innerWidth <= 992 ? setIsMoble(true) : setIsMoble(false);
    }, []);

    window.onresize = () => {
        window.innerWidth <= 992 ? setIsMoble(true) : setIsMoble(false);
    };

    const handleClick = (cateId) => {
        console.log(cateId)
        const fetchProduct = async () => {
            const res = await fetch(`https://freeapi.code4func.com/api/v1/cate/food/${cateId}/0/30`)
            const data = await res.json()
            console.log(data.data)
            if (data.data) {
                dispatch(setProduct(data.data))
            }
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
