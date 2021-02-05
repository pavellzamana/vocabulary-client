import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { IMapItem } from '@/features/Map/mapSlice';

import styles from './addModalForm.less';

export interface IProps {
  mapItem: IMapItem;
  handleRemove: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AddModalForm: React.FC<IProps> = (props) => {
  const { mapItem, handleRemove, handleChange } = props;

  return (
    <div className={styles.form}>
      {Object.keys(mapItem).map(
        (key) =>
          key !== 'id' && (
            <input
              className={styles.input}
              name={key}
              onChange={handleChange}
              key={key}
            />
          )
      )}
      <button className={styles.button} onClick={handleRemove}>
        <DeleteOutlined />
      </button>
    </div>
  );
};
