import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { filter_markers, get_markers } from '../reducers/Actions/markerAction';

const Home = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.markerReducer);
  const [userInput, setUserInput] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const [makersIsSetup, setMarkerIsSetup] = useState(false);

  useEffect (() => {
    if (state.markers.length == 0 && !makersIsSetup) {
      dispatch(get_markers())
      setMarkerIsSetup(true);
    }
  }, [state, makersIsSetup])   

  return (
    <View style={styles.MapContainer}>

      <View style={styles.FilterPart}>
        <TextInput placeholder='Search...' style={styles.input} value={userInput} onChangeText={text => setUserInput(text)}/>
        <Button
          icon="magnify"
          onPress={() => dispatch(filter_markers(userInput, userFilter))}
          style={styles.searchButton}/>

      </View>

      <MapView
        provider='google'
        style={styles.mapStyle}
        customMapStyle={config}
        showsUserLocation={true}
        zoomEnabled={true}
        zoomControlEnabled={true}
        initialRegion={{
          latitude: 46.8137431,
          longitude: -71.2084061,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        { state.markers.length !== 0 ?
          state.markers.map((marker, index) => {
            return (
              <Marker
                key={index}
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude}}
                title={marker.title}
                description={marker.description}
              />
            )
          }) 
        :  <View/>}
      </MapView>  
      <Button onPress={() => console.log(state)} >test</Button>
    </View>
  );
};


const styles = StyleSheet.create({
  FilterPart: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  MapContainer: {
    flex: 8
  },
  mapStyle: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
  },

  input: {
    borderRadius: 5,
    height: 40,
    minWidth: 150,
    marginLeft: 5,
    borderWidth: 1,
    padding: 10,
  },
  map: {
    flex: 1,
    width: 400,
    height: 800,
  },
});

const config = [
  {
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#f5f5f5'
      }
    ]
  },
  {
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#616161'
      }
    ]
  },
  {
    'elementType': 'labels.text.stroke',
    'stylers': [
      {
        'color': '#f5f5f5'
      }
    ]
  },
  {
    'featureType': 'administrative',
    'elementType': 'geometry',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'administrative.land_parcel',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'administrative.land_parcel',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#bdbdbd'
      }
    ]
  },
  {
    'featureType': 'administrative.neighborhood',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'poi',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'poi',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#eeeeee'
      }
    ]
  },
  {
    'featureType': 'poi',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#757575'
      }
    ]
  },
  {
    'featureType': 'poi.park',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#e5e5e5'
      }
    ]
  },
  {
    'featureType': 'poi.park',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#9e9e9e'
      }
    ]
  },
  {
    'featureType': 'road',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#ffffff'
      }
    ]
  },
  {
    'featureType': 'road',
    'elementType': 'labels.icon',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'road.arterial',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#757575'
      }
    ]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#dadada'
      }
    ]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#616161'
      }
    ]
  },
  {
    'featureType': 'road.local',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#9e9e9e'
      }
    ]
  },
  // {
  //   'featureType': 'transit',
  //   'stylers': [
  //     {
  //       'visibility': 'off'
  //     }
  //   ]
  // },
  {
    'featureType': 'transit.line',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#e5e5e5'
      }
    ]
  },
  {
    'featureType': 'transit.station',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#eeeeee'
      }
    ]
  },
  {
    'featureType': 'water',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#c9c9c9'
      }
    ]
  },
  {
    'featureType': 'water',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#9e9e9e'
      }
    ]
  }
];


export default Home;
