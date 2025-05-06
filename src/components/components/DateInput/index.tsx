import './style.scss'

import { ErrorMessage } from 'formik'
import React, { SetStateAction, Dispatch } from 'react'
import Tooltip from '@mui/material/Tooltip'
import DatePicker from 'react-datepicker2'
import moment, { Moment } from 'moment-jalaali'
// import Switch from '@mui/material/Switch'
// import { Trans } from 'react-i18next'

interface IDateInput {
  className?: string
  required?: boolean
  label?: string
  disabled?: boolean
  value?: string
  field: any
  form: any
  tooltip?: string
  name?: string
  isGregorian?: boolean
  timePicker?: boolean
  setIsGregorian: Dispatch<SetStateAction<boolean>>
  showTimeConvertor?: boolean
  min?: Moment
}

// const timeFormat = (isGregorian: boolean) => (isGregorian ? 'YYYY/M/D' : 'jYYYY/jM/jD')

const DateInput: React.FC<IDateInput> = props => {
  const {
    className,
    required,
    disabled,
    tooltip,
    name,
    label,
    field,
    form,
    isGregorian = true,
    timePicker = true,
    min,
    // setIsGregorian,
    // showTimeConvertor,
    // value,
  } = props

  const hasError = !!form.errors[field.name]

  return (
    <div className={`date-input ${className ?? ''}`.trim()}>
      <div className='date-input__section'>
        {label && (
          <Tooltip title={tooltip ?? ''}>
            <label
              htmlFor={field.name}
              className={`date-input__section__label${hasError ? ' with-error' : ''}${
                required ? ' input-required' : ''
              }`}
            >
              {label}
            </label>
          </Tooltip>
        )}
        <DatePicker
          // {...field}
          className={`date-input__section__input${hasError ? ' with-error' : ''}${
            disabled ? ' input-disabled' : ''
          }`}
          datePickerClass='date-input__date-picker'
          calendarClass='date-input__calender'
          isGregorian={isGregorian}
          timePicker={timePicker}
          onChange={val => {
            if (!val) {
              return
            }
            // const value = isGregorian
            //   ? val?.locale('es')?.format(timeFormat(isGregorian))
            //   : val?.locale('fa')?.format(timeFormat(isGregorian))

            form.setFieldValue(field.name, val?.locale('es')?.toISOString())
          }}
          value={field.value ? moment(field.value) : undefined}
          min={min}
        />
      </div>
      <ErrorMessage name={name ?? field.name} component='div' className='date-input__error-msg' />
      {/* {showTimeConvertor && (
        <div className='date-input__date-format'>
          <Trans i18nKey='filter-persian' />
          <Switch checked={isGregorian} onChange={() => setIsGregorian(prev => !prev)} />
          <Trans i18nKey='filter-gregorian' />
        </div>
      )} */}
    </div>
  )
}

export default DateInput
