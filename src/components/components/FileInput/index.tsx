import './style.scss'

import { ErrorMessage } from 'formik'
import Tooltip from '@mui/material/Tooltip'
import { useRef } from 'react'

interface IFileInput {
  className?: string
  placeholder: string
  required?: boolean
  label?: string
  disabled?: boolean
  value?: string
  field: any
  form: any
  onBlur?: (value: string) => void
  tooltip?: string
  accept: string
  onChange?: (e: any) => void
  Icon: any
  fileName: string
}

const FileInput: React.FC<IFileInput> = props => {
  const {
    className,
    placeholder,
    required,
    label,
    disabled,
    value,
    field,
    form,
    onBlur,
    tooltip,
    accept,
    onChange,
    fileName,
  } = props

  const inputRef = useRef<HTMLInputElement>(null)

  const hasError = !!form.errors[field.name]

  return (
    <div className={`file-input ${className ?? ''}`.trim()}>
      <div className='file-input__section'>
        <Tooltip title={tooltip ?? ''}>
          <p
            className={`file-input__section__label  ${hasError ? ' with-error' : ''}${
              required ? ' input-required' : ''
            }`}
          >
            {label}
          </p>
        </Tooltip>

        <div className='file-input__section__input-wrapper'>
          <div>
            <label
              htmlFor={field.name}
              className={`file-input__section__input  ${hasError ? ' with-error' : ''}`}
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  inputRef.current?.click()
                }
              }}
            >
              {placeholder}
            </label>

            <input
              ref={inputRef}
              {...field}
              hidden
              onBlur={value => onBlur?.(value.target.value)}
              value={value ?? field.value}
              id={field.name}
              disabled={disabled}
              required={required}
              type='file'
              accept={accept}
              onChange={onChange}
            />
          </div>
          <p className=''>{fileName}</p>
        </div>
      </div>
      <ErrorMessage name={field.name} component='div' className='file-input__error-msg' />
    </div>
  )
}

export default FileInput
