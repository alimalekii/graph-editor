import './style.scss';
import { t } from 'i18next';
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from 'react';

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
  regex?: RegExp;
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
    regex,
    ...rest
  } = props;

  const [isRegexMatch, setIsRegexMatch] = useState(true);

  useEffect(() => {
    if (!regex || !value || typeof value === 'number') {
      setIsRegexMatch(true);
      return;
    }
    const timer = setTimeout(() => {
      setIsRegexMatch(regex.test(value));
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return (
    <div
      className={`bdm-graph-setting-text-input ${className ? className : ''} ${
        regex ? (isRegexMatch ? '' : 'error') : ''
      }`.trim()}
    >
      {label && (
        <Tooltip title={tooltip ?? ''}>
          <label htmlFor={id} className="bdm-graph-setting-text-input__label">
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
        className={`bdm-graph-setting-text-input__input ${
          disabled ? ' input-disabled' : ''
        }`.trim()}
        disabled={disabled}
        required={required}
        onBlur={(value) => {
          onBlur?.(value.target.value);
        }}
        min={min}
        max={max}
        step={step}
        tabIndex={1}
      />
    </div>
  );
};

export default TextInput;
