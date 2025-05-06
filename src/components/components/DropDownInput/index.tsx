import './style.scss'

import { ErrorMessage, Field } from 'formik'

import React from 'react'
import Tooltip from '@mui/material/Tooltip'

interface IDropDownInput {
  className?: string
  required?: boolean
  label?: string
  placeholder?: string
  options: Array<{ title: string; value: any }>
  field: typeof Field
  form: any
  tooltip?: string
  disabled?: boolean
}

const DropDownInput: React.FC<IDropDownInput> = props => {
  const { className, required, label, disabled, placeholder, options, field, form, tooltip } = props

  const hasError = !!form.errors[field.name]

  return (
    <div className={`drop-down ${className ?? ''}`.trim()}>
      <div className='drop-down__section'>
        {label && (
          <Tooltip title={tooltip ?? ''}>
            <label
              htmlFor={field.name}
              className={`drop-down__section__label${hasError ? ' with-error' : ''}${
                required ? ' input-required' : ''
              }`}
            >
              {label}
            </label>
          </Tooltip>
        )}
        <div className='drop-down__section__wrapper'>
          <select
            {...field}
            id={field.name}
            placeholder={placeholder}
            required={required}
            className={`drop-down__section__wrapper__input${hasError ? ' with-error' : ''}${
              disabled ? ' input-disabled' : ''
            }`}
          >
            {options.map((item: { title: string; value: any }, index: number) => (
              <option key={index} value={item.value}>
                {item.title}
              </option>
            ))}
          </select>
          {/* {ButtonShape && (
            <div
              className="drop-down__section__wrapper__btn"
              onClick={() => {
                btnRef.current;
                btnRef.current?.focus();
              }}
            >
              {ButtonShape}
            </div>
          )} */}
        </div>
      </div>
      <ErrorMessage name={field.name} component='div' className='drop-down__error-msg' />
    </div>
  )
}

export default DropDownInput
