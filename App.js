import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import WorldMap from "./src/WorldMap";


// TODO Set 2 view
const MapRoute = () => <WorldMap/>;

const ScanRoute = () => <Text>Scanner</Text>;

const MyComponent = () => {
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
      barStyle={{ backgroundColor: '#8e38ff' }}
    />
  );
};

export default MyComponent;
