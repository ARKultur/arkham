import React from "react";
import {View} from "react-native";
import {Button} from "react-native-paper";
import {useNavigation} from '@react-navigation/native';
import {Image} from "react-native";

function LoginScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.page}>
            <Image source={require('../../rsc/lockup-vertical-colored.png')}
                   style={styles.logo}
            />
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
        top: -100
    }
}

export default LoginScreen;
