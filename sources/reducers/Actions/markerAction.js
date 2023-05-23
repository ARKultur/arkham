import { createAsyncThunk } from '@reduxjs/toolkit';
import MarkerService from '../../API/Markers';


export const get_markers = createAsyncThunk(
  'marker/get',
  async (thunkAPI) => {
    try { 
      const result = await new MarkerService.getMarkers(thunkAPI);
      return result;
    } catch (error) {
      alert('Invalid credentials.');
      console.error(error);
      throw error;
    }
  }
);

export const filter_markers = createAsyncThunk(
  'marker/filter',
  async ({userInput, userFilter}, thunkAPI) => {

    try {
      const markers = await MarkerService.getMarkers();
      const filtered_marker = [];

      markers.map((marker) => {
        if (marker.name.includes(userInput))
          filtered_marker.push(marker);
      });
      console.log(filtered_marker);
      return filtered_marker;
    } catch (error) {
      alert('Invalid credentials.');
      console.error(error);
      throw error;
    }
  }
);