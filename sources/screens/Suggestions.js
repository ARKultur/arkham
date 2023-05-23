/* eslint-disable react/prop-types */
import {
  BottomSheetModal,
  BottomSheetModalProvider
} from '@gorhom/bottom-sheet';
import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

const images = [
  'https://www.visittheusa.fr/sites/default/files/styles/us_media_l_x2_4000x1408/public/images/hero_media_image/2020-05/50c5ace7-8611-40c2-9c12-0f9aba60a972.jpeg?h=9c2070a3&itok=TqqNNVai',
  'https://www.visittheusa.fr/sites/default/files/styles/us_media_l_x2_4000x1408/public/images/hero_media_image/2020-05/25eb5ee9-d742-4fa6-a573-48a821272988.jpeg?h=0ea9c5b3&itok=nT68JGUS',
  'https://blog.likibu.com/fr/wp-content/uploads/2018/05/Berlin_Allemagne_Brandenburg-Gate-Berlin-Germany-panorama_917459481.jpg'
];

const ItemImage = ({ image, selected }) => {

  const borderAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (selected) {
      Animated.timing(borderAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(borderAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [selected]);

  const borderStyle = {
    borderColor: '#BA0000',
    borderWidth: borderAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 5],
    }),
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: image }}
        style={[styles.image, selected && borderStyle]}
      />
    </View>
  );
};

const SuggestionModal = ({bottomSheetModalRef, selected, setSelected, image}) => {
  const snapPoints = React.useMemo(() => ['90%', '50%'], []);

  const CustomHandle = () => {
    return (
      <View style={{
        backgroundColor: 'white',
        height: 10,
        width: 150,
        borderRadius: 5,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
      }} />
    );
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      handleComponent={() => <CustomHandle />}
    >
      <View style={styles.contentContainer}>
        <Image source={{ uri: image }} style={{ width: '100%', height: 300 }} />
        <View style={{padding: 20}}>
          <Text variant="headlineSmall" style={{textAlign: 'center'}}>
            Suggestions
          </Text>
          <Text variant="bodyLarge" style={{textAlign: 'center'}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s...
          </Text>
        </View>

        <View style={{
          justifyContent: 'flex-end',
          padding: 20
        }}>
          <Button
            mode="contained"
            onPress={() => setSelected(!selected)}
            contentStyle={[styles.button, {
              backgroundColor: selected ? '#C70039' : 'black'
            }]}
          >
            <Text style={styles.buttonFont}>
              {selected ? 'Remove from favorites' : 'Add to favorites'}
            </Text>
          </Button>
        </View>

      </View>
    </BottomSheetModal>
  );
};

const Item = ({image}) => {
  const bottomSheetModalRef = useRef(null);
  const [selected, setSelected] = React.useState(0);

  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);


  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <SuggestionModal
        bottomSheetModalRef={bottomSheetModalRef}
        image={image}
        selected={selected}
        setSelected={setSelected}
      />
      <TouchableOpacity
        style={styles.slide}
        onPress={handlePresentModalPress}
      >
        <ItemImage image={image} selected={selected} />
      </TouchableOpacity>
    </View>
  );
};

const Suggestions = ({navigation}) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider style={{ flex: 1 }}>
        <SafeAreaView style={{flex: 1}}>

          <View style={{flex: 0.3, justifyContent: 'center', alignSelf: 'center', paddingHorizontal: 50, paddingTop: 50}}>
            <Text variant="headlineSmall" style={{textAlign: 'center'}}>
              Suggestions
            </Text>

            <Text variant="bodyLarge" style={{textAlign: 'center'}}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s...
            </Text>
          </View>

          <Swiper
            showsButtons={false}
            showsPagination={true}
            loop={false}
          >
            {images.map((image, index) => <Item key={index} image={image} />)}
          </Swiper>

          <View style={{paddingHorizontal: 20, flex: 0.2}}>
            <View style={styles.containerButton}>

              <Button mode="contained" onPress={() => navigation.navigate('Tab')} contentStyle={styles.button}>
                <Text style={styles.buttonFont}>Next</Text>
              </Button>

            </View>
          </View>

        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  slide: {
    justifyContent: 'center',
    alignSelf: 'center',
    height: 300,
    width: 300,
  },
  containerButton : {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10
  },
  button: {
    padding: 10,
  },
  buttonFont: {
    color: 'white',
    fontSize: 20
  },
  container: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 150,
  },
});

export default Suggestions;