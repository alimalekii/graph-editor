import './style.scss';

import React, { PropsWithChildren } from 'react';

type IButton = PropsWithChildren<{
  className?: string;
  disabled?: boolean;
  title?: string;
  icon?: any;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disableHover?: boolean;
}>;

const Button: React.FC<IButton> = (props) => {
  const {
    title,
    icon,
    className,
    disabled,
    children,
    disableHover = false,
    // onClick,
    ...rest
  } = props;
  return (
    <button
      {...rest}
      disabled={disabled}
      className={`bdm-btn${disabled ? ' bdm-btn__disabled' : ''} ${
        className ?? ''
      }`.trim()}
    >
      {disableHover && <div className="bdm-btn__hover" />}
      {icon}
      {title || children}
    </button>
  );
};

export default Button;
