import React, { useEffect, useState } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider, useSelector } from 'react-redux';
import Store from './sources/reducers/Store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import LandingScreen from './sources/screens/LandingScreen';
import Login from './sources/screens/Login';
import Register from './sources/screens/Register';
import Home from './sources/screens/Home';
import Settings from './sources/screens/Settings';
import ForgotPassword from './sources/screens/ForgotPassword';
import Appbar from './sources/components/Appbar';
import ResetPassword from './sources/screens/ResetPassword';
import FormOTP from './sources/screens/OTP';
import Profile from './sources/screens/Profile';
import { Camera } from 'react-native-vision-camera';
import ARScreen from './sources/screens/AR';
import PermissionsPage from './sources/screens/PermissionsPage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const theme = {
  ...DefaultTheme,
  roundness: 2,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1E1E1E',
  },
};

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ header: Appbar, animation: 'none' }}>
      <Stack.Screen name="ProfileScreen" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      activeColor="purple"
      tabBarIcon="yellow"
      barStyle={{ backgroundColor: 'white', padding: 0 }}
      labeled={false}
    >
      <Tab.Screen name="AR" component={ARScreen} options={{
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="camera" color={color} size={25} />
        ),
      }} />
      <Tab.Screen name="Profile" component={ProfileStack} options={{
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={25} />
        ),
      }} />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const { isLoggedIn } = useSelector(state => state.userReducer);
  const [cameraPermission, setCameraPermission] = useState();
  const [microphonePermission, setMicrophonePermission] = useState();

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
    Camera.getMicrophonePermissionStatus().then(setMicrophonePermission);
  }, []);


  if (cameraPermission == null || microphonePermission == null) {
    // still loading
    return null;
  }
  const showPermissionsPage = cameraPermission !== 'authorized' ||
    microphonePermission === 'not-determined';

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ header: Appbar, animation: 'none' }}>
        {showPermissionsPage && <Stack.Screen name="PermissionsPage" component={PermissionsPage} options={{ headerShown: false }} />}
        {!isLoggedIn &&
          <Stack.Group>
            <Stack.Screen name="Tab" component={BottomNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
          </Stack.Group>
          ||
          <Stack.Group>
            <Stack.Screen name="Landing Screen" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Forgot Password" component={ForgotPassword} />
            <Stack.Screen name="OTP" component={FormOTP} />
            <Stack.Screen name="Reset Password" component={ResetPassword} options={{ headerShown: false }} />
          </Stack.Group>
        }
      </Stack.Navigator>

    </NavigationContainer>

  );
};

const App = () => {
  return (
    <StoreProvider store={Store}>
      <PaperProvider theme={theme}>
        <Navigation />
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;
