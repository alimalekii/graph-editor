import './style.scss'
import { FC } from 'react'
import {
  INotification,
  NOTIFICATION_CATEGORY,
  NOTIFICATION_MODE,
  // NOTIFICATION_LEVEL,
} from 'src/types'
import { useNavigate } from 'react-router-dom'
import Tooltip from '@mui/material/Tooltip'

import filterIcon from 'src/assets/goldenFilter.svg'
import graphIcon from 'src/assets/graphIcon.svg'
import InfrastructureIcon from 'src/assets/setting-blue.svg'
import scheduleIcon from 'src/assets/reporter.svg'
import exportIcon from 'src/assets/exportIcon.svg'
// import userIcon from 'src/assets/user-blue.svg'

import { formatTimeAgo } from 'src/lib/utils'

const NOTIF_ICONS = {
  [NOTIFICATION_CATEGORY.FILTER]: filterIcon,
  [NOTIFICATION_CATEGORY.GRAPH]: graphIcon,
  [NOTIFICATION_CATEGORY.SCHEDUEL]: scheduleIcon,
  [NOTIFICATION_CATEGORY.INFRASTRUCTURE]: InfrastructureIcon,
  [NOTIFICATION_CATEGORY.EXPORT]: exportIcon,
} as Record<NOTIFICATION_CATEGORY, any>

const NOTIF_MODE = {
  [NOTIFICATION_MODE.ERROR]: 'error',
  [NOTIFICATION_MODE.ALERT]: 'alert',
  [NOTIFICATION_MODE.INFO]: 'info',
  [NOTIFICATION_MODE.WARNING]: 'warning',
}

const NotificationCard: FC<INotification> = props => {
  const navigate = useNavigate()
  const { title, content, timeStamp, read, mode, id, category } = props
  const trimmedMode = mode.trim() as NOTIFICATION_MODE
  const trimmedCategory = category.trim() as NOTIFICATION_CATEGORY

  return (
    <div
      className={`bdm-notif-card ${read ? 'read' : ''}`.trim()}
      onClick={() => navigate(`/notifications#${id}`)}
    >
      {/* shows level of urgency */}
      <span
        className={`bdm-notif-card__badge ${NOTIF_MODE[trimmedMode]} ${read ? 'read' : ''}`}
      ></span>

      {/* icon */}
      <div className='bdm-notif-card__icon'>
        <img src={NOTIF_ICONS[trimmedCategory]} alt={title} loading='lazy' width={24} height={24} />
      </div>

      {/* content */}
      <div className='bdm-notif-card__content'>
        <div className='bdm-notif-card__content__msg'>
          <div className='bdm-notif-card__content__msg__title'>
            <p>{title}</p>
          </div>
          <Tooltip title={content}>
            <div className='bdm-notif-card__content__msg__description'>
              <p>{content}</p>
            </div>
          </Tooltip>
        </div>
        <p className='bdm-notif-card__content__time'>{formatTimeAgo(timeStamp)}</p>
      </div>
    </div>
  )
}

export default NotificationCard
