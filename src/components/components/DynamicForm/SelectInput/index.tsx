import { Field, ErrorMessage, useFormikContext } from 'formik'
import Tooltip from '@mui/material/Tooltip'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

import './style.scss'
import { SyntheticEvent } from 'react'

interface ISelectInput {
  className?: string
  name: string
  options: Array<{ label: string; value: string }>
  placeholder?: string
  required?: boolean
  label?: string
  type?: string
  disabled?: boolean
  value?: { label: string; value: string }
  form?: any
  tooltip?: string
  error?: string
  touched?: boolean
}

interface ICustomAutocomplete {
  id: string
  className?: string
  options: Array<{ label: string; value: string }>
  disabled?: boolean
  placeholder?: string
  onChoseValue: (v: any) => void
}

const CustomAutocomplete = (props: ICustomAutocomplete) => {
  const { id, options, className, disabled, placeholder, onChoseValue } = props

  return (
    <Autocomplete
      id={id}
      className={className}
      ListboxProps={{ style: { overflow: 'hidden' } }}
      getOptionLabel={opt => opt.label}
      onChange={(e: SyntheticEvent) => {
        const newValue = (e.target as HTMLInputElement).value
        onChoseValue(newValue)
      }}
      options={options}
      autoComplete
      fullWidth
      disablePortal
      disabled={disabled}
      renderInput={param => {
        return <TextField {...param} placeholder={placeholder} />
      }}
    />
  )
}

const SelectInput = (props: ISelectInput) => {
  const {
    name,
    label,
    options,
    className,
    required,
    disabled,
    tooltip,
    placeholder,
    error,
    touched,
    value,
    // form,
    ...rest
  } = props

  const setField = useFormikContext().setFieldValue

  const hasError = error && touched

  const onChoseValue = (newValue: number) => {
    setField(name, options[newValue].value)
  }

  return (
    <div className={`select-input ${className ?? ''}`.trim()}>
      <div className='select-input__section'>
        {label && (
          <Tooltip title={tooltip ?? ''}>
            <label
              htmlFor={name}
              className={`select-input__section__label${hasError ? ' with-error' : ''}${
                required ? ' input-required' : ''
              }`}
            >
              {label}
            </label>
          </Tooltip>
        )}
        <Field
          {...rest}
          id={name}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          className={`select-input__section__input ${hasError ? ' with-error' : ''}${
            disabled ? ' input-disabled' : ''
          }`}
          value={value}
          component={CustomAutocomplete}
          options={options}
          onChoseValue={onChoseValue}
        />
      </div>
      <ErrorMessage name={name} component='div' className='select-input__error-msg' />
    </div>
  )
}

export default SelectInput
