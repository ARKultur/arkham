import axios from 'axios';
import {API_URL} from '../constants/API';

export const getSuggestions = async token => {
  const URL = API_URL + '/api/suggestion';
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
  }
};

export const addSuggestionToUser = async body => {
  try {
    const response = await axios.post(
      API_URL + '/suggestion',
      {
        ...body,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + body.token,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};
