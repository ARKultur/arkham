import {createSlice} from '@reduxjs/toolkit';
import {
  register,
  login,
  logout,
  editUser,
  editSuggestions,
} from './Actions/userActions';

const initialState = {
  isLoggedIn: false,
  hasSelectedSuggestions: false,
  user: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, state => {
        state.isLoggedIn = false;
      })
      .addCase(register.rejected, state => {
        state.isLoggedIn = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, state => {
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(logout.fulfilled, state => {
        state.isLoggedIn = false;
        state.user = {};
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(editSuggestions.fulfilled, (state, action) => {
        state.user = {...state.user, likedSuggestions: action.payload};
        state.hasSelectedSuggestions = true;
      });
  },
});

const {reducer} = userSlice;
export default reducer;
