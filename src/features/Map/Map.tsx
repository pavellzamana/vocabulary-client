import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { EditOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import { MapHeader } from '@/components/MapHeader/MapHeader';
import { MapItem } from '@/components/MapItem/MapItem';
import { Modal } from '@/components/Modal/Modal';
import { Button } from '@/components/Button/Button';
import { EditModalForm } from '@/components/EditModalForm/EditModalForm';
import { deleteMapItem, fetchMap, IMapItem, updateMapItem } from './mapSlice';
import { AppDispath } from '@/app/store';
import { RootState } from '@/app/rootReducer';

import styles from './map.less';

export const Map: React.FC = () => {
  const dispatch: AppDispath = useDispatch();
  const map = useSelector((state: RootState) => state.map.map);
  const userId = useSelector<RootState, number| undefined>(state => state.authorization.id)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState({} as IMapItem);

  useEffect(() => {
    if (userId) {
      dispatch(fetchMap(userId))
    }
  }, []);

  function handleEditOpen(mapItem: IMapItem): void {
    setEditItem(mapItem);
    setIsModalOpen(true);
  }

  function handleEditChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEditItem({ ...editItem, [event.target.name]: event.target.value });
  }

  async function handleEditApply() {
    if (userId) {
      dispatch(updateMapItem(userId, editItem));
      handleEditCancel();
    }
  }

  function handleEditCancel() {
    setIsModalOpen(false);
  }

  function handleEditRemove(mapItem: IMapItem) {
    dispatch(deleteMapItem(mapItem.id));
  }

  return map.length ? (
    <div className={styles.mapContainer}>
      <MapHeader />

      <div className={styles.mapWrapper}>
        <ul className={styles.mapList}>
          {map.map((item) => (
            <MapItem
              key={item.id}
              mapItem={item}
              handleEditOpen={handleEditOpen}
              handleEditRemove={handleEditRemove}
            />
          ))}
        </ul>
      </div>

      {isModalOpen && (
        <Modal modalBodyClassName={styles.modalBody}>
          <EditModalForm handleEditChange={handleEditChange} mapItem={editItem} />
          <div className={styles.buttonsRow}>
            <Button
              buttonClassName={styles.buttonAdd}
              buttonTextClassName={styles.buttonText}
              handleClick={handleEditApply}
              isText
              text='Edit'>
              <EditOutlined />
            </Button>
            <Button
              buttonClassName={styles.buttonCancel}
              buttonTextClassName={styles.buttonText}
              handleClick={handleEditCancel}
              isText
              text='Cancel'
            />
          </div>
        </Modal>
      )}
    </div>
  ) : null;
};