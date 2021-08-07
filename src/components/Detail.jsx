import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Detail.scss'
import SimpleImageSlider from "react-simple-image-slider";
import { Button } from '@material-ui/core';



const Detail = () => {

  const param = useParams()
  const [detailProduct, setDetailProduct] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://freeapi.code4func.com/api/v1/food/detail/${param.id}`)
      const data = await res.json()
      console.log('da')
      console.log(data.data)
      setDetailProduct(data.data)
    }
    fetchProduct()
  }, [param.id])

  const images = [];
  const formatPrice = detailProduct && detailProduct.price.toLocaleString('vi', { style: 'currency', currency: 'VND' });

  return (
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
            <p className="detail__content-desc">
              {detailProduct.description}
            </p>
            <Button variant="contained" color="secondary">Dat hang</Button>
          </div>

        </>
      }
    </div>
  )
}

export default Detail
