import './style.scss'

import Backdrop from '@mui/material/Backdrop'
import Button from 'src/components/Button'
import React from 'react'
import ReactDOM from 'react-dom'
import { t } from 'i18next'

interface IModalProps {
  isOpen: boolean
  hasBackDrop?: boolean
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  onConfirmFullFill?: (res: boolean | string) => void
  onCancel?: () => void
  onConfirm?: () => void
  confirmText?: string
  cancleText?: string
  body: JSX.Element
  removeButtons?: boolean
  className?: string
}

const Modal: React.FC<IModalProps> = props => {
  const {
    isOpen,
    hasBackDrop,
    setIsOpen,
    title,
    onConfirm,
    onCancel,
    body,
    confirmText,
    cancleText,
    removeButtons = false,
    className,
  } = props

  const handleConfrim = async () => {
    await onConfirm?.()
    setIsOpen?.(false)
  }
  const handleCancle = async () => {
    await onCancel?.()
    setIsOpen?.(false)
  }

  return isOpen
    ? ReactDOM.createPortal(
        <Backdrop
          open={true}
          sx={{ zIndex: 'inherit' }}
          onClick={() => {
            hasBackDrop && setIsOpen ? setIsOpen?.(false) : null
          }}
        >
          <div className={`bdm-modal ${className ? className : ''}`.trim()}>
            <h2 className='bdm-modal__title'>{title}</h2>
            {body}
            {!removeButtons && (
              <div className='bdm-modal__btns'>
                <Button onClick={handleConfrim} className='bdm-modal__btns__confirm'>
                  {confirmText ?? t<string>('yes')}
                </Button>
                <Button onClick={handleCancle} className='bdm-modal__btns__cancel'>
                  {cancleText ?? t<string>('no')}
                </Button>
              </div>
            )}
          </div>
        </Backdrop>,
        document.getElementById('portal') as HTMLElement,
      )
    : null
}

export default Modal
