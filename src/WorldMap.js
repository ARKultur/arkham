import React, {useState} from "react";
import {View} from 'react-native';
import MapboxGL from "@react-native-mapbox-gl/maps";
import Marker from "./Marker";
import CardInfo from "./CardInfo";

MapboxGL.setAccessToken("pk.eyJ1IjoiZ3VpbGxhdWVtc2VnZmF1bHQiLCJhIjoiY2s0Yml5ejBlMGU0ZzNucG0wcGRlMHR2YSJ9.J_AUTDC5k_epxoGl4IpMEw");

function WorldMap() {
    const [display, setDisplay] = useState(false);
    const [card, setCard] = useState(<></>)
    return (
        <View style={styles.page}>
            <View style={styles.container}>
                <MapboxGL.MapView style={styles.map}>
                    <MapboxGL.Camera
                        zoomLevel={16}
                        centerCoordinate={[4.822766, 45.762275]}
                    />
                    <Marker longitude={4.822766}
                            latitude={45.762275}
                            disp={display}
                            setDisp={setDisplay}
                            setCa={setCard}
                            dispCard={<CardInfo/>}
                    />
                    <Marker longitude={4.8273}
                            latitude={45.7607}
                            disp={display}
                            setDisp={setDisplay}
                            setCa={setCard}
                            dispCard={<CardInfo/>}
                    />
                </MapboxGL.MapView>
                {card}
            </View>
        </View>);
}

const styles = {
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    container: {
        height: 800,
        width: 400,
        backgroundColor: 'tomato',
    },
    map: {
        flex: 1
    }
};

export default WorldMap;
