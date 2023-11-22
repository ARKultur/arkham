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

export const getSuggestionMarkers = async token => {
  try {
    const URL = API_URL + '/api/suggestion/map';
    const params = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    const response = await axios.get(URL, params);
    return response.data && response.data.results;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getSuggestedPlace = async () => {
  const URL =
    'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=45.764042,4.835659&radius=5000&type=museum&key=';

  try {
    const response = await axios.get(URL);

    return response.data && response.data.results;
  } catch (error) {
    console.log(error.response.data);
  }
};
