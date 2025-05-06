import './style.scss'

import Button from 'src/components/Button'
import React from 'react'
import { useNavigate } from 'react-router'

const NotFoundComponent = () => {
  const navigate = useNavigate()

  return (
    <div className='not-found-container'>
      <Button onClick={() => navigate('/')} className='not-found-container__back-btn'>
        بازگشت به صفحه اصلی
      </Button>
    </div>
  )
}

export default NotFoundComponent
