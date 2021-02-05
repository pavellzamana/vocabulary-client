import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '@/app/store';
import {updateMap, deleteMap, getWords} from "@/api/vocabularyAPI";

export interface IMapItem {
  word: string;
  transcription: string;
  translation: string;
  id: string;
}

export interface IState {
  map: Array<IMapItem>;
  isLoading: boolean;
  error: string | null;
}

export const initialState = {
  map: [],
  isLoading: false,
  error: null,
} as IState;

const map = createSlice({
  name: 'map',
  initialState,
  reducers: {
    startLoading: setLoading,
    setMapSuccess: setMap,
    setMapFailure: setError,
  },
});

function setLoading(state: IState) {
  state.isLoading = true;
}

function setMap(state, { payload }) {
  state.map = payload;
  state.isLoading = false;
  state.error = null;
}

function setError(state, { payload }: PayloadAction<string>) {
  state.error = payload;
  state.isLoading = false;
}

export const { startLoading, setMapSuccess, setMapFailure } = map.actions;

export default map.reducer;

export const fetchMap = (userId: number): AppThunk => async (dispatch) => {
  try {
    const map = await getWords(userId);
    dispatch(setMapSuccess(map));
  } catch (error) {
    dispatch(setMapFailure(error.toString()));
  }
};

export const updateMapItem = (id: number, mapItem: IMapItem) => async (dispatch) => {
  try {
    await updateMap(id, mapItem);
    const map = await getWords(id);
    dispatch(setMapSuccess(map));
  } catch (error) {
    dispatch(setMapFailure(error.toString()));
  }
};

export const deleteMapItem = (id: string) => async (dispatch) => {
  try {
    await deleteMap(id);
    const map = await getWords(id);
    dispatch(setMapSuccess(map));
  } catch (error) {
    dispatch(setMapFailure(error.toString()));
  }
};
