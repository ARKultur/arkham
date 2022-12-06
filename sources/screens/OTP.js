import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import InputOTP from '../components/InputOTP';

export const FormOTP = ({navigation}) => {
  const [code, setCode] = React.useState('');

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>Verify the One-Time Password</Text>
      <Text variant="bodyLarge" style={styles.title}>Please enter the code sent to john.doe@epitech.eu</Text>

      <InputOTP code={code} setCode={setCode} />

      <View style={styles.containerButton}>
        <Button mode="contained" onPress={() => navigation.navigate('Reset Password')} contentStyle={styles.button}>
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
  logo : {
    width: 224,
    height: 224,
    marginBottom: 30
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
  },
});

FormOTP.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default FormOTP;