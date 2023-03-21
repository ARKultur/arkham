import axios from 'axios';
import { API_URL } from '../constants/API';

const getMarkers = (body, thunkAPI) => {
  //try {
    //const response = await axios.post(API_URL + '/markers')
    //return response.data;
    const tmpData = [
        {
            title: 'test 1',
            descriptions: 'description 1',
            latitude: 46.8074905,
            longitude: -71.20765317965302,

        },
        {
            title: 'test 2',
            descriptions: 'description 2',
            latitude: 48.8074905,
            longitude: -71.20765317965302,

        },
        {
            title: 'test 3',
            descriptions: 'description 3',
            latitude: 50.8074905,
            longitude: -71.20765317965302,

        },
    ];
    return tmpData;
//  } catch (error) {
    //console.log(error.response.data);
//  }
};

const MarkerService = {
  getMarkers,
};

export default MarkerService;