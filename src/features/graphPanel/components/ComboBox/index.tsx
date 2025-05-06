import './style.scss'
import { t } from 'i18next'
import { Trans } from 'react-i18next'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

type ComboObjectOption = { title: string; value: string }
type ComboPlainOption = string

export enum COMBO_BOX_DICTIONARY {
  FA = 'fa_dictionary',
  EN = 'en_dictionary',
  META = 'meta_data_dictionary',
}

interface IComboBox {
  id: string
  value?: ComboObjectOption | null
  plainValue?: ComboPlainOption | null
  onChange: any
  options?: Array<ComboObjectOption>
  plainOptions?: Array<ComboPlainOption>
  placeholder: string
  inputValue?: string
  onInputChange?: () => void
  label: string
  className?: string
  dictionary?: COMBO_BOX_DICTIONARY
  style?: any
  freeSolo?: boolean
}

const ComboBox = (props: IComboBox) => {
  const {
    id,
    value,
    plainOptions,
    plainValue,
    options,
    onChange,
    inputValue,
    onInputChange,
    placeholder,
    label,
    className,
    dictionary,
    style,
    freeSolo = false,
  } = props

  return (
    <div
      className={`bdm-custom-mui-autocomplete ${className ? className : ''}`.trim()}
      style={style ? { ...style } : null}
    >
      <label htmlFor={id} className='bdm-custom-mui-autocomplete__label'>
        <Trans i18nKey={label} />
      </label>

      {options && (
        <Autocomplete
          // dir='ltr'
          disablePortal
          id={id}
          className='bdm-custom-mui-autocomplete__input'
          ListboxProps={{ style: { overflow: 'hidden' } }}
          getOptionLabel={opt => {
            const title = typeof opt === 'string' ? opt : opt.title
            return dictionary ? window?.[dictionary]?.[title] || title : title
          }}
          value={value}
          onChange={onChange}
          options={options}
          autoComplete
          fullWidth
          // open
          inputValue={inputValue}
          onInputChange={onInputChange}
          renderInput={param => {
            return (
              <TextField
                className='bdm-custom-mui-autocomplete__input__input'
                {...param}
                placeholder={t(placeholder)}
              />
            )
          }}
          isOptionEqualToValue={(option, value) => option.title === value.title}
          noOptionsText={t('not-found')}
          freeSolo={freeSolo}
        />
      )}

      {plainOptions && (
        <Autocomplete
          // dir='ltr'
          disablePortal
          id={id}
          className='bdm-custom-mui-autocomplete__input'
          ListboxProps={{ style: { overflow: 'hidden' } }}
          getOptionLabel={opt => (dictionary ? window?.[dictionary]?.[opt] || opt : opt)}
          value={plainValue}
          onChange={onChange}
          options={plainOptions}
          autoComplete
          fullWidth
          inputValue={inputValue}
          // open
          onInputChange={onInputChange}
          renderInput={param => {
            return (
              <TextField
                className='bdm-custom-mui-autocomplete__input__input'
                {...param}
                placeholder={t(placeholder)}
              />
            )
          }}
          isOptionEqualToValue={(option, value) => option === value}
          noOptionsText={t('not-found')}
        />
      )}
    </div>
  )
}

export default ComboBox
