import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import './Detail.scss'
import SimpleImageSlider from "react-simple-image-slider";
import { Button } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setCart, addToCart } from '../features/cart/cart';
import { ToastContainer, toast } from 'react-toastify';




const Detail = ({ setIsLogin, setUserInfo }) => {

  const param = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const [detailProduct, setDetailProduct] = useState(null)
  const products = useSelector(state => state.product.products)

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://freeapi.code4func.com/api/v1/food/detail/${param.id}`)
      const data = await res.json()
      setDetailProduct(data.data)
    }
    fetchProduct()
  }, [param.id])

  const handleAddToCart = (foodId) => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`https://freeapi.code4func.com/api/v1/order/add-to-cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ foodId: foodId })
      })
        .then((res) => {
          return res.json()
        })
        .then(data => {
          if (data.message === 'Token is expired') {
            localStorage.removeItem("token");
            setIsLogin(false)
            setUserInfo({})
            history.push('/login')
          }
          console.log(products)
          const productAdded = products.find(product => product.foodId === foodId)
          console.log(productAdded, 'dac')
          dispatch(addToCart(productAdded))
          toast.success('Thêm vào giỏ hàng thành công!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });

        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      history.push('/login')
    }

  }

  const images = [];
  const formatPrice = detailProduct && detailProduct.price.toLocaleString('vi', { style: 'currency', currency: 'VND' });

  return (
    <>
      <ToastContainer />
      <div className="detail">
        {

          detailProduct && <>
            {
              detailProduct.images.forEach((img) => {
                images.push({ url: img.imageUrl })
              })
            }
            <div className="detail__img">
              <SimpleImageSlider
                width={400}
                height={300}
                images={images}
                showBullets={true}
                showNavs={true}
              />
            </div>
            <div className="detail__content">
              <div className="detail__content-name">{detailProduct.foodName}</div>
              <div className="detail__content-price">
                {formatPrice}
              </div>
              <Button variant="contained" color="secondary" startIcon={<AddShoppingCart />} onClick={() => handleAddToCart(param.id)}>Đặt hàng</Button>
              <p className="detail__content-desc">
                {detailProduct.description}
              </p>

            </div>

          </>
        }
      </div>
    </>
  )
}

export default Detail
