import { Close } from '@material-ui/icons'
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setProduct } from '../features/product/product'
import './Search.scss'

const Search = ({ setShowSearch }) => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const products = useSelector(state => state.products)

  const handleSubmit = () => {
    const fetchProduct = async () => {
      const res = await fetch(`https://freeapi.code4func.com/api/v1/food/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ foodName: search })

      })
      const data = await res.json()
      console.log(data.data)
      dispatch(setProduct(data.data))
    }
    fetchProduct()
    setShowSearch(false)
  }
  return (
    <div className="search">
      <div className="search__container">
        <div className="search__close">
          <Close onClick={() => setShowSearch(false)} />
        </div>
        <form className="search__form" onSubmit={handleSubmit}>
          <p>Tìm kiếm món ăn</p>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        </form>
      </div>
    </div>
  )
}

export default Search
