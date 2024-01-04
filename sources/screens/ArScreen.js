import {useTheme} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  NativeModules,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getAllMarkers} from '../API/Markers';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');

const ScalingIcon = () => {
  const scale = useRef(new Animated.Value(1)).current; // Initial scale value
  const {colors} = useTheme();

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [scale]);

  return (
    <Animated.View
      style={{
        transform: [{scale}],
        alignSelf: 'center',
      }}>
      <Icon name="dice-d20" size={100} color={colors.primary} />
    </Animated.View>
  );
};

const ScalingMaterialIcon = () => {
  const scale = useRef(new Animated.Value(1)).current; // Initial scale value
  const {colors} = useTheme();

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [scale]);

  return (
    <Animated.View
      style={{
        transform: [{scale}],
        alignSelf: 'center',
      }}>
      <MaterialIcon name="cube-scan" size={150} color={colors.primary} />
    </Animated.View>
  );
};

const Step1 = ({scrollNext}) => {
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View>
          <Text style={styles.title}>This is the AR </Text>
          <Text style={styles.descriptionText}>
            {
              "Now you can explore and visualize your city's various objects in your city!"
            }
          </Text>
        </View>
        <ScalingIcon />

        <TouchableOpacity onPress={() => scrollNext(1)}>
          <View
            style={{
              backgroundColor: colors.primary,
              padding: 10,
              borderRadius: 5,
              margin: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white'}}>Next</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Step2 = ({scrollNext}) => {
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View>
          <Text style={styles.title}>Wait a minute !</Text>
          <Text style={styles.descriptionText}>
            Before you start, scan your surroundings to calibrate your position
            on the map to minimize possible errors
          </Text>
        </View>

        <ScalingMaterialIcon />

        <TouchableOpacity onPress={() => scrollNext(2)}>
          <View
            style={{
              backgroundColor: colors.primary,
              padding: 10,
              borderRadius: 5,
              margin: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white'}}>Next</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Step3 = ({runAr}) => {
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View>
          <Text style={styles.title}>Be ready to explore</Text>
          <Text style={styles.descriptionText}>
            {"You'll have 2 parts on your screen. Above, you'll have the visual on your phone's rear camera.\n\n" +
              "Below, you'll have a google map so you can find your way around the city" +
              '\n\nUse the map to find the AR markers so you can visualize them with your phone.\n\n'}
          </Text>
        </View>
        <TouchableOpacity onPress={() => runAr()}>
          <View
            style={{
              backgroundColor: colors.primary,
              padding: 10,
              borderRadius: 5,
              margin: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white'}}>Démarrer</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ArScreen = ({navigation}) => {
  const {colors} = useTheme();
  const [markers, setMarkers] = useState([]);
  const scrollViewRef = useRef(null);

  const scrollNext = page => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({x: page * width, y: 0, animated: true});
    }
  };

  const runAr = () => {
    if (markers && markers.length > 0) {
      NativeModules.Geospacial.runPoc(JSON.stringify(markers));
    }
  };

  const getData = async () => {
    const dataMarkers = await getAllMarkers();

    setMarkers(dataMarkers);
  };

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      getData();
    });

    return subscribe;
  }, []);

  return (
    <>
      <View style={{flex: 1, backgroundColor: colors.primary}}>
        <Image
          source={require('../images/logo.png')}
          style={{
            width: 100,
            height: 100,
            resizeMode: 'contain',
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 20,
          }}
        />
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToAlignment="center"
          style={{width: '100%'}}>
          <Step1 scrollNext={scrollNext} />
          <Step2 scrollNext={scrollNext} />
          <Step3 runAr={runAr} />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 100,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.09,
    shadowRadius: 4,
    elevation: 1,
    marginBottom: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  padding32: {
    padding: 32,
  },
  textDataSectionWrapper: {
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    flexWrap: 'wrap',
  },
  descriptionText: {
    fontSize: 16,
    color: 'black',
    marginTop: 16,
    flexWrap: 'wrap',
  },
});

export default ArScreen;
