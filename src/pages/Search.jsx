import { Close } from '@material-ui/icons'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setProduct } from '../features/product/product'
import './Search.scss'

const Search = ({ setShowSearch }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')

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
      dispatch(setProduct(data.data))
    }
    fetchProduct()
    setShowSearch(false)
    history.push('/')

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
