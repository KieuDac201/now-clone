import { Button } from '@material-ui/core'
import { DeleteForever } from '@material-ui/icons'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './Cart.scss'

const Cart = ({ carts }) => {

  const totalPriceCart = carts.reduce((a, b) => {
    return a + b?.price * b?.quantity
  }, 0)

  const removeProduct = (foodId) => {
    const token = localStorage.getItem("token");
    console.log(foodId);
    if (token) {
      fetch("https://freeapi.code4func.com/api/v1/order/delete", {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ foodId: foodId })
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Token is expired") {
            localStorage.removeItem("token");
            return;
          }
          console.log(data);
        })
        .catch((err) => console.log(err));
    }
  }

  const totalFormatPriceCart = totalPriceCart.toLocaleString('vi', { style: 'currency', currency: 'VND' });
  return (
    <div className="cart">
      <div className="cart__title">
        Giỏ hàng
      </div>
      <div className="cart__container">
        <div className="cart__main">
          <div className="cart__main-top">
            <p>Tên sản phẩm</p>
            <p>Đơn giá</p>
            <p>Số lượng </p>
            <p>Thành tiền </p>
            <p></p>
          </div>
          <div className="cart__main-list">
            {
              carts.map(({ foodId, foodName, images, price, quantity }) => {
                const formatPrice = price.toLocaleString('vi', { style: 'currency', currency: 'VND' });
                const formatTotalPrice = (price * quantity).toLocaleString('vi', { style: 'currency', currency: 'VND' });
                return <div className="cart__main-item" key={foodId}>
                  <div className="cart__main-img">
                    <img src={images[0].imageUrl} alt="" />
                    <p>{foodName}</p>
                  </div>
                  <div className="cart__main-price">
                    {formatPrice}
                  </div>
                  <div className="cart__main-quanity">
                    <button>-</button>
                    <div>{quantity}</div>
                    <button>+</button>
                  </div>
                  <div className="cart__main-totalPrice">{formatTotalPrice}</div>
                  <div className="cart__main-del" onClick={() => removeProduct(foodId)}>
                    <DeleteForever />
                  </div>
                </div>
              })
            }
          </div>
        </div>
        <div className="cart__right">
          <div className="cart__right-temp">
            <p>Tạm tính</p>
            <p>{totalFormatPriceCart}</p>
          </div>
          <div className="cart__right-discount">
            <p>Giảm giá</p>
            <p>0</p>
          </div>
          <div className="cart__right-totalCart">
            <p>Tổng cộng</p>
            <p>{totalFormatPriceCart}</p>
          </div>
          <div className="cart__right-btn">
            <Button variant="contained" color="secondary">
              Thanh toán
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
