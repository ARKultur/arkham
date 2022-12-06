import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Logo from '../images/logo.png';
import PropTypes from 'prop-types';

const LandingScreen = ({navigation}) => {
  return (
    <View style={styles.container}>

      <View style={styles.containerLogo}>
        <Image
          source={Logo}
          style={styles.logo}
        />
        <Text variant="displaySmall">ARKultur</Text>
      </View>

      <View style={styles.containerButton}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Login')}
          contentStyle={styles.button}
          labelStyle={styles.buttonFont}
        >
        Discover
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  containerLogo: {
    alignItems: 'center',
  },
  containerButton : {
    padding: 50
  },
  logo : {
    width: 224,
    height: 224,
    marginBottom: 30
  },
  button : {
    padding: 15,
  },
  buttonFont: {
    color: 'white',
    fontSize: 20
  }
});


LandingScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default LandingScreen;