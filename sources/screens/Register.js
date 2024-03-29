import PropTypes from 'prop-types';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import DividerText from '../components/DividerText';
import {register} from '../reducers/Actions/userActions';
import {subToNewsLetter} from '../API/Newsletter';

const ContainerButton = props => {
  const {
    navigation,
    username,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  } = props;
  const dispatch = useDispatch();

  return (
    <View style={styles.containerButton}>
      <Button
        mode="contained"
        onPress={() => {
          dispatch(register({username, email, password}));
          subToNewsLetter(email);
          navigation.navigate('Login');
        }}
        contentStyle={styles.button}>
        <Text style={styles.buttonFont}>Register</Text>
      </Button>

      <DividerText>Already have an account ?</DividerText>

      <Button mode="outlined" onPress={() => navigation.navigate('Login')}>
        Login
      </Button>
    </View>
  );
};

const Register = ({navigation}) => {
  const [username, setUsername] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  return (
    <ScrollView>
      <View style={styles.container}>
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
        {/* <TextInput
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
        /> */}
        <TextInput
          label="Email"
          value={email}
          mode="outlined"
          onChangeText={text => setEmail(text)}
          style={styles.textInput}
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
        <TextInput
          label="Confirm Password"
          secureTextEntry={true}
          value={confirmPassword}
          mode="outlined"
          onChangeText={text => setConfirmPassword(text)}
          style={styles.textInput}
        />

        <ContainerButton
          navigation={navigation}
          username={username}
          firstName={firstName}
          lastName={lastName}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
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

Register.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

ContainerButton.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  username: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
};

export default Register;
