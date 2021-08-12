import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Home.scss'
import { setProduct } from '../features/product/product'
import { ArrowUpward } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

const Home = () => {

  const dispatch = useDispatch()
  const products = useSelector(state => state.products)
  const [page, setPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  console.log('re-render', products)

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      const res = await fetch(`https://freeapi.code4func.com/api/v1/food/list/${page}/30`)
      const data = await res.json()
      console.log(data.data)
      dispatch(setProduct([...products, ...data.data]))
      setLoading(false)
    }
    fetchProduct()
  }, [currentPage])

  const handleLoadMore = () => {
    setPage(products[products.length - 1].createdAt)
    setCurrentPage(currentPage + 1)
  }

  const handleGotop = () => {
    window.scrollTo(0, 0)
  }

  return (
    <div className="home">
      <div className="home__container">
        <div className="home__title">
          Welcome to my restaurant
        </div>
        <div className="home__products">
          {
            products && products.map(product => {
              const formatPrice = product.price.toLocaleString('vi', { style: 'currency', currency: 'VND' });
              return <div className="home__product" key={product.foodId + uuidv4()}>
                <Link to={`/detail/${product.foodId}`}>
                  <div className="home__product-img">
                    <img src={product.images[0].imageUrl} alt={product.foodName} />
                  </div>
                  <div className="home__product-name">
                    {product.foodName}
                  </div>
                  <div className="home__product-price">
                    {formatPrice}
                  </div>
                </Link>
              </div>

            })
          }
        </div>
        <div className="home__pagination">
          <button className="home__pagination-loadmore" onClick={handleLoadMore}>
            {loading ? 'loading...' : 'load more'}
          </button>
          <button className="home__pagination-gotop" onClick={handleGotop}><ArrowUpward /></button>
        </div>
      </div>
    </div>
  )
}

export default Home
