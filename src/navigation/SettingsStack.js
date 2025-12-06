import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SettingsScreen from '../screens/settings/SettingsScreen';

import AlertSettingScreen from '../screens/settings/AlterSettingScreen';
import EmergencyContactScreen from '../screens/settings/EmergencyContactScreen';
import FaqScreen from '../screens/settings/FaqScreen';
import InquiryScreen from '../screens/settings/InquiryScreen';
import LocationShareScreen from '../screens/settings/LocationShareScreen';
import PermissionInfoScreen from '../screens/settings/PermissionInfoScreen';
import ProfileEditScreen from '../screens/settings/ProfileEditScreen';
import ReminderSettingScreen from '../screens/settings/ReminderSettingScreen';
import SosContactScreen from '../screens/settings/SosContactScreen';
const Stack = createStackNavigator();

const SettingsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="SettingsMain"
      component={SettingsScreen}
      options={{title: '환경설정'}}
    />
    <Stack.Screen name="AlertSetting" component={AlertSettingScreen} />
    <Stack.Screen name="ReminderSetting" component={ReminderSettingScreen} />
    <Stack.Screen name="LocationShare" component={LocationShareScreen} />
    <Stack.Screen name="PermissionInfo" component={PermissionInfoScreen} />
    <Stack.Screen name="SosContact" component={SosContactScreen} />
    <Stack.Screen name="EmergencyContact" component={EmergencyContactScreen} />
    <Stack.Screen name="Faq" component={FaqScreen} />
    <Stack.Screen name="Inquiry" component={InquiryScreen} />
    <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
  </Stack.Navigator>
);

export default SettingsStack;
