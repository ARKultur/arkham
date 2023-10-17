import {createAsyncThunk} from '@reduxjs/toolkit';
import AuthService from '../../API/Auth';
import UserServices from '../../API/User';

export const register = createAsyncThunk(
  'auth/register',
  async ({username, email, password}, thunkAPI) => {
    try {
      const jsonBody = {
        email: email,
        username: username,
        password: password,
      };
      const result = await AuthService.register(jsonBody, thunkAPI);

      return result;
    } catch (error) {
      alert('Invalid credentials.');
      console.error(error);
      throw error;
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async ({email, password}, thunkAPI) => {
    try {
      const data = await AuthService.login(email, password, thunkAPI);
      return data;
    } catch (error) {
      alert('Invalid credentials.');
      console.error(error);
      throw error;
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await AuthService.logout();
});

export const editUser = createAsyncThunk(
  'user/edit',
  async (body, thunkAPI) => {
    try {
      const data = await UserServices.editUser(body, body.token);

      data.accessToken = body.token;
      return data;
    } catch (error) {
      alert('Cannot edit user.');
      console.error(error);
      throw error;
    }
  },
);

export const editSuggestions = createAsyncThunk(
  'suggestions/edit',
  async body => {
    try {
      return body;
    } catch (error) {
      alert('Cannot edit user.');
      console.error(error);
      throw error;
    }
  },
);
