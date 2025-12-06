import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import {AuthProvider} from './src/context/AuthContext';

import Geolocation from '@react-native-community/geolocation';
navigator.geolocation = Geolocation;

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
