import './style.scss'
import { ToastContainer } from 'react-toastify'

const BDMToastContainer = () => {
  return (
    <ToastContainer
      position='bottom-left'
      autoClose={5000}
      newestOnTop
      rtl
      draggable
      pauseOnHover
      theme='colored'
      closeOnClick
      hideProgressBar={false}
      icon={true}
      closeButton={true}
    />
  )
}

export default BDMToastContainer
