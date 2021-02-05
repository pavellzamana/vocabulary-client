import React from 'react';
import { IMapItem } from '@/features/Map/mapSlice';

import styles from './addModalHeader.less';

interface IProps {
  mapItem: IMapItem;
}
export const AddModalHeader: React.FC<IProps> = ({ mapItem }) => (
  <div className={styles.header}>
    {Object.keys(mapItem).map(
      (key) => key != 'id' && <div key={key}>{key}</div>
    )}
  </div>
);
