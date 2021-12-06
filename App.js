import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Button } from 'react-native-paper';

export default function App() {
  return (
        <View style={styles.container}>
        <StatusBar style="auto" />
        <Image
            style={styles.logoMain}
            source={require('./rsrc/lockup-vertical-colored.png')}
        />
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
  buttonScan: {
    marginTop: 200,
    backgroundColor: '#8e38ff',
    color: '#fff'
  },
  buttonMaps: {
    marginTop: 20,
    backgroundColor: '#8e38ff',
    },
});
