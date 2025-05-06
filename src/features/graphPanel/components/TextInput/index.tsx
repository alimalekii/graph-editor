import './style.scss';
import { t } from 'i18next';
import Tooltip from '@mui/material/Tooltip';

interface IBDMFilterTextInput {
  id?: string;
  value?: number | string;
  type?: 'text' | 'number';
  onChange?: any;
  placeholder?: string;
  label?: string;
  className?: string;
  autoComplete?: string;
  disabled?: boolean;
  onBlur?: (value: string) => void;
  tooltip?: string;
  required?: boolean;
  min?: string;
  max?: string;
  step?: string;
  dir?: string;
}

const TextInput = (props: IBDMFilterTextInput) => {
  const {
    id,
    value,
    type = 'text',
    autoComplete = 'off',
    dir = 'auto',
    onChange,
    placeholder,
    label,
    className,
    tooltip,
    min,
    max,
    step,
    required = false,
    onBlur,
    disabled,
    ...rest
  } = props;

  return (
    <div
      className={`bdm-filter-text-input ${className ? className : ''}`.trim()}
    >
      {label && (
        <Tooltip title={tooltip ?? ''}>
          <label htmlFor={id} className="bdm-filter-text-input__label">
            {t(label)}
          </label>
        </Tooltip>
      )}
      <input
        {...rest}
        id={id}
        dir={dir}
        value={value}
        type={type}
        onChange={onChange}
        placeholder={t(placeholder ?? '')}
        autoComplete={autoComplete}
        className={`bdm-filter-text-input__input ${
          disabled ? ' input-disabled' : ''
        }`.trim()}
        disabled={disabled}
        required={required}
        onBlur={(value) => onBlur?.(value.target.value)}
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
};

export default TextInput;
