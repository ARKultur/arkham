import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import markerReducer from './markerReducer'

const rootReducer = combineReducers({
  userReducer,
  markerReducer
});


const Store = configureStore({
  reducer: rootReducer
});

export default Store;