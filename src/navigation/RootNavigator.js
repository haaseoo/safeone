import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from './AuthStack';
import BottomTabNavigator from './BottomTabNavigator'; // 아래에서 따로 분리해서 구성
import {AuthContext} from '../context/AuthContext';
const Stack = createStackNavigator();

const RootNavigator = () => {
  const {isLoggedIn} = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        <Stack.Screen name="MainApp" component={BottomTabNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
