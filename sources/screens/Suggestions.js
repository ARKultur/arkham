/* eslint-disable react/prop-types */
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Button, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import {useDispatch, useSelector} from 'react-redux';
import {getSuggestions} from '../API/Suggestions';
import {editSuggestions} from '../reducers/Actions/userActions';

const {height} = Dimensions.get('window');

const ItemImage = ({suggestion, selected}) => {
  const borderAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (selected && selected.includes(suggestion && suggestion.uuid)) {
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
        source={{uri: suggestion && suggestion.imageUrl}}
        style={[
          styles.image,
          selected &&
            selected.includes(suggestion && suggestion.uuid) &&
            borderStyle,
        ]}
      />
    </View>
  );
};

const SuggestionModal = ({
  bottomSheetModalRef,
  selected,
  handleSelected,
  suggestion,
}) => {
  const snapPoints = ['90%', '90%'];

  const CustomHandle = () => {
    return (
      <View
        style={{
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
        }}
      />
    );
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      handleComponent={() => <CustomHandle />}>
      <View style={styles.contentContainer}>
        <Image
          source={{uri: suggestion && suggestion.imageUrl}}
          style={{width: '100%', height: 300}}
        />
        <View style={{padding: 20}}>
          <Text variant="headlineSmall" style={{textAlign: 'center'}}>
            {suggestion && suggestion.name}
          </Text>
          <Text variant="bodyLarge" style={{textAlign: 'center'}}>
            {suggestion && suggestion.description}
          </Text>
        </View>

        <View
          style={{
            justifyContent: 'flex-end',
            padding: 20,
          }}>
          <Button
            mode="contained"
            onPress={() => handleSelected(suggestion)}
            contentStyle={[
              styles.button,
              {
                backgroundColor:
                  selected && selected.includes(suggestion && suggestion.uuid)
                    ? '#C70039'
                    : 'black',
              },
            ]}>
            <Text style={styles.buttonFont}>
              {selected && selected.includes(suggestion && suggestion.uuid)
                ? 'Remove from favorites'
                : 'Add to favorites'}
            </Text>
          </Button>
        </View>
      </View>
    </BottomSheetModal>
  );
};

const Item = ({suggestion, selected, handleSelected}) => {
  const bottomSheetModalRef = useRef(null);

  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <View style={{justifyContent: 'center', paddingVertical: 100}}>
      <SuggestionModal
        bottomSheetModalRef={bottomSheetModalRef}
        suggestion={suggestion}
        selected={selected}
        handleSelected={handleSelected}
      />
      <TouchableOpacity style={styles.slide} onPress={handlePresentModalPress}>
        <ItemImage suggestion={suggestion} selected={selected} />
      </TouchableOpacity>
    </View>
  );
};

const Suggestions = ({navigation}) => {
  const [suggestions, setSuggestions] = React.useState([]);
  const {user, hasSelectedSuggestions} = useSelector(
    state => state.userReducer,
  );
  const [selected, setSelected] = React.useState(
    (user && user.likedSuggestions) || [],
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const suggestions = await getSuggestions(user.token);

        if (suggestions && suggestions.length > 0) {
          setSuggestions(suggestions);
        } else {
          navigation.navigate('Home');
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const handleSelected = suggestion => {
    if (selected.includes(suggestion.uuid)) {
      setSelected(selected.filter(item => item !== suggestion.uuid));
    } else {
      setSelected([...selected, suggestion.uuid]);
    }
  };

  const handleSubmit = async () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else if (hasSelectedSuggestions) {
      navigation.navigate('Home', {screen: 'Profile'});
    } else {
      navigation.navigate('Home');
    }
    await dispatch(editSuggestions(selected));
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 150,
            }}>
            <Text variant="headlineSmall" style={{textAlign: 'center'}}>
              Suggestions
            </Text>

            <Text variant="bodyLarge" style={{textAlign: 'center'}}>
              Select the suggestions you like the most to help us find the best
            </Text>

            <Swiper
              showsButtons={false}
              showsPagination={true}
              loop={false}
              style={{height: height / 1.8}}>
              {suggestions &&
                suggestions.map((suggestion, index) => (
                  <Item
                    key={index}
                    suggestion={suggestion}
                    selected={selected}
                    handleSelected={handleSelected}
                  />
                ))}
            </Swiper>

            <View style={{paddingHorizontal: 20}}>
              <View style={styles.containerButton}>
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  contentStyle={styles.button}>
                  <Text style={styles.buttonFont}>Next</Text>
                </Button>
              </View>
            </View>
          </ScrollView>
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
  containerButton: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  button: {
    padding: 10,
  },
  buttonFont: {
    color: 'white',
    fontSize: 17,
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
