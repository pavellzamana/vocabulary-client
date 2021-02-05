import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { AuthorizationForm } from '@/components/AuthorizationForm/AuthorizationForm';
import { InputRow } from '@/components/InputRow/InputRow';
import { AppDispath } from '@/app/store';
import { fetchUserData, initialState } from './authorizationSlice';

import styles from './authorization.less';
import {registration} from "@/api/userAPI";
import {getWords} from "@/api/vocabularyAPI";

export const Registration = () => {
  const dispatch: AppDispath = useDispatch();
  const [state, setState] = useState(initialState);
  const [isRedirect, setIsRedirect] = useState(false);

  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }
  function handleSubmit(event) {
    event.preventDefault();
    registration(state.email, state.login, state.password)
        .then(() => dispatch(fetchUserData(state.login, state.password)));
    // setUserToDB(state);
    setIsRedirect(true);
  }

  return isRedirect ? (
    <Redirect to="/" exact />
  ) : (
    <div className={styles.wrapper}>
      <AuthorizationForm
        title="Registration"
        buttonText="Sign in"
        handleSubmit={handleSubmit}
      >
        {Object.keys(initialState).map((key) => {
          return (
            key !== 'isLoading' &&
            key !== 'error' &&
            key !== 'isAuth' &&
            key !== 'id' &&
            (
              <InputRow
                handleChange={handleChange}
                label={key === 'userName' ? 'user name' : key}
                name={key}
                key={key}
                type={key}
              />
            )
          );
        })}
      </AuthorizationForm>
    </div>
  );
};
