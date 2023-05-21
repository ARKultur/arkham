import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import UserServices from '../API/User';
import { logout } from '../reducers/Actions/userActions';

const Settings = ({navigation}) => {
  const {user} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = React.useState(user.first_name || '');
  const [lastName, setLastName] = React.useState(user.last_name || '');
  const [email, setEmail] = React.useState(user.email || '');
  const [password, setPassword] = React.useState('');

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text variant="headlineLarge" style={styles.headlines}>Settings</Text>
        <Text variant="headlineSmall" style={styles.headlines}>Personnal info</Text>

        <TextInput
          label="First Name"
          value={firstName}
          mode="outlined"
          onChangeText={text => setFirstName(text)}
          style={styles.textInput}
        />

        <TextInput
          label="Last Name"
          value={lastName}
          mode="outlined"
          onChangeText={text => setLastName(text)}
          style={styles.textInput}
        />

        <TextInput
          label="Email"
          value={email}
          mode="outlined"
          onChangeText={text => setEmail(text)}
          style={styles.textInput}
        />

        <Text variant="headlineSmall" style={styles.headlines}>Password</Text>
        <TextInput
          label="Password"
          secureTextEntry={true}
          value={password}
          mode="outlined"
          onChangeText={text => setPassword(text)}
          style={styles.textInput}
        />

        <View style={styles.containerButton}>
          <Button mode="contained" onPress={() => {
            UserServices.editUser(user.id, {first_name: firstName, last_name: lastName, email: email, password: password, token: user.token});
            navigation.navigate('Profile');
          }} contentStyle={styles.button}>
            <Text style={styles.buttonFont}>Apply</Text>
          </Button>

          <Button mode="outlined" style={{marginTop: 10}} onPress={() => dispatch(logout())}>
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
    paddingTop: 60
  },
  containerLogo: {
    padding: 50,
    alignItems: 'center',
  },
  logo : {
    width: 224,
    height: 224,
    marginBottom: 30
  },
  containerButton : {
    marginTop: 40,
  },
  button: {
    padding: 10,
  },
  buttonFont: {
    color: 'white',
    fontSize: 20
  },
  headlines: {
    marginBottom: 10,
  },
  textInput: {
    marginBottom: 10
  }
});

Settings.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Settings;