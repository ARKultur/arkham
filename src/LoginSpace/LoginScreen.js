import React from "react";
import {View} from "react-native";
import {Button} from "react-native-paper";
import { useNavigation } from '@react-navigation/native';

function LoginScreen() {
    const navigation = useNavigation();

    return (
        <View>
            <Button onClick={() => {
                navigation.navigate('UserScreen');
            }}>Goto</Button>
        </View>
    );
}

export default LoginScreen;
