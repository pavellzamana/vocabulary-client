import React, {useEffect} from 'react';
import { SearchForm } from '@/features/SearchForm/SearchForm';
import { Map } from '@/features/Map/Map';
import styles from './home.less';
import {checkAuth} from "@/api/userAPI";
import {useSelector} from "react-redux";
import {RootState} from "@/app/rootReducer";

export const Home: React.FC = () => {
    const userId = useSelector<RootState, number| undefined>(state => state.authorization.id)
    useEffect(() => {
        if (userId) {
            checkAuth();
        }
    }, []);
  return (
    <div className={styles.vocabulary}>
      <SearchForm />
      <Map />
    </div>
  );
};
