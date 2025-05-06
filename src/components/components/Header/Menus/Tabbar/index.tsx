import './style.scss'
import { BDMTab } from 'src/types'
import TabItem from './TabItem'

interface ITabbarProps {
  tabs: Array<BDMTab>
  show: boolean
  onTabClick: (link: string) => void
  onTabClose: (id: number) => void
}

const Tabbar = ({ tabs, show, onTabClick, onTabClose }: ITabbarProps) => {
  return show ? (
    <div className='bdm-tab-bar'>
      {tabs.map(tab => (
        <TabItem tab={tab} key={tab.id} onTabClick={onTabClick} onTabClose={onTabClose} />
      ))}
    </div>
  ) : null
}

export default Tabbar
