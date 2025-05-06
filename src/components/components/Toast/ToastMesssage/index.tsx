import './style.scss'

import { MouseEvent } from 'react'

// icons
import errorIcon from 'src/assets/toastErrorIcon.svg'
import infoIcon from 'src/assets/toastInfoIcon.svg'
import warningIcon from 'src/assets/toastWarningIcon.svg'
import successIcon from 'src/assets/toastSuccessIcon.svg'
// import toastCloseIcon from 'src/assets/toastClose.svg'
import ArrowIcon from 'src/assets/arrow.svg'

import { useNavigate } from 'react-router-dom'

const toastIcons = { success: successIcon, info: infoIcon, error: errorIcon, warning: warningIcon }

const BDMToast = ({
  msg,
  type,
  nav,
}: {
  msg: string
  type: 'success' | 'info' | 'error' | 'warning'
  nav?: string
}) => {
  const navigate = useNavigate()

  const handleNaviagate = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (nav) {
      navigate(nav)
    }
  }

  return (
    <div className='bdm-toast-container'>
      {/* <div className='bdm-toast-container__close'>
        <img src={toastCloseIcon} alt='close' />
      </div> */}
      <div className={`bdm-toast-container__border ${type}`}></div>
      <div className='bdm-toast-container__toast'>
        <div className='bdm-toast-container__toast__icon'>
          <img src={toastIcons[type]} alt={type} />
        </div>
        <div className='bdm-toast-container__toast__msg'>{msg}</div>
        {nav && (
          <div className='bdm-toast-container__toast__navigation' onClick={handleNaviagate}>
            <img src={ArrowIcon} alt='navigate' />
          </div>
        )}
      </div>
    </div>
  )
}

export default BDMToast
