import axios from 'axios';
import { API_URL } from '../constants/API';
import UserServices from './User';

const register = async (body, thunkAPI) => {
  try {
    const response = await axios.post(API_URL + '/register', {
      auth: {
        email: body.email.toLowerCase(),
        username: body.username,
        first_name: body.first_name,
        last_name: body.last_name,
        password: body.password,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response.data);
    thunkAPI.rejectWithValue(error.response.data);
    throw error.response.data;
  }
};

const login = async (email, password, thunkAPI) => {
  try {
    const response = await axios.post(API_URL + '/login', {
      email: email.toLowerCase(),
      password,
    });
    const userData = await UserServices.getTmpUser(response.data.id);

    userData.token = response.data.token;
    return userData;
  } catch (error) {
    console.log(error.response.data);
    thunkAPI.rejectWithValue(error.response.data);
    throw error.response.data;
  }
};

const logout = async () => {
  return null;
};

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;