import { Link } from 'react-router-dom'
import { t } from 'i18next'
import NotificationCard from '../NotificationCard'
import { INotification } from 'src/types'
import { NOTIFICATION_LIST_MENU_NUMBER } from 'src/constants'

const NotificationMenu = ({
  show,
  notifications,
}: {
  show: boolean
  notifications: Array<INotification>
}) => {
  return show ? (
    <>
      <div className='bdm-header__notifications'>
        {notifications.length > 0 ? (
          <div className='bdm-header__notifications__list'>
            {[...notifications]
              .sort((a, b) => Number(a.read) - Number(b.read))
              .sort((a, b) => new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime())
              .slice(0, NOTIFICATION_LIST_MENU_NUMBER)
              .map(notif => (
                <NotificationCard {...notif} key={notif.id + notif.timeStamp} />
              ))}
          </div>
        ) : (
          <div className='bdm-header__notifications__list--empty'>
            <h4>{t('notification-empty-text')}</h4>
          </div>
        )}
        <div className='bdm-header__notifications__actions'>
          {notifications.length > 0 && <Link to='/notifications'>مشاهده همه</Link>}
        </div>
      </div>
    </>
  ) : null
}

export default NotificationMenu
