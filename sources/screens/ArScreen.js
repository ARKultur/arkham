import {useTheme} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  NativeModules,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getAllMarkers} from '../API/Markers';
import {useDispatch, useSelector} from 'react-redux';
import {setSkipTutoAR} from '../reducers/userReducer';

const {width} = Dimensions.get('window');

const Step1 = ({scrollNext}) => {
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View>
          <Text style={styles.title}>Voici la page AR</Text>
          <Text style={styles.descriptionText}>
            Grâce à ça, tu vas pouvoir explorer et visualiser les différents
            objets en réalité augmentées de ta ville !
          </Text>
        </View>

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
            <Text style={{color: 'white'}}>Suivant</Text>
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
          <Text style={styles.title}>Un petit moment ...</Text>
          <Text style={styles.descriptionText}>
            Avant de commencer, scannes les alentours afin de calibrer ta
            position sur la carte pour minimiser les erreurs possibles
          </Text>
        </View>

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
            <Text style={{color: 'white'}}>Suivant</Text>
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
          <Text style={styles.title}>Tu es prêt à explorer les environs.</Text>
          <Text style={styles.descriptionText}>
            {
              "\n\nTu auras sur ton écran 2 parties. Au dessus, tu auras le visuel sur ta caméra arrière de ton téléphone.\n\n En dessous, tu auras une carte google map afin que tu puisses te repérer dans la ville\n\n\nA l'aide de la carte, trouves les marqueurs AR afin de pouvoir les visualiser avec ton téléphone\n\n"
            }
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
  const {skipTutoAR} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const scrollNext = page => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({x: page * width, y: 0, animated: true});
    }
  };

  const runAr = () => {
    if (markers && markers.length > 0) {
      NativeModules.Geospacial.runPoc(JSON.stringify(markers));
    }
    dispatch(setSkipTutoAR(true));
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
      {skipTutoAR ? (
        runAr()
      ) : (
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
      )}
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
