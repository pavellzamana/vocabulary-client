import React from 'react';
import { InputRow } from '@/components/InputRow/InputRow';
import { IMapItem } from '@/features/Map/mapSlice';
import styles from './editModalForm.less';

interface IProps {
  mapItem: IMapItem;
  handleEditChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EditModalForm: React.FC<IProps> = (props) => {
  const { mapItem, handleEditChange } = props;

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      {mapItem &&
        Object.keys(mapItem).map(
          (item) =>
            item !== 'id' &&
            item !== 'createdAt' &&
            item !== 'updatedAt' &&
              (
              <InputRow
                name={item}
                handleChange={handleEditChange}
                value={mapItem[item]}
                key={item}
              />
              )
        )}
    </form>
  );
};
