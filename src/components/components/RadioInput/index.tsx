import Radio, { RadioProps } from '@mui/material/Radio'
import styled from '@emotion/styled'
import RadioButton from 'src/assets/radio-button.svg'
import RadioButtonEnabled from 'src/assets/radio-button-enabled.svg'

export const RadioUnCheckedIcon = styled('span')(() => ({
  borderRadius: '50%',
  width: 22,
  height: 22,
  backgroundColor: '#C7c7c7',
  backgroundImage: `url(${RadioButton})`,
}))

export const RadioCheckedIcon = styled(RadioUnCheckedIcon)({
  '&:before': {
    display: 'block',
    width: 22,
    height: 22,
    backgroundImage: `url(${RadioButtonEnabled})`,
    content: '""',
  },
})

export const CustomRadio = (props: RadioProps) => {
  return (
    <Radio
      disableRipple
      color='default'
      checkedIcon={<RadioCheckedIcon />}
      icon={<RadioUnCheckedIcon />}
      {...props}
    />
  )
}
export default CustomRadio
