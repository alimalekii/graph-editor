import './style.scss'

import React, { useEffect, useState } from 'react'

import Backdrop from '@mui/material/Backdrop'
import Button from 'src/components/Button'
import { t } from 'i18next'
import { useLocation } from 'react-router-dom'

interface ILoding {
  hasBackDrop?: boolean
  setIsAvtive?: React.Dispatch<React.SetStateAction<boolean>>
  loadingText?: string
  isActive: boolean
  percent?: number
  onStop?: () => void
}

const Loading: React.FC<ILoding> = props => {
  const { hasBackDrop = false, setIsAvtive, loadingText, isActive, percent, onStop } = props
  const [isHoverd, setIsHoverd] = useState<boolean>(false)
  const [resetAnim, setResetAnim] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(false)
  const [hasTabbar, setHasTabar] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (!isActive) {
      return
    }
    const interval = setInterval(() => {
      setResetAnim(prev => !prev)
    }, 1200)

    return () => {
      clearInterval(interval)
    }
  }, [isActive])

  useEffect(() => {
    setDisabled(false)
  }, [isActive])

  useEffect(() => {
    if (location.pathname === '/') {
      return setHasTabar(false)
    }
    const token = localStorage.getItem('bdm-token-dont-touch')
    if (!token) {
      return setHasTabar(false)
    }
    setHasTabar(true)
  }, [location.pathname])

  return isActive ? (
    <Backdrop
      open={isActive}
      className='loading'
      sx={{
        backgroundColor: 'rgba(0,0,0,0.35)',
        maxHeight: hasTabbar ? 'calc(100vh - 67px)' : 'calc(100vh - 38px)',
      }}
      onClick={() => {
        hasBackDrop && setIsAvtive ? setIsAvtive(false) : null
      }}
    >
      <div className={`loading-shape ${resetAnim ? 'revert-anim' : ''}`}>
        {Array.from(Array(12).keys()).map((item: number) => (
          <div key={item} className={`loading-shape__box box-${item}`}>
            <div className={'loading-shape__circle'} />
          </div>
        ))}
      </div>
      <div
        className='loading__box'
        onMouseEnter={() => {
          setIsHoverd(true)
        }}
        onMouseLeave={() => {
          setIsHoverd(false)
        }}
      >
        <div
          className='loading__box__filled'
          style={{
            width: `${Math.min(percent ?? 0, 100)}%`,
          }}
        />
        <h4 className='loading__box__text'>
          {isHoverd && percent
            ? Math.min(Math.floor(percent), 100) + ' %'
            : t<string>(loadingText ?? 'loading')}
        </h4>
      </div>
      {onStop && (
        <Button
          onClick={() => {
            onStop()
            setDisabled(true)
          }}
          className='stop-btn'
          disabled={disabled}
        >
          {t<string>('stop-filtering')}
        </Button>
      )}
    </Backdrop>
  ) : null
}

export default Loading
