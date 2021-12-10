import React from "react";
import {Text, View} from "react-native";
import {Button} from "react-native-paper";
import {useNavigation} from '@react-navigation/native';
import {Image} from "react-native";

function LoginScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.page}>
            {/* TODO Importer background SVG blop */}
            <Image source={require('../../rsc/lockup-vertical-colored.png')}
                   style={styles.logo}
            />
            {/* TODO Importer font GOOGLE pour all text */}
            <Text style={styles.description} >Revisitez votre voyage avec la puissance de la réalité augmentée</Text>

            <Button mode="contained"
                    onPress={() => {
                        navigation.navigate('UserScreen');
                    }}
            >
                Start the demo
            </Button>
        </View>
    );
}

const styles = {
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    logo:{
        width: 270,
        height: 200,
        top: -80
    },
    description: {
        margin: 25,
        fontSize: 14,
    },
}

export default LoginScreen;
