import React from "react";
import { BottomNavigation } from 'react-native-paper';
import * as data from "../../style.json";
import WorldMap from "./WorldMap";
import Scanner from "./Scanner";
import ProfileScreen from "../ProfileSpace/ProfileScreen";

const MapRoute = () => <WorldMap/>;
const ScanRoute = () => <Scanner/>;
const ProfileRoute = () => <ProfileScreen/>;

function UserScreen() {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'map', title: 'Map', icon: 'map' },
        { key: 'scanner', title: 'Scan', icon: 'cube-scan' },
        { key: 'profile', title: 'Profile', icon: 'account' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        map: MapRoute,
        scanner: ScanRoute,
        profile: ProfileRoute,
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
