import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Provider as StoreProvider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './sources/reducers/Store';
import Appbar from './sources/components/Appbar';
import ARScreen from './sources/screens/AR';
import ForgotPassword from './sources/screens/ForgotPassword';
import Home from './sources/screens/Home';
import LandingScreen from './sources/screens/LandingScreen';
import Login from './sources/screens/Login';
import FormOTP from './sources/screens/OTP';
import Profile from './sources/screens/Profile';
import Register from './sources/screens/Register';
import ResetPassword from './sources/screens/ResetPassword';
import Settings from './sources/screens/Settings';
import Suggestions from './sources/screens/Suggestions';
import {StatusBar} from 'react-native';

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
    <Stack.Navigator screenOptions={{header: Appbar, animation: 'none'}}>
      <Stack.Screen name="ProfileScreen" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Suggestions" component={Suggestions} />
    </Stack.Navigator>
  );
};

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      activeColor="purple"
      tabBarIcon="yellow"
      barStyle={{backgroundColor: 'white', padding: 0}}
      labeled={false}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="AR"
        component={ARScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="camera" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const {isLoggedIn, hasSelectedSuggestions} = useSelector(
    state => state.userReducer,
  );

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{header: Appbar, animation: 'none'}}>
        {(isLoggedIn && (
          <Stack.Group>
            {!hasSelectedSuggestions && (
              <Stack.Screen name="Suggestions" component={Suggestions} />
            )}
            <Stack.Screen
              name="Tab"
              component={BottomNavigation}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{headerShown: false}}
            />
          </Stack.Group>
        )) || (
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
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <StatusBar
            animated={true}
            backgroundColor="white"
            barStyle={'dark-content'}
            showHideTransition={'fade'}
          />
          <Navigation />
        </PaperProvider>
      </PersistGate>
    </StoreProvider>
  );
};

export default App;
