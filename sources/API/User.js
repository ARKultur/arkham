import axios from 'axios';
import { API_URL } from '../constants/API';

const getUser = async (token, id, thunkAPI) => {
  try {
    const response = await axios.get(API_URL + `/customer/${id}`, {
      headers :{
        'Authorization': 'Bearer ' + token
      }
    });

    return response.data;
  } catch (error) {
    console.log(error.response.data);
    thunkAPI.rejectWithValue(error.response.data);
    throw error.response.data;
  }
};

const getTmpUser = async (id, thunkAPI) => { // This is the same as getUser, but we use this until API fixes the issue
  try {
    const response = await axios.get(API_URL + '/customer');

    const user = response.data.results.filter(user => user.id === id)[0].auth;
    user.id = id;

    return user;
  } catch (error) {
    console.log(error.response.data);
    thunkAPI.rejectWithValue(error.response.data);
    throw error.response.data;
  }
};

const editUser = async (id, body) => {
  try {
    const response = await axios.post(API_URL + `/customer/${id}`,
      {
        auth: {
          email: body.email.toLowerCase(),
          first_name: body.first_name,
          last_name: body.last_name,
          password: body.password,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + body.token,
        }
      });

    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

const UserServices = {
  getUser,
  getTmpUser,
  editUser
};

export default UserServices;