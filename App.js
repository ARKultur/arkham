import * as React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserScreen from "./src/UserSpace/UserScreen";
import InformationScreen from "./src/UserSpace/InformationScreen";
import LoginScreen from "./src/LoginSpace/LoginScreen";
import ProfileScreen from "./src/ProfileSpace/ProfileScreen";

const Stack = createNativeStackNavigator();

const MyComponent = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="LoginScreen"
                              component={LoginScreen}
                              options={{ headerShown: false }}
                />
                <Stack.Screen name="UserScreen"
                              component={UserScreen}
                              options={{ headerShown: false }}
                />
                <Stack.Screen name="InfoScreen" component={InformationScreen}/>
                <Stack.Screen name="ProfileScreen" component={ProfileScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MyComponent;
