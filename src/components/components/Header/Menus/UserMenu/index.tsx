import { t } from 'i18next'
import Button from 'src/components/Button'
import { IBDMContext } from 'src/types'

import { BDM_NEW_VERSION } from 'src/constants'
import userPic from 'src/assets/userPic.svg'

const UsetMenu = ({
  show,
  handleNavigationToSettings,
  user,
  handleLogOut,
}: {
  show: boolean
  handleNavigationToSettings: () => void
  user: IBDMContext['user']
  handleLogOut: () => void
}) => {
  handleNavigationToSettings
  return show ? (
    <div className='bdm-header__menu'>
      <img
        src={userPic}
        alt='userpic'
        className='bdm-header__menu__img'
        onClick={handleNavigationToSettings}
        loading='lazy'
        width={80}
        height={80}
      />
      <p className='bdm-header__menu__name'>
        {user ? user?.first_name + ' ' + user?.last_name : ''}
      </p>
      <p className='bdm-header__menu__position'>{user ? t<string>(user.position) : ''}</p>
      <Button className='bdm-header__menu__log-out-btn' onClick={handleLogOut}>
        {BDM_NEW_VERSION ? t<string>('menu-home-btn-title') : t<string>('log-out')}
      </Button>
    </div>
  ) : null
}

export default UsetMenu
