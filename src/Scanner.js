import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, } from 'react-native';
import { IconButton} from 'react-native-paper';
import { RNCamera } from 'react-native-camera'

class Scanner extends Component {
    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    style={styles.camera}
                    ref={ref => {
                        this.camera = ref
                    }}
                />
                <View
                    style={{
                    position: 'absolute',
                    bottom: 0,
                    width: "100%",
                    backgroundColor: 'transparant',
                    }}
                >
                <IconButton
                    style={styles.buttonScan}
                    icon="cube-scan"
                    color="white"
                    size={50}
                    onPress={() => console.log('Pressed')}
                />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black'
    },
    camera: {
        flex: 1,
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