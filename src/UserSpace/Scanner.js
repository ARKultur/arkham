import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { IconButton} from 'react-native-paper';
import { RNCamera } from 'react-native-camera'

class Scanner extends Component {
    render() {
        return (
            <View style={styles.container}>
              <RNCamera
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.off}
                androidCameraPermissionOptions={{
                  title: 'Permission to use camera',
                  message: 'We need your permission to use your camera',
                  buttonPositive: 'Ok',
                  buttonNegative: 'Cancel',
                }}
                androidRecordAudioPermissionOptions={{
                  title: 'Permission to use audio recording',
                  message: 'We need your permission to use your audio',
                  buttonPositive: 'Ok',
                  buttonNegative: 'Cancel',
                }}
              >
                {({ camera, status, recordAudioPermissionStatus }) => {
                  return (
                    <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                      <IconButton style={styles.buttonScan}
                            icon="cube-scan"
                            color="white"
                            size={50}
                            onPress={() => this.takePicture(camera)}>
                      </IconButton>
                    </View>
                  );
                }}
              </RNCamera>
            </View>
          );
        }

takePicture = async function(camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    console.log(data.uri);
};
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
},
preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
},
buttonScan: {
    borderWidth: 0,
    marginBottom: 100,
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 'auto',
    backgroundColor: '#8e38ff',
},
});

export default Scanner
