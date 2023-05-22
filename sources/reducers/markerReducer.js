export const MarkerActionType = {
  getMarkers: 'GET_MARKERS',
  filterMarkers: 'FILTER_MARKERS'
}
const initialState = {
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
};

export default markerReducer;
