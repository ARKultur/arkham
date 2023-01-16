import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  userReducer
});


const Store = configureStore({
  reducer: rootReducer
});

export default Store;