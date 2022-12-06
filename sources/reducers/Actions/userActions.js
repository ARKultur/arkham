import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../API/Auth';

export const register = createAsyncThunk(
  'user/register',
  async ({ name, email, password, confirmPassword }, thunkAPI) => {
    try {
      const body = {
        email,
        name,
        password,
        confirmPassword
      };
      await AuthService.register(body, thunkAPI);
    } catch (error) {
      console.error(error);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(email, password, thunkAPI);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await AuthService.logout();
});

