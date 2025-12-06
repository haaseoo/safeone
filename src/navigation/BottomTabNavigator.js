// src/navigation/BottomTabNavigator.js
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Image} from 'react-native';

import MainHome from '../screens/MainHome';
import MapScreen from '../screens/MapScreen';
import SettingsStack from './SettingsStack';

import GuideScreen from '../screens/guide/GuideScreen';
// import ChallengeScreen from '../screens/ChallengeStack';
import SafeModeScreen from '../screens/SafeModeScreen';

import DisasterGuideScreen from '../screens/guide/DisasterGuideScreen';
import CrimeGuideScreen from '../screens/guide/CrimeGuideScreen';
import TrafficGuideScreen from '../screens/guide/TrafficGuideScreen';
import HealthGuideScreen from '../screens/guide/HealthGuideScreen';
import LifeSafetyGuideScreen from '../screens/guide/LifeSafetyGuideScreen';
import EnvironmentGuideScreen from '../screens/guide/EnvironmentGuideScreen';
import HousingGuideScreen from '../screens/guide/HousingGuideScreen';
import ChallengeScreen from '../screens/ChallengeScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="MainHome" component={MainHome} />
    <Stack.Screen name="Guide" component={GuideStack} />
    <Stack.Screen name="Challenge" component={ChallengeStack} />
    <Stack.Screen name="SafeMode" component={SafeModeStack} />
  </Stack.Navigator>
);

const GuideStack = () => (
  <Stack.Navigator>
    {/* <Stack.Screen
      name="GuideMain"
      component={GuideScreen}
      screenOptions={{headerShown: false}}
    /> */}
    <Stack.Screen name="DisasterGuide" component={DisasterGuideScreen} />
    <Stack.Screen name="CrimeGuide" component={CrimeGuideScreen} />
    <Stack.Screen name="TrafficGuide" component={TrafficGuideScreen} />
    <Stack.Screen name="HealthGuide" component={HealthGuideScreen} />
    <Stack.Screen name="LifeSafetyGuide" component={LifeSafetyGuideScreen} />
    <Stack.Screen name="EnvironmentGuide" component={EnvironmentGuideScreen} />
    <Stack.Screen name="HousingGuide" component={HousingGuideScreen} />
  </Stack.Navigator>
);

const ChallengeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ChallengeMain" component={ChallengeScreen} />
  </Stack.Navigator>
);

const MapStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="MapMain" component={MapScreen} />
  </Stack.Navigator>
);

const SafeModeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="SafeMode" component={SafeModeScreen} />
  </Stack.Navigator>
);

const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {height: 75},
      tabBarIcon: ({focused}) => {
        let icon;
        if (route.name === 'Map') {
          icon = require('../assets/img/tap-map.png');
        } else if (route.name === 'Home') {
          icon = require('../assets/img/tap-home.png');
        } else if (route.name === 'Settings') {
          icon = require('../assets/img/tap-setting.png');
        }
        return (
          <Image
            source={icon}
            style={{
              width: 26,
              height: 26,
              tintColor: focused ? '#EE5AA0' : '#000',
              marginTop: 20,
            }}
          />
        );
      },
    })}>
    <Tab.Screen name="Map" component={MapStack} />
    <Tab.Screen name="Home" component={MainStack} />
    <Tab.Screen name="Settings" component={SettingsStack} />
    {/* <Tab.Screen name="Challenge" component={ChallengeStack} /> */}
  </Tab.Navigator>
);

export default BottomTabNavigator;
