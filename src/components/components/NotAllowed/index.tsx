import './style.scss'

import Button from 'src/components/Button'
import { useNavigate } from 'react-router'

const NotFoundComponent = () => {
  const navigate = useNavigate()

  return (
    <div className='not-allowed-container'>
      <Button onClick={() => navigate('/')} className='not-allowed-container__back-btn'>
        بازگشت به صفحه اصلی
      </Button>
    </div>
  )
}

export default NotFoundComponent
