import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {getUserFromDatabase} from "@/api/userAPI";
import { AppThunk } from '@/app/store';

type IState = {
  id?: number;
  login: string;
  password: string;
  email: string;
  isLoading: boolean;
  error: string | null;
  isAuth: boolean
};

export const initialState = {
  id: undefined,
  login: '',
  password: '',
  email: '',
  isLoading: false,
  error: null,
  isAuth: false
} as IState;

const authorization = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setLoading: startLoading,
    setUserDataSuccess: setUserData,
    setUserDataFailure: setError,
  },
});

function startLoading(state: IState) {
  state.isLoading = true;
}

function setUserData(state: IState, { payload }) {
  const { id, login, password, email } = payload;
  state.id = id;
  state.login = login;
  state.password = password;
  state.email = email;
  state.isLoading = false;
  state.error = null;
  state.isAuth = true;
}

function setError(state: IState, { payload }: PayloadAction<string>) {
  state.isLoading = false;
  state.error = payload;
}

export const {
  setLoading,
  setUserDataFailure,
  setUserDataSuccess,
} = authorization.actions;

export default authorization.reducer;

export const fetchUserData = (
  login: string,
  password: string
): AppThunk => async (dispatch) => {
  try {
    // const user = await getUserFromDB(login, password);
    const user = await getUserFromDatabase(login, password);
    dispatch(setUserDataSuccess(user));
  } catch (error) {
    dispatch(setUserDataFailure(error.toString()));
  }
};