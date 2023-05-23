import { createSlice } from '@reduxjs/toolkit';
import { register, login, logout } from './Actions/userActions';

const initialState = {
  isLoggedIn : false,
  user: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [register.fulfilled]: (state) => {
      state.isLoggedIn = false;
    },
    [register.rejected]: (state) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      console.log(state);
    },
    [login.rejected]: (state) => {
      state.isLoggedIn = false;
      state.user = {};
    },
    [logout.fulfilled]: (state) => {
      state.isLoggedIn = false;
      state.user = {};
    },
  },
});

const { reducer } = userSlice;
export default reducer;
