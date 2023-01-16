import React, { Component } from 'react';
import {View,StyleSheet,StatusBar,Image,Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';


const Home = () => {
  return (
    

    <View style={styles.MainContainer}>  
  
    <MapView  
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

      <Marker  
        coordinate={{ latitude: 46.8074905, longitude: -71.20765317965302}}  
        title={"citadelle de quebec"}  
        description={"First museum"}  
      />
    </MapView>  
      
  </View>  
  )
};



/*const { width, height } = Dimensions.get('window');

  const ASPECT_RATIO = width / height;
  const LATITUDE = 22.720555;
  const LONGITUDE = 75.858633;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const region = {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  }

  return (
    <View style={styles.MainContainer}>
     <MapView
       region={region}
       provider={undefined}
       mapType={Platform.OS == "ios" ? "none" : "standard"}
       rotateEnabled={false}
       style={styles.map}
       showsUserLocation>
        <UrlTile
          urlTemplate="http://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
          maximumZ={19} 
        />
      </MapView>
     </View>
  )*/

const styles = StyleSheet.create({
  MainContainer: {
    position: 'absolute',
    top: 0,
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
