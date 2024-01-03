import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ForgotPassword from '../screens/ForgotPassword';
import LandingScreen from '../screens/LandingScreen';
import Login from '../screens/Login';
import FormOTP from '../screens/OTP';
import Register from '../screens/Register';
import ResetPassword from '../screens/ResetPassword';
import Appbar from '../components/Appbar';

const Stack = createNativeStackNavigator();

const AuthRouter = () => {
  return (
    <Stack.Navigator screenOptions={{header: Appbar, animation: 'none'}}>
      <Stack.Group>
        <Stack.Screen
          name="Landing Screen"
          component={LandingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Forgot Password" component={ForgotPassword} />
        <Stack.Screen name="OTP" component={FormOTP} />
        <Stack.Screen
          name="Reset Password"
          component={ResetPassword}
          options={{headerShown: false}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AuthRouter;
