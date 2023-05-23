import MarkerService from '../../API/Markers'
import { MarkerActionType } from '../markerReducer';
import { createAsyncThunk } from '@reduxjs/toolkit';


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


/*export const get_markers = () => {
    try {
        const markers = new MarkerService.getMarkers();
        return {
            type: MarkerActionType.getMarkers, 
            payload: markers,
        }} catch (error) {
            console.error(error);
            throw error;
        }
}*/

export const filter_markers = (userInput, userFilter) => {
    const markers = MarkerService.getMarkers();
    const filtered_marker = [];

    markers.map((marker) => {
        if (marker.title.includes(userInput))
            filtered_marker.push(marker)
    })

    console.log(userInput);
    return {
        type: MarkerActionType.filterMarkers, 
        payload: filtered_marker, 
    }

}