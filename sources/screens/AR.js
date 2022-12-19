import React from 'react';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { StyleSheet, View } from 'react-native';

const ARScreen = () => {
  const devices = useCameraDevices();
  const device = devices.back;

  if (!device)
    return <View />;
  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
    />
  );
};

export default ARScreen;
