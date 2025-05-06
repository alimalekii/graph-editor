import React, { useEffect, useState, useContext, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { BDMContext } from 'src/App'
import { TABS } from 'src/types'
import { logout } from 'src/lib/utils'
import { useBDMDispatch, useBDMSelector } from 'src/lib/store/hooks'
import {
  selectTabs,
  removeTab,
  selectNotifications,
  navigateToTabV2,
  selectNotificationsTotal,
} from 'src/duck/bdmSlice'
import useEventListener from 'src/lib/hooks/useEventListener'
import { BDMRoutes, NOT_SHOWN_TABS_ON_TABBAR, mockData } from 'src/constants'
import { selectRawGraphData } from 'src/pages/GraphNew/duck/graphSlice'

const useHeader = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { setToken, setUser } = useContext(BDMContext)
  const [isUserMenuOpen, setUserIsMenuOpen] = useState(false)
  const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false)
  const [showTabbar, setShowTabbar] = useState(false)
  const [isNavbarOpen, setIsNavbarOpen] = useState(false)
  const dispatch = useBDMDispatch()
  const tabs = useBDMSelector(selectTabs)
  const notifications = useBDMSelector(selectNotifications)
  const notificationsTotal = useBDMSelector(selectNotificationsTotal)
  const rawGraphData = useBDMSelector(selectRawGraphData)

  const showNavbar = useMemo(
    () => isNavbarOpen && location.pathname !== '/login' && location.pathname !== '/',
    [isNavbarOpen, location.pathname],
  )
  const showNotifMenu = useMemo(
    () => isNotifMenuOpen && location.pathname !== '/login' && location.pathname !== '/',
    [isNotifMenuOpen, location.pathname],
  )

  const handleLogOut = () => {
    setToken('')
    setUser(undefined)
    setUserIsMenuOpen(false)
    logout()
  }

  const backDropHandler = (e: any) => {
    const clsName = typeof e?.target?.className === 'string' ? e?.target?.className : ''
    if (clsName.includes('bdm-header')) {
      return
    }
    setUserIsMenuOpen(false)
    setIsNotifMenuOpen(false)
    setIsNavbarOpen(false)
  }

  const HandleNotifMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    setIsNotifMenuOpen(prev => !prev)
    setUserIsMenuOpen(false)
  }

  const HandleUserMenu = () => {
    setUserIsMenuOpen(prev => !prev)
    setIsNotifMenuOpen(false)
  }

  const handleNavigationToSettings = () => {
    setUserIsMenuOpen(false)
    navigate('/setting')
  }

  const handleCloseMenus = (e: MouseEvent) => {
    const el = e.target as HTMLElement
    if (el.closest('div')?.className === 'bdm-header__notif-bell') {
      setIsNotifMenuOpen(prev => !prev)
      setIsNavbarOpen(false)
    }
  }

  const toggleNavbar = () => {
    setIsNavbarOpen(prevState => !prevState)
  }

  const handleTabSwitchAfterTabClose = (id: number) => {
    const tabIndex = tabs.findIndex(tab => tab.id === id)

    if (tabs.length === 0 || tabIndex === -1) {
      return
    } else if (tabs.length === 1) {
      navigate('/')
    } else if (tabs.length > 1 && tabIndex === 0) {
      navigate(tabs[tabIndex + 1].link)
    } else if (tabs.length > 1 && tabIndex > 0) {
      navigate(tabs[tabIndex - 1].link)
    }
  }

  const onTabClick = (link: string) => {
    navigate(link)
  }

  const onTabClose = (id: number) => {
    const isProccessTab = tabs.find(tab => tab.id === id)?.tab === TABS.UNIVERSAL_VIEW

    if (isProccessTab) {
      return
    }

    dispatch(removeTab(id))
    handleTabSwitchAfterTabClose(id)
    setIsNavbarOpen(false)
  }

  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/') {
      setIsNavbarOpen?.(false)
      setShowTabbar(false)
      return
    }

    setShowTabbar(true)

    const routes = BDMRoutes()

    const foundTab = routes.find(tab => {
      const path = location.pathname.split('/')[1]
      const link =
        tab.isDynamicRoute && tab.link.split('/').length > 1 ? tab.link.split('/')[1] : tab.link
      return link === path
    })

    const foundTitle = [...rawGraphData.edges, ...rawGraphData.nodes].find(
      item => item.id.toString() === location.pathname.split('/')[2],
    )?.label

    if (foundTab && !NOT_SHOWN_TABS_ON_TABBAR.includes(foundTab.tab)) {
      dispatch(
        navigateToTabV2({
          tab: foundTab.tab,
          link: foundTab.isDynamicRoute ? location.pathname : foundTab.link,
          title: foundTab.multiple && foundTitle ? foundTitle : foundTab.title,
        }),
      )
    }
  }, [location.pathname])

  useEventListener('click', backDropHandler)
  useEventListener('click', handleCloseMenus)

  return {
    user: mockData.user,
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
    showUserMenu: isUserMenuOpen,
    onTabClick,
    onTabClose,
  }
}

export default useHeader
