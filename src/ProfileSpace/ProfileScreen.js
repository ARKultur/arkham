import React, {useContext} from "react";
import {View} from "react-native";
import {Button, Avatar} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import {UserContext} from "../UserSpace/UserScreen";


function ProfileScreen() {
    const navigation = useNavigation();
    const ctx = useContext(UserContext);

    return(
        <View style={styles.page}>
            <Avatar.Icon size={300} icon="account" style={styles.icon} />
            <Button mode="contained"
                    onPress={() => {
                        navigation.navigate('LoginScreen');
                    }}
            >
                Logout
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
    icon: {
        backgroundColor: '#ffffff',
        top: -100
    }
}

export default ProfileScreen;
