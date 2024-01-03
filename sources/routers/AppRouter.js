import React from 'react';
import {useSelector} from 'react-redux';
import Suggestions from '../screens/Suggestions';
import Home from '../screens/Home';

import Settings from '../screens/Settings';
import Profile from '../screens/Profile';
import BottomMenu from '../components/BottomMenu';
import Appbar from '../components/Appbar';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ArScreen from '../screens/ArScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{header: Appbar, animation: 'none'}}>
      <Stack.Screen name="ProfileScreen" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Suggestions" component={Suggestions} />
    </Stack.Navigator>
  );
};

const AppRouter = () => {
  const {hasSelectedSuggestions} = useSelector(state => state.userReducer);

  console.log(hasSelectedSuggestions);

  const renderTabBar = props => {
    return <BottomMenu {...props} />;
  };

  return (
    <>
      {!hasSelectedSuggestions ? (
        <Stack.Screen name="Suggestions" component={Suggestions} />
      ) : (
        <Tab.Navigator
          initialRouteName="Home"
          tabBar={renderTabBar}
          screenOptions={{
            headerShown: false,
          }}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="AR" component={ArScreen} />
          <Tab.Screen name="Profile" component={ProfileStack} />
        </Tab.Navigator>
      )}
    </>
  );
};

export default AppRouter;
