import { t } from 'i18next'

const HeaderTitleIcon = ({ show }: { show: boolean }) => {
  return show ? <div className='bdm-header__title'>{t<string>('mainTitle')}</div> : null
}

export default HeaderTitleIcon
