import './style.scss'

import useNavigationBar from './useNavigationBar'
import { useNavigate } from 'react-router'

import { TABS } from 'src/types'
import { BDM_NEW_VERSION } from 'src/constants'
import { useBDMDispatch } from 'src/lib/store/hooks'
import { addTab } from 'src/duck/bdmSlice'

const NavigationBar = (props: {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { isOpen, setIsOpen } = props
  const { navigationItems } = useNavigationBar()
  const navigate = useNavigate()
  const dispatch = useBDMDispatch()

  const onNavItemClick = (item: typeof navigationItems[1]) => {
    if (BDM_NEW_VERSION && item.tab === TABS.HOME) {
      window.location.href = item.path
      return
    }

    dispatch(addTab({ tab: item.tab }))

    navigate(item.path)

    setIsOpen(false)
  }

  return isOpen ? (
    <div className='bdm-header__navbar'>
      <div className='navigation-bar'>
        {navigationItems.map((item, idx) => (
          <div key={idx} className='navigation-bar__item' onClick={() => onNavItemClick(item)}>
            <span className='navigation-bar__item__title'>{item.label}</span>
            <img src={item.icon} className='navigation-bar__item__img' loading='lazy' width={30} />
          </div>
        ))}
      </div>
    </div>
  ) : null
}

export default NavigationBar
