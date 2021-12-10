import React, {useEffect, useState} from "react";
import {View} from 'react-native';
import MapboxGL from "@react-native-mapbox-gl/maps";
import Marker from "./Marker";
import CardInfo from "./CardInfo";
import Geolocation from 'react-native-geolocation-service';
import {useNavigation} from "@react-navigation/native";

MapboxGL.setAccessToken("pk.eyJ1IjoiZ3VpbGxhdWVtc2VnZmF1bHQiLCJhIjoiY2s0Yml5ejBlMGU0ZzNucG0wcGRlMHR2YSJ9.J_AUTDC5k_epxoGl4IpMEw");

function WorldMap() {
    const [display, setDisplay] = useState(false);
    const [card, setCard] = useState(<></>);
    const [getUuid, setUuid] = useState(undefined);
    const [pos, setPos] = useState([0, 0]);
    const [animTime, setAnimTime] = useState(4500);
    const [zoom, setZoom] = useState(13);

    function displayCard(dispCard, id, target) {
        if (getUuid === undefined && !display) {
            setUuid(id);
            setCard(dispCard);
            setDisplay(true);
            setPos([target[0], target[1]]);
            setZoom(15);
            setAnimTime(2000);
        } else if (getUuid === id && display) {
            setDisplay(false);
            setCard(<></>);
            setUuid(undefined);
            setZoom(13);
        } else {
            setUuid(id);
            setCard(dispCard);
            setPos([target[0], target[1]]);
            setZoom(15)
            setAnimTime(2000);
        }
    }

    useEffect(() => {
        Geolocation.getCurrentPosition(
            (position) => {
                setPos([position.coords.longitude, position.coords.latitude]);
            },
            (error) => {
                console.log(error.code, error.message);
                setPos([4.835659, 45.764043])
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }, []);

    return (
        <View style={styles.page}>
            <View style={styles.container}>
                <MapboxGL.MapView style={styles.map}
                >
                    <MapboxGL.UserLocation/>
                    <MapboxGL.Camera
                        zoomLevel={zoom}
                        centerCoordinate={pos}
                        animationDuration={animTime}
                        animationMode="flyTo"
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
