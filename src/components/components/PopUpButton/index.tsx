import './style.scss'

import React, { useContext, useEffect, useState } from 'react'

import configIcon from 'src/assets/configMenu.svg'
import Tooltip from '@mui/material/Tooltip'
import { BDMContext } from 'src/App'
import { IBDMContext } from 'src/types'

export interface IPopUpButtonProps {
  top?: number
  bottom?: number
  left?: number
  right?: number
  zIndex?: number
  mainIcon?: string
  disable?: boolean
  actions: Array<{
    icon: string
    onClick: () => void
    tooltip?: string
    disable?: boolean
  }>
}

const PopUpButton: React.FC<IPopUpButtonProps> = props => {
  const { isNavbarOpen, hasNavbar } = useContext<IBDMContext>(BDMContext)
  const {
    top,
    bottom = 28,
    left,
    right = hasNavbar ? (isNavbarOpen ? 278 : 78) : 28,
    zIndex,
    mainIcon = configIcon,
    disable,
    actions,
  } = props
  const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false)

  const handleBackDrop = (e: any) => {
    const clsName = typeof e?.target?.className === 'string' ? e?.target?.className : ''
    if (clsName.includes('popup-btn')) {
      return
    }
    setIsPopUpOpen(false)
  }

  useEffect(() => {
    document.addEventListener('click', handleBackDrop)
    return () => {
      document.removeEventListener('click', handleBackDrop)
    }
  }, [])

  return (
    <div
      className={`bdm-popup-btn-wrapper${disable ? ' popup-disabled' : ''}`}
      style={{ top, bottom, left, right, zIndex }}
      onClick={() => (disable ? null : setIsPopUpOpen(prev => !prev))}
    >
      <img
        src={mainIcon}
        alt='pop-up-icon'
        className={`bdm-popup-btn-wrapper__main ${isPopUpOpen ? 'is-open' : ''}`.trim()}
      />
      {isPopUpOpen && (
        <div className='bdm-popup-btn-wrapper__children'>
          {actions.map((item, index) => (
            <Tooltip title={item.tooltip as string} key={index}>
              <div
                key={index}
                className={`bdm-popup-btn-wrapper__children__action${
                  item.disable ? ' action--disable' : ''
                }`}
                onClick={() => {
                  item.disable ? null : item.onClick(), setIsPopUpOpen(false)
                }}
              >
                <img src={item.icon} />
              </div>
            </Tooltip>
          ))}
        </div>
      )}
    </div>
  )
}

export default PopUpButton
