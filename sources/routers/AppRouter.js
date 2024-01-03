import React from 'react';
import {useSelector} from 'react-redux';
import Home from '../screens/Home';
import Suggestions from '../screens/Suggestions';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomMenu from '../components/BottomMenu';
import ArScreen from '../screens/ArScreen';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';
import Appbar from '../components/Appbar';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'none',
        header: props => <Appbar {...props} />,
      }}>
      <Stack.Screen
        name="ProfileScreen"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Suggestions" component={Suggestions} />
    </Stack.Navigator>
  );
};

const AppRouter = () => {
  const {hasSelectedSuggestions} = useSelector(state => state.userReducer);

  const renderTabBar = props => {
    return <BottomMenu {...props} />;
  };

  return (
    <>
      {!hasSelectedSuggestions ? (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Suggestions" component={Suggestions} />
        </Stack.Navigator>
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
