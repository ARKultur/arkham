import React, {useState} from "react";
import {View} from 'react-native';
import MapboxGL from "@react-native-mapbox-gl/maps";
import Marker from "./Marker";
import CardInfo from "./CardInfo";

MapboxGL.setAccessToken("pk.eyJ1IjoiZ3VpbGxhdWVtc2VnZmF1bHQiLCJhIjoiY2s0Yml5ejBlMGU0ZzNucG0wcGRlMHR2YSJ9.J_AUTDC5k_epxoGl4IpMEw");

function WorldMap() {
    const [display, setDisplay] = useState(false);
    const [card, setCard] = useState(<></>);
    const [getUuid, setUuid] = useState(undefined);

    function displayCard(dispCard, id) {
        if (getUuid === undefined && !display) {
            setUuid(id);
            setCard(dispCard);
            setDisplay(true);
        } else if (getUuid === id && display) {
            setDisplay(false);
            setCard(<></>);
            setUuid(undefined);
        } else {
            setUuid(id);
            setCard(dispCard);
        }
    }

    return (
        <View style={styles.page}>
            <View style={styles.container}>
                <MapboxGL.MapView style={styles.map}
                >
                    <MapboxGL.Camera
                        zoomLevel={12}
                        centerCoordinate={[4.835659, 45.764043]}
                    />
                    <Marker longitude={4.822766}
                            latitude={45.762275}
                            funcDisp={displayCard}
                            id={"marker-fourviere"}
                            dispCard={<CardInfo title="Basilique de Fourvière"/>}
                    />
                    <Marker longitude={4.8273}
                            latitude={45.7607}
                            funcDisp={displayCard}
                            id={"marker-saintjean"}
                            dispCard={<CardInfo title="Un autre truc tqt frr"/>}
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
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'tomato',
    },
    map: {
        flex: 1
    }
};

export default WorldMap;
