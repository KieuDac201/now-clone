import { Facebook, Instagram } from '@material-ui/icons'
import React from 'react'
import './Footer.scss'
import logo from '../images/logo-bottom.png'
import chungNhan from '../images/chungnhan.jpg'
import chPlay from '../images/app-store.png'
import appStore from '../images/play-store.png'
import appGallery from '../images/app-gallery.png'


const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="item">
          <h4>Công ty</h4>
          <div className="links">
            <a>Gioi thiệu</a>
            <a>Trung tâm trợ giúp</a>
            <a>Quy chế</a>
            <a>Điều khoản sử dụng</a>
            <a>Bảo mật thông tin</a>
            <a>Giai quyết khiếu nại</a>
            <a>Liên hệ</a>
            <a>Hợp tác nhân viên giao nhận</a>
            <a>Đăng ký quán</a>
            <a>ShopeeFood Academy</a>
          </div>
        </div>
        <div className="item">
          <h4>Now app</h4>
          <div className="links">
            <a href="https://itunes.apple.com/us/app/deliverynow/id1137866760" target="_blank"><img src={appStore} alt="" /></a>
            <a href="https://play.google.com/store/apps/details?id=com.deliverynow" target="_blank"><img src={chPlay} alt="" /></a>
            <a href="https://appgallery.huawei.com/#/app/C102401853" target="_blank"><img src={appGallery} alt="" /></a>
          </div>
        </div>
        <div className="item">
          <img src={logo} alt="" className="logo" />
          <span>© 2021 Now - A Foody Corporation</span>
          <div className="sci">
            <a href=""><Facebook /></a>
            <a href=""><Instagram /></a>
          </div>
        </div>
        <div className="item">
          <h4>Địa chỉ công ty</h4>
          <p>Công Ty Cổ Phần Foody</p>
          <p>Lầu G, Tòa nhà Jabes 1</p>
          <p>số 244 đường Cống Quỳnh, phường Phạm Ngũ Lão, Quận 1, TPHCM</p>
          <p>Giấy CN ĐKDN số: 0311828036</p>
          <p>do Sở Kế hoạch và Đầu tư TP.HCM cấp ngày 11/6/2012,</p>
          <p>sửa đổi lần thứ 23, ngày 10/12/2020</p>
          <p>Số điện thoại: 1900 2042</p>
          <p>Email: <a>info@shopeefood.vn</a></p>
          <img src={chungNhan} alt="" className="chungnhan" />
        </div>
      </div>
    </footer>
  )
}

export default Footer
