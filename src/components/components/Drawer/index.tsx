import Backdrop from '@mui/material/Backdrop'
import ReactDOM from 'react-dom'
import { BDMContext } from 'src/App'
import { useContext } from 'react'

import './style.scss'

interface IDrawer {
  isOpen: boolean
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
  hasBackDrop?: boolean
  body: JSX.Element
  className?: string
  onCancel?: () => void
}

const Drawer = (props: IDrawer) => {
  const { isNavbarOpen } = useContext(BDMContext)
  const { isOpen, setIsOpen, hasBackDrop, body, className } = props

  const adjustedWith = `calc(100% - ${isNavbarOpen ? '245px' : '55px'})`

  return isOpen
    ? ReactDOM.createPortal(
        <Backdrop
          open={true}
          sx={{ zIndex: 'inherit' }}
          onClick={() => {
            hasBackDrop && setIsOpen ? setIsOpen(false) : null
          }}
        >
          <div
            className={`bdm-drawer ${className ? className : ''} `.trim()}
            style={{
              width: adjustedWith,
            }}
          >
            {body}
          </div>
        </Backdrop>,
        document.getElementById('portal') as HTMLElement,
      )
    : null
}

export default Drawer
