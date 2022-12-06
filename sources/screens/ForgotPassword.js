import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [confirmEmail, setConfirmEmail] = React.useState('');

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>Reset Password</Text>
      <Text variant="bodyLarge" style={styles.title}>Please enter your email</Text>

      <TextInput
        label="Email"
        value={email}
        mode="outlined"
        onChangeText={text => setEmail(text)}
        style={{marginBottom: 15}}
      />

      <TextInput
        label="Confirm Email"
        value={confirmEmail}
        mode="outlined"
        onChangeText={text => setConfirmEmail(text)}
      />

      <View style={styles.containerButton}>
        <Button mode="contained" onPress={() => navigation.navigate('OTP')} contentStyle={styles.button}>
          <Text style={styles.buttonFont}>Next</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  containerButton : {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  button: {
    padding: 10,
  },
  buttonFont: {
    color: 'white',
    fontSize: 20
  },
  title : {
    marginBottom: 10,
  }
});

ForgotPassword.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default ForgotPassword;