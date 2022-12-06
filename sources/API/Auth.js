import axios from 'axios';

const API_URL = 'http://localhost:4000/api/';

const register = async (body, thunkAPI) => {
  try {
    const response = await axios.post(API_URL + 'account', {
      account : {body}
    });
    console.log(response?.data);
    return response?.data;
  } catch (error) {
    alert(error.message);
    console.log(error);
    return thunkAPI.rejectWithValue(error.message);
  }
};

const login = async (email, password, thunkAPI) => {
  try {
    const response = await axios.post(API_URL + 'login', {
      email,
      password,
    });
    console.log(response?.data);
    return response?.data;
  } catch (error) {
    alert(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
};

const logout = async () => {
  // TODO: Implement logout
  return null;
};

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;
