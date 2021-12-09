import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Button } from 'react-native-paper';

export default function App() {
  return (
        <View style={styles.container}>
        <StatusBar style="auto" />
        {/* TODO Importer background SVG blop */}
        <Image
            style={styles.logoMain}
            source={require('./rsc/lockup-vertical-colored.png')}
        />
        {/* TODO Importer font GOOGLE pour all text */}
        <Text style={styles.description} >Revisitez votre voyage avec la puissance de la réalité augmentée</Text>
        <PaperProvider>
              <Button mode="contained" style={styles.buttonScan} onPress={() => console.log('SCANNER')}>
                  <Text style={styles.buttonScan}>SCANNER</Text>
                </Button>
                <Button mode="contained" style={styles.buttonMaps} onPress={() => console.log('MAPS')}>
                    <Text style={styles.buttonScan}>MAPS</Text>
                </Button>
        </PaperProvider>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logoMain: {
      marginTop: 60,
      width: 253,
      height: 188,
  },
  description: {
      margin: 25,
      fontSize: 14,
},
  buttonScan: {
    marginTop: 130,
    width: 150,
    backgroundColor: '#8e38ff',
    color: '#fff'
  },
  buttonMaps: {
    marginTop: 20,
    backgroundColor: '#8e38ff',
    },
});
