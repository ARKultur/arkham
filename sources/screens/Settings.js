import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';

const ContainerButton = ({navigation}) => {
  return (
    <View style={styles.containerButton}>
      <Button mode="contained" onPress={() => navigation.navigate('Profile')} contentStyle={styles.button}>
        <Text style={styles.buttonFont}>Apply</Text>
      </Button>

      <Button mode="outlined" style={{marginTop: 10}}>
        Logout
      </Button>

    </View>
  );
};

const Settings = ({navigation}) => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
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
          secureTextEntry={true}
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
        <TextInput
          label="Confirm Password"
          secureTextEntry={true}
          value={password}
          mode="outlined"
          onChangeText={text => setPassword(text)}
          style={styles.textInput}
        />

        <ContainerButton navigation={navigation} />

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
  logo : {
    width: 224,
    height: 224,
    marginBottom: 30
  },
  containerButton : {
    marginTop: 50,
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

ContainerButton.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};


export default Settings;