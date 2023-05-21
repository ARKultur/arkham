import React, { useRef } from 'react';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { StyleSheet, View, Image, NativeModules } from 'react-native';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
  takePhotoButton: {
    paddingLeft: 152,
    bottom: 0,
    position: 'absolute',
  }
});

const ARScreen = () => {
  const takePhoto = async () => {
    console.log(NativeModules.Geospacial);
    NativeModules.Geospacial.runPoc();
    try {
      const takePhotoOptions = {
        flash: 'on'
      };
      //Error Handle better
      if (camera.current == null)
        throw new Error('Camera Ref is Null');
      console.log('Photo taking ....');
      console.log(photo.path);
    } catch (error) {
      console.log(error);

    }
  };

  return (
    <>
      <Button style={styles.takePhotoButton}
        onPress={takePhoto}
        icon={() =>
          <Image source={require('../images/white-circle.png')} />
        }
      />
    </>
  );
};

export default ARScreen;
