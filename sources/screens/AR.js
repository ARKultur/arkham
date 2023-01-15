import React, { useRef } from 'react';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
    buttonContainer: {
        paddingLeft: 130,
        bottom: 0,
        position: 'absolute',
    }
});

const ARScreen = () => {
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef(null);
  const takePhoto = async () => {
    try {
      const takePhotoOptions = {
        flash: 'on'
      };
      //Error Handle better
      if (camera.current == null)
        throw new Error('Camera Ref is Null');
      console.log('Photo taking ....');
      const photo = await camera.current.takePhoto(takePhotoOptions);
      console.log(photo.path)
    } catch (error) {
      console.log(error);
    }
  };

  if (!device)
    return <View />;
  return (
    <>
        <Camera style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          ref={camera}
          photo={true}
        />
        <Button style={styles.buttonContainer}
          onPress={takePhoto}
          icon={() =>
              <Image source={require('../images/white-circle.png')} />
          }
        />
    </>
  );
};

export default ARScreen;
