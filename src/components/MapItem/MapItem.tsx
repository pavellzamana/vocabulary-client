import React from 'react';
import { MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';

import { IMapItem } from '@/features/Map/mapSlice';
import styles from './mapItem.less';

interface IProps {
  mapItem: IMapItem;
  handleEditOpen: (mapItem: IMapItem) => void;
  handleEditRemove: (mapItem: IMapItem) => void;
}

export const MapItem: React.FC<IProps> = (props) => {
  const { mapItem, handleEditOpen, handleEditRemove } = props;

  const menu: JSX.Element = (
    <Menu>
      <Menu.Item onClick={() => handleEditOpen(mapItem)}>
        <EditOutlined />
        Edit
      </Menu.Item>
      <Menu.Item onClick={() => handleEditRemove(mapItem)}>
        <DeleteOutlined />
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <li className={styles.mapItem}>
      <div className={styles.word}>{mapItem.word}</div>
      <div className={styles.transcription}>{mapItem.transcription}</div>
      <div className={styles.translate}>{mapItem.translation}</div>
      <div className={styles.options}>
        <Dropdown overlay={menu} placement="bottomRight" arrow>
          <MoreOutlined />
        </Dropdown>
      </div>
    </li>
  );
};
