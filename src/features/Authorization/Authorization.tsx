import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { AuthorizationForm } from '@/components/AuthorizationForm/AuthorizationForm';
import { InputRow } from '@/components/InputRow/InputRow';
import { fetchUserData, setLoading } from './authorizationSlice';
import { RootState } from '@/app/rootReducer';
import { AppDispath } from '@/app/store';

import styles from './authorization.less';

interface IState {
  login: string;
  password: string;
}

const initialState = {
  login: '',
  password: '',
} as IState;

export const Authorization = () => {
  const dispatch: AppDispath = useDispatch();

  const [state, setState] = useState(initialState);
  const [isRedirect, setIsRedirect] = useState(false);

  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(setLoading());
    dispatch(fetchUserData(state.login, state.password));
    setIsRedirect(true);
  }

  const { error, isLoading } = useSelector((state: RootState) => state.authorization);

  if (!isLoading && error) {
    return <Redirect to='/signin' exact />;
  }
  if (!isLoading && isRedirect) {
    return <Redirect to='/' exact />;
  }
  return (
    <div className={styles.wrapper}>
      <AuthorizationForm title='Authorization' buttonText='Log in' handleSubmit={handleSubmit}>
        {Object.keys(initialState).map((key) => (
          <InputRow handleChange={handleChange} name={key} key={key} type={key} />
        ))}
      </AuthorizationForm>
    </div>
  );
};
