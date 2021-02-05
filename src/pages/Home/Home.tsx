import React, {useEffect} from 'react';
import { SearchForm } from '@/features/SearchForm/SearchForm';
import { Map } from '@/features/Map/Map';
import styles from './home.less';

export const Home: React.FC = () => {
  return (
    <div className={styles.vocabulary}>
      <SearchForm />
      <Map />
    </div>
  );
};
