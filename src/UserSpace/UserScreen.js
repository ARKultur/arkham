import React from "react";
import { BottomNavigation } from 'react-native-paper';
import * as data from "../../style.json";
import WorldMap from "./WorldMap";
import Scanner from "./Scanner";

const MapRoute = () => <WorldMap/>;

const ScanRoute = () => <Scanner/>;

function UserScreen() {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'map', title: 'Map', icon: 'map' },
        { key: 'scanner', title: 'Scan', icon: 'cube-scan' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        map: MapRoute,
        scanner: ScanRoute,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            barStyle={{ backgroundColor: data.mainColor }}
        />
    );
}

export default UserScreen;
