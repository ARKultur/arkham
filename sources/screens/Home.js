import {useTheme} from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Linking,
  PermissionsAndroid,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker} from 'react-native-maps';
import {Checkbox, Modal, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {getAllMarkers} from '../API/Markers';
import {getSuggestedPlace} from '../API/Suggestions';
import {get_markers} from '../reducers/Actions/markerAction';

const {width} = Dimensions.get('window');

const FilterItem = ({marker, filters, setFilters}) => {
  const [checked, setChecked] = useState(
    filters.filter(filter => filter.name === marker.name).length > 0,
  );

  return (
    <View
      key={marker.name}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderBottomWidth: 1,
        borderRadius: 5,
        borderBottomEndRadius: 0,
        borderBottomStartRadius: 0,
      }}>
      <Icon name="map-marker" size={20} color={'black'} />
      <Text>{marker.name}</Text>
      <Checkbox
        onPress={() => {
          if (!checked) {
            setFilters([...filters, marker]);
          } else {
            const newFilters = filters.filter(
              filter => filter.name !== marker.name,
            );
            setFilters(newFilters);
          }
          setChecked(!checked);
        }}
        status={checked ? 'checked' : ''}
      />
    </View>
  );
};

FilterItem.propTypes = {
  marker: PropTypes.object.isRequired,
  filters: PropTypes.array.isRequired,
  setFilters: PropTypes.func.isRequired,
};

const FilterModal = ({isOpenModal, setIsOpenModal, setMarkers}) => {
  const {markers} = useSelector(state => state.markerReducer);
  const [filters, setFilters] = useState([...markers] || []);
  const [userInput, setUserInput] = useState('');

  const getData = async () => {
    const dataMarkers = await getAllMarkers();

    setFilters(dataMarkers);
  };

  useEffect(() => {
    if (userInput.length > 0) {
      const userMarkers = [...markers];

      const newFilters = userMarkers.filter(marker =>
        marker.name.toLowerCase().includes(userInput.toLowerCase()),
      );

      setFilters(newFilters);
    } else {
      getData();
    }
  }, [userInput]);

  useEffect(() => {
    setMarkers(filters);
  }, [filters]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpenModal}
      dismissable={true}
      onDismiss={() => {
        setIsOpenModal(!isOpenModal);
      }}>
      <View
        style={{
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
          }}>
          <TouchableOpacity
            style={{alignSelf: 'flex-end', marginBottom: 15}}
            onPress={() => {
              setIsOpenModal(!isOpenModal);
            }}>
            <Icon name="close" size={25} color={'black'} />
          </TouchableOpacity>

          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <TextInput
              style={{
                borderRadius: 5,
                height: 40,
                flex: 3,
                marginLeft: 5,
                borderWidth: 1,
                padding: 10,
              }}
              placeholder="Search..."
              value={userInput}
              onChangeText={text => setUserInput(text)}
            />
            <TouchableOpacity
              style={{
                height: 40,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: 'black',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => console.log('ok')}>
              <Icon
                name="search"
                size={20}
                color={'black'}
                style={{marginTop: -3}}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            style={{
              height: 200,
              marginTop: 20,
            }}
            data={markers}
            renderItem={({item}) => (
              <FilterItem
                marker={item}
                filters={filters}
                setFilters={setFilters}
              />
            )}
            keyExtractor={item => item.name}
          />
        </View>
      </View>
    </Modal>
  );
};

FilterModal.propTypes = {
  isOpenModal: PropTypes.bool.isRequired,
  setIsOpenModal: PropTypes.func.isRequired,
  setMarkers: PropTypes.func.isRequired,
};

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (granted === 'granted') {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

const getLocation = setLocation => {
  const result = requestLocationPermission();

  result.then(res => {
    if (res) {
      Geolocation.getCurrentPosition(
        position => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        error => {
          console.log(error.code, error.message);
          setLocation({
            latitude: null,
            longitude: null,
          });
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  });
};

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.markerReducer);
  const {likedSuggestions} = useSelector(state => state.userReducer.user);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenSuggestionModal, setIsOpenSuggestionModal] = useState(true);
  const [suggestedPlaces, setSuggestedPlaces] = useState([]);
  const [markers, setMarkers] = useState((state && state.markers) || []);
  const {user} = useSelector(state => state.userReducer);
  const {colors} = useTheme();
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const getData = async () => {
    if (likedSuggestions.length === 0) {
      return [];
    } else {
      const data = await getSuggestedPlace(user.token, likedSuggestions, {
        latitude: location.latitude,
        longitude: location.longitude,
      });
      const dataMarkers = await getAllMarkers();

      setMarkers(dataMarkers);
      setSuggestedPlaces(data);
    }
  };

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      getLocation(setLocation);
      dispatch(get_markers());
    });

    return subscribe;
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude && isOpenSuggestionModal) {
      getData();
    } else {
      setSuggestedPlaces([]);
    }
  }, [location, isOpenSuggestionModal]);

  return (
    <View style={styles.MapContainer}>
      <Image
        source={require('../images/logo.png')}
        style={{
          width: 50,
          height: 50,
          zIndex: 100,
          position: 'absolute',
          left: width / 2 - 25,
          bottom: 0,
          top: 10,
        }}
      />
      <Pressable
        onPress={() => setIsOpenModal(true)}
        style={{
          backgroundColor: colors.primary,
          borderRadius: 5,
          height: 40,
          width: 40,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          right: 10,
          top: 10,
          zIndex: 100,
        }}>
        <Icon name="filter" size={25} color={'white'} />
      </Pressable>

      <Pressable
        onPress={() => setIsOpenSuggestionModal(!isOpenSuggestionModal)}
        style={{
          backgroundColor: isOpenSuggestionModal ? 'red' : colors.primary,
          borderRadius: 5,
          height: 40,
          width: 40,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          right: 10,
          top: 60,
          zIndex: 100,
        }}>
        <Icon name="heart" size={25} color={'white'} />
      </Pressable>

      {location.latitude && location.longitude ? (
        <MapView
          provider="google"
          style={styles.mapStyle}
          customMapStyle={config}
          showsUserLocation={true}
          zoomEnabled={true}
          zoomControlEnabled={true}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {markers.length !== 0 &&
            markers.map((marker, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                  title={marker.title}
                  description={marker.description}
                />
              );
            })}
          {suggestedPlaces &&
            suggestedPlaces[0] &&
            suggestedPlaces.map((place, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: place.geometry.location.lat,
                    longitude: place.geometry.location.lng,
                  }}
                  title={place.name}
                  description={place.vicinity}
                  image={
                    'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png'
                  }
                />
              );
            })}
        </MapView>
      ) : loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Getting your location...</Text>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Please enable location services to use this feature.</Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openSettings();
            }}>
            <View
              style={{
                backgroundColor: colors.primary,
                padding: 10,
                borderRadius: 5,
                margin: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'white'}}>Open settings</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      <FilterModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        setMarkers={setMarkers}
      />
    </View>
  );
};

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  MapContainer: {
    flex: 1,
  },
  mapStyle: {
    flex: 1,
  },
  input: {
    borderRadius: 5,
    height: 40,
    minWidth: 150,
    marginLeft: 5,
    borderWidth: 1,
    padding: 10,
    flex: 1,
  },
  map: {
    flex: 1,
    width: 400,
    height: 800,
  },
  filter: {
    position: 'absolute',
    backgroundColor: 'grey',
    borderRadius: 5,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const config = [
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd',
      },
    ],
  },
  {
    featureType: 'administrative.neighborhood',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];

export default Home;
