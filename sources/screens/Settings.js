import PropTypes from 'prop-types';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {editUser, logout} from '../reducers/Actions/userActions';

const Settings = ({navigation}) => {
  const {user} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [username, setUsername] = React.useState(user.username || '');
  const [password, setPassword] = React.useState('');

  const handleEdit = async () => {
    try {
      await dispatch(
        editUser({
          username: username,
          email: user.email,
          token: user.accessToken,
        }),
      );
      navigation.navigate('ProfileScreen');
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswdEdit = async () => {
    await dispatch(
      editUser({
        email: user.email,
        password: password,
        token: user.accessToken,
      }),
    );
    navigation.navigate('ProfileScreen');
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 150,
      }}>
      <View style={styles.container}>
        <Text variant="headlineLarge" style={styles.headlines}>
          Settings
        </Text>
        <Text variant="headlineSmall" style={styles.headlines}>
          Personnal info
        </Text>

        <TextInput
          label="Username"
          value={username}
          mode="outlined"
          onChangeText={text => setUsername(text)}
          style={styles.textInput}
        />

        <View style={styles.containerButton}>
          <Button
            mode="contained"
            onPress={handleEdit}
            contentStyle={styles.button}>
            <Text style={styles.buttonFont}>Apply</Text>
          </Button>
          <Button
            mode="outlined"
            style={{marginTop: 10}}
            onPress={() => navigation.navigate('Suggestions')}>
            Suggestions
          </Button>
        </View>

        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            marginBottom: 20,
            marginTop: 20,
          }}
        />

        <Text variant="headlineSmall" style={styles.headlines}>
          Password
        </Text>
        <TextInput
          label="Password"
          secureTextEntry={true}
          value={password}
          mode="outlined"
          onChangeText={text => setPassword(text)}
          style={styles.textInput}
        />

        <View style={styles.containerButton}>
          <Button
            mode="contained"
            onPress={handlePasswdEdit}
            contentStyle={styles.button}>
            <Text style={styles.buttonFont}>Apply</Text>
          </Button>

          <Button
            mode="outlined"
            style={{marginTop: 10}}
            onPress={() => dispatch(logout())}>
            Logout
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
  },
  containerLogo: {
    padding: 50,
    alignItems: 'center',
  },
  logo: {
    width: 224,
    height: 224,
    marginBottom: 30,
  },
  containerButton: {
    marginTop: 50,
  },
  button: {
    padding: 10,
  },
  buttonFont: {
    color: 'white',
    fontSize: 20,
  },
  headlines: {
    marginBottom: 10,
  },
  textInput: {
    marginBottom: 10,
  },
});

Settings.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Settings;
