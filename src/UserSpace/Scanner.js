import React, {useState} from 'react'
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator, Card, IconButton, Text} from 'react-native-paper';
import { RNCamera } from 'react-native-camera'
import {CardTitle} from "react-native-paper/src/components/Card/CardTitle";
import CardContent from "react-native-paper/src/components/Card/CardContent";

function Scanner() {
    const [wait, setWait] = useState(false);
    const [result, setResult] = useState("");

    const takePicture = async function(camera) {
        const options = { quality: 0.5, base64: true };
        const data = await camera.takePictureAsync(options);
        const ye = data.uri.split("/");
        console.log(ye[ye.length - 1]);
        await getInfoFromServer(data.uri, ye[ye.length - 1]);
    };

    async function getInfoFromServer(filePath, fileName) {
        let data = new FormData();
        data.append('file', {uri: filePath, name: fileName, type: 'image/jpg'});

        fetch('http://141.94.16.86:8888/upload_endpoint', {
            method: 'POST',
            body: data
        }).then(async (res) => {
            let jaj = await res.text()
            console.log(jaj);
            setWait(false);
            setResult(jaj);
        })
    }

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
                {({camera}) => {
                    return (
                        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
                            <IconButton style={styles.buttonScan}
                                        disabled={wait}
                                        icon="cube-scan"
                                        color="white"
                                        size={50}
                                        onPress={() => {
                                            takePicture(camera);
                                            setWait(true);
                                        }}>
                            </IconButton>
                        </View>
                    );
                }}
            </RNCamera>
            <Card style={styles.card}>
                <CardTitle title={"Result:"}
                           theme="default"
                           titleStyle={{color: '#000000'}}
                />
                <CardContent>
                    {wait ? <ActivityIndicator animating={true}
                                               color={'#ff0000'}
                                               size={'large'}
                    /> : <Text>{result}</Text>}
                </CardContent>
            </Card>

        </View>
    );
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
