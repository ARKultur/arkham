import React from "react";
import {View} from 'react-native';
import MapboxGL from "@react-native-mapbox-gl/maps";
import {Button, Text} from "react-native-paper";

MapboxGL.setAccessToken("pk.eyJ1IjoiZ3VpbGxhdWVtc2VnZmF1bHQiLCJhIjoiY2s0Yml5ejBlMGU0ZzNucG0wcGRlMHR2YSJ9.J_AUTDC5k_epxoGl4IpMEw");

function WorldMap() {

    return (
        <View style={styles.page}>
            <View style={styles.container}>
                <MapboxGL.MapView style={styles.map}>
                    <MapboxGL.Camera
                        zoomLevel={16}
                        centerCoordinate={[4.822766, 45.762275]}
                    />
                    <MapboxGL.MarkerView coordinate={[4.822766, 45.762275]}>
                        <Button icon="map-marker" labelStyle={{fontSize: 50, color: '#8e38ff'}}>
                            <Text style={{fontSize: 10, color: '#8e38ff'}}>Basilique Fourviere</Text>
                        </Button>
                    </MapboxGL.MarkerView>
                </MapboxGL.MapView>
            </View>
        </View>
    );
}

const styles = {
    touchableContainer: {borderColor: 'black', borderWidth: 1.0, width: 60},
    touchable: {
        backgroundColor: 'blue',
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    touchableText: {
        color: 'white',
        fontWeight: 'bold',
    },
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    container: {
        height: 800,
        width: 400,
        backgroundColor: 'tomato'
    },
    map: {
        flex: 1
    }
};

export default WorldMap;
