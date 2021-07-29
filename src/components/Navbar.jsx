import React from 'react'
import logo from '../images/logo.png'
import { Search, MoreHoriz, Menu, Close } from '@material-ui/icons';
import useAxios from '../hooks/useAxios';
import { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import './Navbar.scss'
import { Link } from 'react-router-dom';

function Navbar() {
    const { response, error, loading } = useAxios({ url: '/cate/list', method: 'get' })
    const [cates, setCates] = useState([])
    const [showMenuMore, setShowMenuMore] = useState(false)
    const [isMobile, setIsMoble] = useState(false)
    const [showMenu, setShowMenu] = useState(false)

    useEffect(() => {
        window.innerWidth <= 992 ? setIsMoble(true) : setIsMoble(false)
        window.onresize = () => {
            window.innerWidth <= 992 ? setIsMoble(true) : setIsMoble(false)
        }
    }, [])

    console.log(isMobile)

    useEffect(() => {
        if (response !== null) {
            setCates(response.data)
        }
    }, [response])


    return (
        <header>
            <nav className="navbar">
                <div className="navbar__logo">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>
                {(showMenu || !isMobile) && <ul className="navbar__menu">
                    <li className="navbar__item">
                        <Link to="">Đồ ăn</Link>
                    </li>
                    <li className="navbar__item">
                        <Link to="">Đồ uống</Link>
                    </li>
                    <li className="navbar__item">
                        <Link to="">Đồ chay</Link>
                    </li>
                    <li className="navbar__item">
                        <Link to="">Bánh kem</Link>
                    </li>
                    <li className="navbar__item">
                        <Link to="">Homemade</Link>
                    </li>
                    <li className="navbar__item">
                        <Link to="">Vỉa hè</Link>
                    </li>
                    <li className="navbar__item">
                        <Link to="">Pizza/Burger</Link>
                    </li>
                    <div className="navbar__menu-moreIcon" onClick={() => setShowMenuMore(!showMenuMore)}>
                        {!isMobile && <MoreHoriz style={{ fontSize: 26 }} />}
                        {
                            (showMenuMore || isMobile) && <div className={isMobile ? '' : "navbar__menu-more"}>
                                <li className="navbar__item">
                                    <Link to="">Món lẩu</Link>
                                </li>
                                <li className="navbar__item">
                                    <Link to="">Mì phở</Link>
                                </li>
                                <li className="navbar__item">
                                    <Link to="">Bia</Link>
                                </li>
                                <li className="navbar__item">
                                    <Link to="">Rau củ</Link>
                                </li>
                                <li className="navbar__item">
                                    <Link to="">Trái cây</Link>
                                </li>
                                <li className="navbar__item">
                                    <Link to="">Gia vị</Link>
                                </li>
                            </div>
                        }
                    </div>

                </ul>}
                <div className="navbar__search">
                    <Search />
                </div>
                <div className="navbar__btn">
                    <Link to="/login"><Button variant="outlined" color="primary">Đăng nhập</Button></Link>
                </div>
                <div className="navbar__menuIcon" onClick={() => setShowMenu(!showMenu)}>
                    {showMenu ? <Close style={{ fontSize: 26 }} /> : <Menu style={{ fontSize: 26 }} />}
                </div>
            </nav>
        </header>
    )
}

export default Navbar
