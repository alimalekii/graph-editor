import messageIcon from 'src/assets/message.svg'
import Tooltip from '@mui/material/Tooltip'

const MessageIcon = ({ show }: { show: boolean }) => {
  return show ? (
    <div className='bdm-header__message'>
      <Tooltip title={'پیام ها'}>
        <img
          src={messageIcon}
          alt='userpic'
          className='bdm-header__message__img'
          loading='lazy'
          width={16}
          height={16}
        />
      </Tooltip>
    </div>
  ) : null
}

export default MessageIcon
