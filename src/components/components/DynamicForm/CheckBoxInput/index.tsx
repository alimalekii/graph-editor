import { Field, ErrorMessage } from 'formik'
import Tooltip from '@mui/material/Tooltip'

interface ICheckBoxInput {
  className?: string
  placeholder?: string
  required?: boolean
  label?: string
  type?: string
  disabled?: boolean
  value?: string
  form?: any
  tooltip?: string
  name: string
  error?: string
  touched?: boolean
}

const CheckboxInput = (props: ICheckBoxInput) => {
  const {
    className,
    label,
    // type,
    required,
    disabled,
    tooltip,
    placeholder,
    name,
    error,
    touched,
    ...rest
  } = props
  const hasError = error && touched

  return (
    <div className={`text-input ${className ?? ''}`.trim()}>
      <div className='text-input__section'>
        {label && (
          <Tooltip title={tooltip ?? ''}>
            <label
              htmlFor={name}
              className={`text-input__section__label${hasError ? ' with-error' : ''}${
                required ? ' input-required' : ''
              }`}
            >
              {label}
            </label>
          </Tooltip>
        )}
        <Field
          {...rest}
          dir='auto'
          placeholder={placeholder}
          id={name}
          disabled={disabled}
          required={required}
          name={name}
          type='checkbox'
          autoComplete='off'
          className={`text-input__section__input${hasError ? ' with-error' : ''}${
            disabled ? ' input-disabled' : ''
          }`}
        />
      </div>
      <ErrorMessage name={name} component='div' className='text-input__error-msg' />
    </div>
  )
}

export default CheckboxInput
