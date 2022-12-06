import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';

const Store = configureStore({
  reducer: {
    user: userReducer
  }
});

export default Store;