import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../API/Auth';

export const register = createAsyncThunk(
  'auth/register',
  async ({username, firstName, lastName, email, password}, thunkAPI) => {
    try {
      const body = {
        email: email,
        username: username,
        first_name: firstName,
        last_name: lastName,
        password: password,
      };
      const result = await AuthService.register(body, thunkAPI);

      return result;
    } catch (error) {
      alert('Invalid credentials.');
      console.error(error);
      throw error;
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
      alert('Invalid credentials.');
      console.error(error);
      throw error;
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await AuthService.logout();
});

