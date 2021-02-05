import React from 'react';
import { guid } from '@/helpers/guid';
import styles from './inputRow.less';

export interface IProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
  type?: string;
  label?: string;
  wrapperClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
}

export const InputRow: React.FC<IProps> = (props) => {
  const {
    name,
    value,
    label = name,
    type = 'text',
    handleChange,
    wrapperClassName = styles.wrapper,
    inputClassName = styles.input,
    labelClassName = styles.label,
  } = props;
  const id: string = guid();

  return (
    <div className={wrapperClassName}>
      <label htmlFor={id} className={labelClassName}>
        {label && label}
      </label>
      <input
        id={id}
        className={inputClassName}
        type={type}
        name={name}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};
