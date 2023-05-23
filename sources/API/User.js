import axios from 'axios';
import { API_URL } from '../constants/API';

const getUser = async (email, token, thunkAPI) => {
  const URL = API_URL + `/api/customers/?email=${email}`;
  const params = {
    headers : {'Authorization': 'Bearer ' + token},
  };

  try {
    const response = await axios.get(URL, params);
    return response.data;
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
  editUser
};

export default UserServices;