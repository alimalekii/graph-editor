import { useState } from 'react'
import { Trans } from 'react-i18next'
import closeIcon from 'src/assets/crossBlackSmallIcon.svg'
import { BDMTab, TABS } from 'src/types'
import './style.scss'

const TabItem = ({
  tab,
  onTabClick,
  onTabClose,
}: {
  tab: BDMTab
  onTabClick: (link: string) => void
  onTabClose: (id: number) => void
}) => {
  const [isHoverd, setIsHoverd] = useState(false)
  return (
    <div
      className={`bdm-tab-bar__tab ${tab.active ? 'active' : ''}`.trim()}
      key={tab.id}
      onClick={e => {
        e.stopPropagation()
        onTabClick(tab.link)
      }}
      onMouseEnter={() => setIsHoverd(true)}
      onMouseLeave={() => setIsHoverd(false)}
    >
      <div className='bdm-tab-bar__tab__icon'>
        <img
          src={!tab.active && isHoverd ? tab.tabbarWhiteIcon : tab.tabbarBlackIcon}
          alt={tab.title}
        />
      </div>
      <div className='bdm-tab-bar__tab__title'>
        <Trans i18nKey={tab.title} />
      </div>
      <div
        className={`bdm-tab-bar__tab__close ${tab.tab === TABS.UNIVERSAL_VIEW ? 'hidden' : ''}`}
        onClick={e => {
          e.stopPropagation()
          onTabClose(tab.id)
        }}
      >
        <img src={closeIcon} alt='close' />
      </div>
    </div>
  )
}

export default TabItem
