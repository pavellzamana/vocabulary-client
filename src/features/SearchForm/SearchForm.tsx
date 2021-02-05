import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/Button/Button';
import {
  SearchOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import styles from './searchForm.less';
import { AppDispath } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '@/components/Modal/Modal';
import { AddModalHeader } from '@/components/AddModalHeader/AddModalHedaer';
import { guid } from '@/helpers/guid';
import { AddModalForm } from '@/components/AddModalForm/AddModalForm';
import { RootState } from '@/app/rootReducer';
import { Select } from 'antd';
import { fetchMap } from '../Map/mapSlice';
import {setWordsToDB} from "@/api/vocabularyAPI";
const { Option } = Select;

const createEmptyInput = () => ({
  word: '',
  transcription: '',
  translation: '',
  id: guid(),
});

export const SearchForm: React.FC = () => {
  const dispatch: AppDispath = useDispatch();
  const isAuth = useSelector<RootState, boolean>(state => state.authorization.isAuth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] = useState([createEmptyInput()]);
  const userId = useSelector<RootState, number|undefined>((state) => state.authorization.id)

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current!.scrollTop += 300;
    }
  }, [modalState.length]);

  function handleModalAddInput() {
    setModalState([...modalState, createEmptyInput()]);
  }

  function handleModalRemove(id: string, event: SyntheticEvent) {
    setModalState(modalState.filter((item) => item.id !== id));
  }

  function handleModalChange(index: number, event: React.ChangeEvent<HTMLInputElement>) {
    const modalChangedInput = {
      ...modalState[index],
      [event.target.name]: event.target.value,
    };
    const newModalState = [...modalState];
    newModalState[index] = modalChangedInput;
    setModalState(newModalState);
  }

  function handleModalDiscard() {
    setIsModalOpen(false);
    setModalState([createEmptyInput()]);
  }

  async function handleModalApply() {
    if (userId) {
      await setWordsToDB(userId, modalState);
      dispatch(fetchMap(userId));
      handleModalDiscard();
    }
  }

  const selectLanguage: JSX.Element = (
    <Select defaultValue='English'>
      <Option value='en'>English</Option>
      <Option value='ru'>Russian</Option>
    </Select>
  );

  return (isAuth ?
    <React.Fragment>
      <form className={styles.form}>
        <input type='text' className={styles.input} />

        {selectLanguage}

        <div>
          <Button type='submit' buttonClassName={styles.buttonSearch}>
            <SearchOutlined />
          </Button>
          <Button
            buttonClassName={styles.buttonSearch}
            type='button'
            text='add new word'
            isText
            handleClick={() => setIsModalOpen(true)}
          />
        </div>
      </form>

      {isModalOpen && (
        <Modal modalBodyClassName={styles.modalBody}>
          <AddModalHeader mapItem={createEmptyInput()} />

          <div className={styles.formContainer}>
            <div className={styles.formWrapper} ref={ref}>
              {modalState.map((item, index) => (
                <AddModalForm
                  key={item.id}
                  mapItem={item}
                  handleRemove={(event) => handleModalRemove(item.id, event)}
                  handleChange={(event) => handleModalChange(index, event)}
                />
              ))}
            </div>
            <Button buttonClassName={styles.buttonCreate} handleClick={handleModalAddInput}>
              <PlusCircleOutlined />
            </Button>
          </div>

          <div className={styles.buttonsWrapper}>
            <Button
              buttonClassName={styles.modalButton}
              buttonTextClassName={styles.buttonText}
              handleClick={handleModalDiscard}
              isText
              text='Cancel'>
              <MinusCircleOutlined />
            </Button>
            <Button
              buttonClassName={styles.modalButton}
              buttonTextClassName={styles.buttonText}
              handleClick={handleModalApply}
              isText
              text='Apply'>
              <CheckCircleOutlined />
            </Button>
          </div>
        </Modal>
      )}
    </React.Fragment> : null
  );
};
