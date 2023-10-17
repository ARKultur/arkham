import axios from 'axios';
import {API_URL} from '../constants/API';

export const subToNewsLetter = async email => {
  try {
    const response = await axios.post(API_URL + '/api/newsletter', {
      email: email,
    });

    return response.data;
  } catch (e) {
    return [];
  }
};
