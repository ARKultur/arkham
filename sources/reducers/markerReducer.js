export const MarkerActionType = {
  getMarker: 'GET_MARKERS'
}
const initialState = {
  markers: [],
};

const markerReducer = (state = initialState, action) => { 
  switch(action.type) {
    case (MarkerActionType.getMarker):
      return ({
        markers: action.payload
      })

    default:
      return state
  };
};

export default markerReducer;
