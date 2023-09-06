import axios from 'axios';
import {API_URL} from '../constants/API';

const getUser = async (email, token) => {
  const URL = API_URL + `/api/customers/?email=${email}`;
  const params = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  try {
    const response = await axios.get(URL, params);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

const editUser = async (body, token) => {
  try {
    console.log('--->', body);
    const response = await axios.patch(API_URL + '/api/customers', body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

const UserServices = {
  getUser,
  editUser,
};

export default UserServices;
