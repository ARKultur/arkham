import React from 'react';
import PropTypes from 'prop-types';
import { Button, TextInput, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';


export const ResetPassword = ({navigation}) => {
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>Reset Password</Text>
      <Text variant="bodyLarge" >Hello john.doe@epitech.eu,</Text>
      <Text variant="bodyLarge" style={styles.title}>Please enter your new password</Text>

      <TextInput
        label="New Password"
        secureTextEntry={true}
        value={password}
        mode="outlined"
        onChangeText={text => setPassword(text)}
      />
      <TextInput
        label="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        mode="outlined"
        onChangeText={text => setConfirmPassword(text)}
      />

      <View style={styles.containerButton}>
        <Button mode="contained" onPress={() => navigation.navigate('Login')} contentStyle={styles.button}>
          <Text style={styles.buttonFont}>Reset your password</Text>
        </Button>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginTop: 75,
  },
  containerButton : {
    flex: 1,
    marginBottom: 30,
    justifyContent: 'flex-end',
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

ResetPassword.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default ResetPassword;