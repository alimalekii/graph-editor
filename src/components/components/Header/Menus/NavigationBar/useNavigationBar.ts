import { useLocation } from 'react-router'
import { t } from 'i18next'
import { BDMRoutes } from 'src/constants'

const useNavigationBar = () => {
  const location = useLocation()

  const navigationItems = BDMRoutes()
    .filter(nav => !nav.isDisabled && nav.showOnNavbar)
    .map(nav => ({
      id: nav.id,
      path: nav.link,
      label: t<string>(nav.title),
      icon: nav.navbarIcon,
      disabledIcon: nav.navbardisabledIcon,
      enable: true,
      isSelected: location.pathname === '/' + nav.link,
      tab: nav.tab,
    }))

  return { navigationItems }
}

export default useNavigationBar
