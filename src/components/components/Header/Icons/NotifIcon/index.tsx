import Tooltip from '@mui/material/Tooltip'
import Badge from '@mui/material/Badge'
import notif from 'src/assets/notif-bell.svg'
// import { MAX_NOTIFICATION_COUNT_HEADER } from 'src/constants'

// const handleBadgeContent = (notifications: Array<INotification>) => {
//   const notifLength: string | number = notifications.length
//   return notifLength > MAX_NOTIFICATION_COUNT_HEADER
//     ? '+' + MAX_NOTIFICATION_COUNT_HEADER.toLocaleString('fa')
//     : notifLength.toLocaleString('fa')
// }

const NotificationIcon = ({
  show,
  HandleNotifMenu,
  notificationsCount,
}: {
  show: boolean
  HandleNotifMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  notificationsCount: number
}) => {
  return show ? (
    <div className='bdm-header__notif-bell' onClick={HandleNotifMenu}>
      <Tooltip title={'اعلانات'}>
        <Badge
          color='error'
          onClick={HandleNotifMenu}
          badgeContent={notificationsCount}
          max={99}
          // badgeContent={handleBadgeContent(notifications)}
        >
          <img
            src={notif}
            alt='userpic'
            className='bdm-header__notif-bell__img'
            loading='lazy'
            width={18}
            height={18}
          />
        </Badge>
      </Tooltip>
    </div>
  ) : null
}

export default NotificationIcon
