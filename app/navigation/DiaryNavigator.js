import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import DiaryScreen from '../screens/DiaryScreen';
import AccountScreen from '../screens/AccountScreen';

const Stack = createStackNavigator();

const DiaryNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Diary" component={DiaryScreen} />
    <Stack.Screen
      name="Account"
      component={AccountScreen}
    />
  </Stack.Navigator>
);

export default DiaryNavigator;