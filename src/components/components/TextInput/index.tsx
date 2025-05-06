import './style.scss'

import { ErrorMessage } from 'formik'
import React from 'react'
import Tooltip from '@mui/material/Tooltip'

interface ITextInput {
  className?: string
  placeholder: string
  required?: boolean
  label?: string
  type?: string
  disabled?: boolean
  value?: string
  field: any
  form: any
  onBlur?: (value: string) => void
  tooltip?: string
  name?: string
  min?: string
  max?: string
  step?: string
}

const TextInput: React.FC<ITextInput> = props => {
  const {
    className,
    placeholder,
    required,
    label,
    type,
    disabled,
    value,
    field,
    form,
    onBlur,
    tooltip,
    name,
    min,
    max,
    step,
  } = props

  const hasError = !!form.errors[field.name]

  return (
    <div className={`text-input ${className ?? ''}`.trim()}>
      <div className='text-input__section'>
        {label && (
          <Tooltip title={tooltip ?? ''}>
            <label
              htmlFor={field.name}
              className={`text-input__section__label${hasError ? ' with-error' : ''}${
                required ? ' input-required' : ''
              }`}
            >
              {label}
            </label>
          </Tooltip>
        )}
        <input
          {...field}
          dir='auto'
          onBlur={value => onBlur?.(value.target.value)}
          value={value ?? field.value}
          placeholder={placeholder}
          id={field.name}
          disabled={disabled}
          required={required}
          type={type}
          autoComplete='off'
          min={min}
          max={max}
          step={step}
          className={`text-input__section__input${hasError ? ' with-error' : ''}${
            disabled ? ' input-disabled' : ''
          }`}
        />
      </div>
      <ErrorMessage name={name ?? field.name} component='div' className='text-input__error-msg' />
      <ErrorMessage name={name ?? field.name} component='div' className='text-input__error-msg' />
    </div>
  )
}

export default TextInput
