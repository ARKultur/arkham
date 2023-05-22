import MarkerService from '../../API/Markers'
import { MarkerActionType } from '../markerReducer';
import Store  from '../Store';

export const get_markers = () => {
    //try {
        const markers = new MarkerService.getMarkers();
        return {
            type: MarkerActionType.getMarkers, 
            payload: markers,
        }
   // } catch (error) {
    //    alert('Invalid credentials.');
    //    console.error(error);
    //    throw error;
    //}
}

export const filter_markers = (userInput, userFilter) => {
    const markers = new MarkerService.getMarkers();
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