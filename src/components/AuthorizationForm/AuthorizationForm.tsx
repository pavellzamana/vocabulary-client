import React from 'react';
import { Button } from '../Button/Button';
import styles from './authorizationForm.less';

interface IProps {
  handleSubmit: (event: React.FormEvent<HTMLButtonElement>) => void;
  children: React.ReactNode[] | React.ReactNode;
  title: string;
  buttonText: string;
}

export const AuthorizationForm: React.FC<IProps> = (props) => {
  const { children, title, buttonText, handleSubmit } = props;

  return (
    <div className={styles.body}>
      <div className={styles.header}>{title}</div>
      <form className={styles.form}>
        {children}

        <Button
          handleClick={handleSubmit}
          isText
          buttonClassName={styles.button}
          text={buttonText}
          type="submit"
        />
      </form>
    </div>
  );
};
