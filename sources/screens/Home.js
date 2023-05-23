import React, { Component, useEffect, useState } from 'react';
import {View,StyleSheet,StatusBar,Image,Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { Button, IconButton, Icon} from 'react-native-paper';
import { useDispatch, useSelector} from 'react-redux'
import { get_markers, filter_markers } from '../reducers/Actions/markerAction';
import { TextInput } from 'react-native';

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
  )
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

export default Home;
