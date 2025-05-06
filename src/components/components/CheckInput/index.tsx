import Checkbox, { CheckboxProps } from '@mui/material/Checkbox'
import styled from '@emotion/styled'
import checkBoxIcon from 'src/assets/check-box.svg'
import checkBoxEnabledIcon from 'src/assets/check-box-enabled.svg'

export const CheckUnCheckedIcon = styled('span')(() => ({
  borderRadius: 3,
  width: 22,
  height: 22,
  backgroundColor: '#c7c7c7',
  backgroundImage: `url(${checkBoxIcon})`,
}))

export const CheckCheckedIcon = styled(CheckUnCheckedIcon)({
  '&:before': {
    display: 'block',
    width: 22,
    height: 22,
    backgroundImage: `url(${checkBoxEnabledIcon})`,
    content: '""',
  },
})

export const CustomCheckbox = (props: CheckboxProps) => {
  return (
    <Checkbox
      sx={{
        '&:hover': { bgcolor: 'transparent' },
      }}
      disableRipple
      color='default'
      checkedIcon={<CheckCheckedIcon />}
      icon={<CheckUnCheckedIcon />}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      {...props}
    />
  )
}

export default CustomCheckbox
