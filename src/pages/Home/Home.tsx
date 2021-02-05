import React, {useEffect} from 'react';
import { SearchForm } from '@/features/SearchForm/SearchForm';
import { Map } from '@/features/Map/Map';
import styles from './home.less';
import {checkAuth} from "@/api/userAPI";

export const Home: React.FC = () => {
    useEffect(() => {
        checkAuth();
    }, [])
  return (
    <div className={styles.vocabulary}>
      <SearchForm />
      <Map />
    </div>
  );
};
