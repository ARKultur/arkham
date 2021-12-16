import React from "react";
import {IconButton} from "react-native-paper";
import MapboxGL from "@react-native-mapbox-gl/maps";

function Marker(props) {

    return (
        <MapboxGL.MarkerView coordinate={[props.longitude, props.latitude]}>
            <IconButton
                icon="map-marker"
                color={'#8e38ff'}
                size={40}
                onPress={() => props.funcDisp(props.dispCard, props.id, [props.longitude, props.latitude])}
            />
        </MapboxGL.MarkerView>
    )
}

export default Marker;
