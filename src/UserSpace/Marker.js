import React from "react";
import {Button} from "react-native-paper";
import MapboxGL from "@react-native-mapbox-gl/maps";
import {useNavigation} from "@react-navigation/native";

function Marker(props) {
    return (
        <MapboxGL.MarkerView coordinate={[props.longitude, props.latitude]}>
            <Button icon="map-marker"
                    labelStyle={{fontSize: 50, color: '#8e38ff'}}
                    style={{maxWidth: 50, maxHeight: 45}}
                    onPress={() => {
                        props.funcDisp(props.dispCard, props.id, [props.longitude, props.latitude]);
                    }}
            />
        </MapboxGL.MarkerView>
    )
}

export default Marker;
