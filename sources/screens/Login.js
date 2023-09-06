import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Logo from '../images/logo.png';
import PropTypes from 'prop-types';
import DividerText from '../components/DividerText';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/Actions/userActions';

const LogoHeader = () => {
  return (
    <View style={styles.containerLogo}>
      <Image
        source={Logo}
      />
      <Text variant="displaySmall">ARKultur</Text>
    </View>
  );
};

const ContainerButton = (props) => {
  const dispatch = useDispatch();
  const { navigation, email, password } = props;

  return (
    <View style={styles.containerButton}>
      <Button mode="contained" onPress={() => dispatch(login({email, password}))} contentStyle={styles.button}>
        <Text style={styles.buttonFont}>Login</Text>
      </Button>

      <DividerText>{'Don\'t have an account ?'}</DividerText>

      <Button mode="outlined" onPress={() => navigation.navigate('Register')}>
        Register
      </Button>

    </View>
  );
};

const Login = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <ScrollView style={{flex:1}}>
      <View style={styles.container}>

        <LogoHeader />

        <TextInput
          label="Email"
          value={email}
          mode="outlined"
          onChangeText={text => setEmail(text)}
        />

        <TextInput
          label="Password"
          secureTextEntry={true}
          value={password}
          mode="outlined"
          onChangeText={text => setPassword(text)}
        />

        {/* <Text variant="bodyLarge" style={{textAlign: 'right', marginTop: 10}} onPress={() => navigation.navigate('Forgot Password')}>Forgot password?</Text> */}

        <ContainerButton navigation={navigation} email={email} password={password}/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
  },
  containerLogo: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  logo : {
    width: 224,
    height: 224,
    marginBottom: 30
  },
  containerButton : {
    marginBottom: 30,
    justifyContent: 'flex-end',
    paddingVertical: 30,
  },
  button: {
    padding: 10,
  },
  buttonFont: {
    color: 'white',
    fontSize: 20
  }
});

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

ContainerButton.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  email : PropTypes.string.isRequired,
  password : PropTypes.string.isRequired,
};


export default Login;