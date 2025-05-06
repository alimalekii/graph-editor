import userPic from 'src/assets/userPic.svg'
import Tooltip from '@mui/material/Tooltip'
import { IBDMContext } from 'src/types'

const UserIcon = ({
  show,
  user,
  HandleUserMenu,
}: {
  show: boolean
  user: IBDMContext['user']
  HandleUserMenu: () => void
}) => {
  return show ? (
    <div className='bdm-header__user' onClick={HandleUserMenu}>
      <Tooltip title={user?.user_name}>
        <img
          src={userPic}
          alt='userpic'
          className='bdm-header__user__img'
          loading='lazy'
          width={20}
          height={20}
        />
      </Tooltip>
    </div>
  ) : null
}

export default UserIcon
