import React, { useCallback, useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { StyleSheet, View, Text } from 'react-native';
import { Camera } from 'react-native-vision-camera';

const PermissionsPage = ({ navigation }) => {
  const [cameraPermissionStatus, setCameraPermissionStatus] = useState('not-determined');

  const requestCameraPermission = useCallback(async () => {
    const permission = await Camera.requestCameraPermission();

    if (permission === 'denied')
      await Linking.openSettings();
    setCameraPermissionStatus(permission);
  }, []);

  useEffect(() => {
    if (cameraPermissionStatus === 'authorized')
      navigation.replace('Login');
  }, [cameraPermissionStatus, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to{'\n'}Vision Camera.</Text>
      <View style={styles.permissionsContainer}>
        {cameraPermissionStatus !== 'authorized' && (
          <Text style={styles.permissionText}>
            Vision Camera needs <Text style={styles.bold}>Camera permission</Text>.{' '}
            <Text style={styles.hyperlink} onPress={requestCameraPermission}>
              Grant
            </Text>
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  welcome: {
    fontSize: 38,
    fontWeight: 'bold',
    maxWidth: '80%',
  },
  banner: {
    position: 'absolute',
    opacity: 0.4,
    bottom: 0,
    left: 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  permissionsContainer: {
    marginTop: 30,
  },
  permissionText: {
    fontSize: 17,
  },
  hyperlink: {
    color: '#007aff',
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default PermissionsPage;
