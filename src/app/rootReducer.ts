import { combineReducers } from '@reduxjs/toolkit';
import authorizationReducer from '@/features/Authorization/authorizationSlice';
import mapReducer from '@/features/Map/mapSlice';

const rootReducer = combineReducers({
  authorization: authorizationReducer,
  map: mapReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
