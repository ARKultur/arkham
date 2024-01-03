import {useTheme} from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {Alert, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {Avatar, Button, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import {getSuggestions} from '../API/Suggestions';
import {logout} from '../reducers/Actions/userActions';
import {launchImageLibrary} from 'react-native-image-picker';
import {setProfilePicture} from '../reducers/userReducer';

const ProfilePicture = () => {
  const {profilePicture} = useSelector(state => state.userReducer);
  const [image, setImage] = React.useState(
    profilePicture ? profilePicture : null,
  );
  const dispatch = useDispatch();

  const handleOnPress = async () => {
    try {
      const response = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
        saveToPhotos: true,
      });

      if (response.didCancel) {
        return;
      }

      const data = response && response.assets && response.assets[0];
      const image = {
        uri: data.uri,
        type: data.type,
        name: data.fileName,
      };

      console.log(image);

      setImage(image);
      dispatch(setProfilePicture(image));
    } catch (e) {
      console.log(e);
      Alert.alert('Erreur', e.message, [
        {
          text: 'OK',
        },
      ]);
    }
  };

  return (
    <Pressable style={styles.profileImage} onPress={handleOnPress}>
      {image && <Avatar.Image source={image} size={150} />}
      {!image && (
        <Avatar.Icon
          size={150}
          icon="account"
          theme={{
            colors: {primary: 'white'},
          }}
          color={'#1c1818'}
        />
      )}
    </Pressable>
  );
};

const CardInfo = ({title, value}) => {
  const {colors} = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
      }}>
      <View
        style={{
          backgroundColor: colors.primary,
          borderRadius: 50,
          width: 60,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {title === 'Email' ? (
          <EntypoIcon name="email" size={30} color="white" />
        ) : (
          <Icon name="user-alt" size={30} color="white" />
        )}
      </View>
      <View>
        <Text style={{fontWeight: 'bold'}}>{title}</Text>
        <Text>{value}</Text>
      </View>
    </View>
  );
};

const SuggestionsInfo = () => {
  const {user} = useSelector(state => state.userReducer);
  const [suggestions, setSuggestions] = React.useState([]);
  const {colors} = useTheme();

  const getData = async () => {
    try {
      const data = await getSuggestions(user.token);
      const selectedSuggestions = data.filter(
        item =>
          user &&
          user.likedSuggestions &&
          user.likedSuggestions.includes(item.uuid),
      );

      setSuggestions(selectedSuggestions);
    } catch (error) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
      }}>
      <View
        style={{
          backgroundColor: colors.primary,
          borderRadius: 50,
          width: 60,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FAIcon name="heart" size={30} color="white" />
      </View>
      <View>
        <Text style={{fontWeight: 'bold'}}>Suggestions</Text>

        <Text>
          {suggestions && suggestions.length > 0
            ? suggestions.map(item => item.name).join(', ')
            : 'No suggestions.'}
        </Text>
      </View>
    </View>
  );
};

CardInfo.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const Profile = ({navigation}) => {
  const {user} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const {colors} = useTheme();

  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: colors.primary,
          width: '100%',
          height: 200,
          position: 'absolute',
        }}
      />
      <View style={{marginBottom: 100, padding: 20}}>
        <View style={{...styles.card, backgroundColor: '#1c1818'}}>
          <Pressable
            onPress={() => navigation.navigate('Settings')}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
            }}>
            <Icon name="cogs" size={30} color="white" />
          </Pressable>
          <ProfilePicture />
          <Text
            variant="headlineLarge"
            style={{color: 'white', textTransform: 'uppercase', marginTop: 20}}>
            {user && user.username}
          </Text>
        </View>

        <View style={styles.containerContent}>
          <CardInfo title="Username" value={user.username} />
          <CardInfo title="Email" value={user.email} />
          <SuggestionsInfo />
          <View style={styles.containerButton}>
            <Button
              mode="outlined"
              style={{marginTop: 10}}
              onPress={() => dispatch(logout())}>
              Logout
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    alignItems: 'center',
    padding: 20,
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
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerContent: {
    marginTop: 30,
    flexDirection: 'column',
    gap: 10,
  },
  button: {
    margin: 5,
    padding: 10,
    color: 'white',
    fontSize: 20,
  },
  containerButton: {
    marginTop: 30,
  },
});

Profile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;
