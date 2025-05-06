import './style.scss'
import { memo } from 'react'
import Tabbar from './Menus/Tabbar'
import NotificationMenu from './Menus/NotificationMenu'
import UsetMenu from './Menus/UserMenu'
import NotificationIcon from './Icons/NotifIcon'
import MenuIcon from './Icons/MenuIcon'
import SearchIcon from './Icons/SearchIcon'
import MessageIcon from './Icons/MessageIcon'
import UserIcon from './Icons/UserIcon'
import NavigationBar from './Menus/NavigationBar'
import HeaderTitleIcon from './Icons/HeaderTitleIcon'

import useHeader from './logic'

const Header = () => {
  const {
    user,
    notifications,
    notificationsTotal,
    tabs,
    toggleNavbar,
    handleNavigationToSettings,
    HandleUserMenu,
    HandleNotifMenu,
    handleLogOut,
    showTabbar,
    setIsNavbarOpen,
    showNavbar,
    showNotifMenu,
    showUserMenu,
    onTabClick,
    onTabClose,
  } = useHeader()

  return (
    <>
      <div className={`bdm-header ${user && showTabbar ? 'active' : ''}`}>
        <div className='bdm-header__header'>
          {user && (
            <>
              <UserIcon show={true} user={user} HandleUserMenu={HandleUserMenu} />
              <MessageIcon show={false} />
              <NotificationIcon
                show={showTabbar}
                HandleNotifMenu={HandleNotifMenu}
                notificationsCount={notificationsTotal}
              />
              <SearchIcon show={false} />
              <MenuIcon show={showTabbar} toggleNavbar={toggleNavbar} />
            </>
          )}
          <HeaderTitleIcon show={true} />
        </div>
        <Tabbar show={showTabbar} tabs={tabs} onTabClick={onTabClick} onTabClose={onTabClose} />
      </div>

      {/* menu */}
      <UsetMenu
        show={showUserMenu}
        handleNavigationToSettings={handleNavigationToSettings}
        user={user}
        handleLogOut={handleLogOut}
      />
      <NotificationMenu show={showNotifMenu} notifications={notifications} />
      <NavigationBar isOpen={showNavbar} setIsOpen={setIsNavbarOpen} />
    </>
  )
}

export default memo(Header)
