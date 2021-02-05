import React from 'react';
import styles from './modal.less';

interface IProps {
  children: React.ReactNode;
  modalBodyClassName?: string;
}
export const Modal: React.FC<IProps> = ({ children, modalBodyClassName }) => (
  <div className={styles.popup}>
    <div className={modalBodyClassName}>{children}</div>
  </div>
);
