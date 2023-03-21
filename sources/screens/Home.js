import React, { Component, useEffect } from 'react';
import {View,StyleSheet,StatusBar,Image,Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector} from 'react-redux'
import { get_markers } from '../reducers/Actions/markerAction';

const Home = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.markerReducer);  
  
  useEffect (() => {
    if (state.markers.length == 0) {
      dispatch(get_markers())
    }
  }, [state])   

  return (
      <View style={styles.MapContainer}>  
      <MapView  
        provider='google'
        style={styles.mapStyle}  
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
            console.log(marker);
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
        
      <Button onPress={() => console.log(state.markers)}>test</Button> 

    </View> 
  )
};


const styles = StyleSheet.create({
  
  MapContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  map: {
    flex: 1,
    width: 400,
    height: 800,
   },
});

export default Home;
