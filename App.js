import React, { useEffect, useState } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import Store from './sources/reducers/Store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1E1E1E',
  },
};

const App = () => {
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
    <StoreProvider store={Store}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator screenOptions={{header: Appbar, animation: 'none'}}
            initialRouteName={showPermissionsPage ? 'PermissionsPage' : 'ARScreen'}
          >
            <Stack.Screen name="PermissionsPage" component={PermissionsPage} />
            <Stack.Screen name="ARScreen" component={ARScreen} />
            <Stack.Screen name="Landing Screen" component={LandingScreen} options={{headerShown: false}} />
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Forgot Password" component={ForgotPassword} />
            <Stack.Screen name="OTP" component={FormOTP} />
            <Stack.Screen name="Reset Password" component={ResetPassword} options={{headerShown: false}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;
