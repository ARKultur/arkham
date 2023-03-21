import MarkerService from '../../API/Markers'
import { MarkerActionType } from '../markerReducer';

export const get_markers = () => {
    //try {
        const markers = new MarkerService.getMarkers();
        console.log(markers);
        return {
            type: MarkerActionType.getMarker, 
            payload: markers,
        }
   // } catch (error) {
    //    alert('Invalid credentials.');
    //    console.error(error);
    //    throw error;
    //}
}