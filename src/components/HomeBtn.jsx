import { Button } from '@material-ui/core'
import React from 'react'

const HomeBtn = ({ text, link }) => {
  return (
    <div className="home__cate-item">
      <Button variant="outlined" color="primary">
        Đồ ăn
      </Button>
    </div>
  )
}

export default HomeBtn
