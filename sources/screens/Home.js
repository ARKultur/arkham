import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Button, Checkbox, Modal, Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {filter_markers, get_markers} from '../reducers/Actions/markerAction';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getSuggestedPlace} from '../API/Suggestions';

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
      <Icon name="map-marker" size={20} />
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

  useEffect(() => {
    if (userInput.length > 0) {
      const userMarkers = [...markers];

      const newFilters = userMarkers.filter(marker =>
        marker.name.includes(userInput),
      );

      setFilters(newFilters);
    } else {
      setFilters(markers);
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
            <Icon name="close" size={25} />
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

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.markerReducer);
  const [userInput, setUserInput] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const [makersIsSetup, setMarkerIsSetup] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [suggestedPlaces, setSuggestedPlaces] = useState([]);
  const [markers, setMarkers] = useState((state && state.markers) || []);

  const getData = async () => {
    const data = await getSuggestedPlace();

    setSuggestedPlaces(data);
  };

  useEffect(() => {
    if (state.markers.length == 0 && !makersIsSetup) {
      dispatch(get_markers());
      setMarkerIsSetup(true);
    }
  }, [state, makersIsSetup]);

  useEffect(() => {
    const subscribe = navigation.addListener(
      'focus',
      () => {
        getData();
      },
      [],
    );

    return subscribe;
  }, []);

  return (
    <View style={styles.MapContainer}>
      <Image
        source={require('../images/logo.png')}
        style={{
          width: 50,
          height: 50,
          top: 0,
          left: 0,
          zIndex: 100,
          margin: 10,
          alignSelf: 'center',
        }}
      />
      <Text style={{alignSelf: 'center', fontSize: 20, fontWeight: 'bold'}}>
        ARKultur
      </Text>
      <View style={styles.FilterPart}>
        <TextInput
          placeholder="Search..."
          style={styles.input}
          value={userInput}
          onChangeText={text => setUserInput(text)}
        />
        <Button
          icon="magnify"
          onPress={() => dispatch(filter_markers({userInput, userFilter}))}
          style={styles.searchButton}
        />

        <Button
          icon="filter"
          onPress={() => setIsOpenModal(true)}
          style={styles.searchButton}
        />
      </View>

      <MapView
        provider="google"
        style={styles.mapStyle}
        customMapStyle={config}
        showsUserLocation={true}
        zoomEnabled={true}
        zoomControlEnabled={true}
        initialRegion={{
          latitude: 45.74600601196289,
          longitude: 4.842291831970215,
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
                image={place.icon}
              />
            );
          })}
      </MapView>

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
  FilterPart: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 10,
    paddingHorizontal: 25,
  },
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
});

const config = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
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
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dadada',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
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
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#c9c9c9',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
];

export default Home;
