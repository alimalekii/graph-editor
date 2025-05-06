import './style.scss'

import React, { ReactNode } from 'react'
import { PropsWithChildren } from 'react-transition-group/node_modules/@types/react'

type ILayoutProps = PropsWithChildren<{
  title?: string
  className?: string
}>

const Layout: React.FC<ILayoutProps> = props => {
  const { title, children, className } = props

  return (
    <div className={`bdm-page-layout ${className ?? ''}`.trim()}>
      <h2 className='bdm-page-layout__title'>{title}</h2>
      <div className='bdm-page-layout__content'>{children as ReactNode}</div>
    </div>
  )
}

export default Layout
