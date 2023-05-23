export const MarkerActionType = {
  getMarkers: 'GET_MARKERS',
  filterMarkers: 'FILTER_MARKERS'
}
/*const initialState = {
  markers: [],
};

const markerReducer = (state = initialState, action) => { 
  switch(action.type) {
    case (MarkerActionType.getMarkers):
      return ({
        markers: action.payload
      })

    case (MarkerActionType.filterMarkers):
      return({
        markers: action.payload
      })

    default:
      return state
  };
};*/


import { createSlice } from '@reduxjs/toolkit';
import { get_markers } from './Actions/markerAction';

const initialState = {
  markers: [],
  isloading: false,
};



const markerSlice = createSlice({
  name: 'marker',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(get_markers.pending, state=> {
      state.isloading = true
    })
    builder.addCase(get_markers.fulfilled, (state, action) => {
      state.isloading = false,
      state.markers = action.payload
    })
    builder.addCase(get_markers.rejected, (state) => {
      state.isloading = false,
      markers = []
    })
  },
});

const { reducer } = markerSlice;
export default reducer;


//export default markerReducer;
