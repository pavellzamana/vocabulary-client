import React from 'react';
import styles from './button.less';

interface IProps {
  buttonClassName?: string;
  buttonTextClassName?: string;
  type?: 'button' | 'reset' | 'submit';
  text?: string;
  isText?: boolean;
  children?: React.ReactNode;
  handleClick?: (event: React.FormEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<IProps> = (props) => {
  const {
    children = null,
    handleClick,
    buttonClassName = styles.button,
    buttonTextClassName,
    type,
    text,
    isText = false,
  } = props;

  return (
    <button
      className={buttonClassName}
      onClick={handleClick}
      type={type && type}
    >
      {isText && <span className={buttonTextClassName}>{text}</span>}
      {children}
    </button>
  );
};
