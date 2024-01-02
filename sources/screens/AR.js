import { NativeModules } from 'react-native';
import React, { useState, useEffect} from 'react';
import { Animated, View, StyleSheet, Dimensions, ScrollView, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { get_markers } from '../reducers/Actions/markerAction';

const description = [
  '\n\n                            Voici la page AR.\n\
Grâce à ça, tu vas pouvoir explorer et visualiser les différents objets en réalité augmentées de ta ville !',
  '\n\nAvant de commencer, scannes les alentours afin de calibrer ta position sur la carte pour minimiser les erreurs possibles',
  '\n\nTu auras sur ton écran 2 parties. Au dessus, tu auras le visuel sur ta caméra arrière de ton téléphone.\n\n En dessous, tu auras une carte google map afin que tu puisses te repérer dans la ville\
\n\nA l\'aide de la carte, trouves les marqueurs AR afin de pouvoir les visualiser avec ton téléphone\n\n',
];

const titles = [
  'Bienvenue !',
  'Ensuite',
  'Tu es prêt à explorer les environs'
];
const { width, height } = Dimensions.get('window');
const FIXED_BAR_WIDTH = width * (300 / 320);
const INDICATOR_PADDING = width * (10 / 320);

const ARScreen = () => {
  const itemWidth = FIXED_BAR_WIDTH / ((titles.length - 1) * INDICATOR_PADDING);
  const animateX = new Animated.Value(0);
  const dispatch = useDispatch();
  const state = useSelector(state => state.markerReducer);
  const [makersIsSetup, setMarkerIsSetup] = useState(false);

  useEffect(() => {
    if (!makersIsSetup) {
      dispatch(get_markers());
      setMarkerIsSetup(true);
    }
  }, [state, makersIsSetup]);


  const runAr = () => {
    if (makersIsSetup) {
      NativeModules.Geospacial.runPoc(JSON.stringify(state.markers));
    }
  };
  let SLIDES = [];
  let INDICATORS = [];
  Text.defaultProps = { allowFontScaling: false };

  titles.forEach((title, i) => {
    const thisPage = (
      <View key={i} style={{ width: width }}>
        <View style={styles.padding32}>
          <View style={styles.textDataSectionWrapper}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.descriptionText}>{description[i]}</Text>
          </View>
        </View>
      </View>
    );
    SLIDES.push(thisPage);

    const indicatorPosition = animateX.interpolate({
      inputRange: [width * (i - 1), width * (i + 1)],
      outputRange: [-itemWidth, itemWidth],
      extrapolate: 'clamp'
    });

    const thisBar = (
      <View key={i}
        style={[styles.normalIndicator, {
          width: itemWidth,
          marginLeft: i === 0 ? 0 : INDICATOR_PADDING
        }]}>
        <Animated.View style={[styles.animtedIndicator, {
          width: itemWidth,
          transform: [{ translateX: indicatorPosition }]
        }]} />
      </View>
    );
    INDICATORS.push(thisBar);
  });

  return (
    <>
      <View style={styles.container}>
        <ScrollView horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={10}
          style={styles.positionAbsolute}
          contentContainerStyle={styles.center}
          pagingEnabled
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: animateX } } }
          ])}>
          {SLIDES}
        </ScrollView>

        {/* indicator wrapper */}
        <View style={styles.indicatorOuterWrapper}>
          <View style={styles.indicatorInnerWrapper}>
            {INDICATORS}
          </View>
        </View>
      </View>
      <Button onPress={runAr}>Démarrer</Button>
    </>
  );
};

export default ARScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  positionAbsolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  indicatorOuterWrapper: {
    position: 'absolute',
    justifyContent: 'center',
    flexDirection: 'row',
    bottom: height * 0.15
  },
  indicatorInnerWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sliderImage: {
    height: height * 0.2,
    width: '100%'
  },
  padding32: {
    padding: 32
  },
  textDataSectionWrapper: {
    paddingTop: height * (24 / 360)
  },
  title: {
    fontSize: 24,
    color: '#000'
  },
  descriptionText: {
    fontSize: 14,
    color: '#737373',
    paddingTop: height * (4 / 360),
    lineHeight: 22
  },
  normalIndicator: {
    backgroundColor: '#ccd9ff',
    overflow: 'hidden',
    height: 2,
  },
  animtedIndicator: {
    backgroundColor: '#0033cc',
    height: 2
  }
});
