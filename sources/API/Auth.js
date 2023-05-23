import axios from 'axios';
import { API_URL } from '../constants/API';
import UserServices from './User';

const register = async (body, thunkAPI) => {
  const URL = API_URL + "api/customers/register/"
  const jsonBody = {
    email: body.email.toLowerCase(),
    password: body.password,
    username: body.username,
  }

  try {
    const response = await axios.post(URL, jsonBody);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    thunkAPI.rejectWithValue(error.response.data);
    throw error.response.data;
  }
};

const login = async (email, password, thunkAPI) => {
  const URL = API_URL + '/api/customer/login';
  const jsonBody = {email: email.toLowerCase(), password}

  try {
    const response = await axios.post(URL, jsonBody);
    const userData = await UserServices.getUser(email, response.data.token);

    userData.accesToken = response.data.token;
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