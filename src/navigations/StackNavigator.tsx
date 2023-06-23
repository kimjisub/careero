import React from 'react';
import { RouteProp as NavigationRouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import NavigationHeader from '@/components/design/NavigationHeader';
import TodoScreen from '@/screens/TodoScreen';

import MainTabNavigator from './MainTabNavigator';

const Stack = createNativeStackNavigator<ScreenParams>();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ header: NavigationHeader }}>
      <Stack.Group>
        <Stack.Screen
          name="MainTabs"
          component={MainTabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Todo" component={TodoScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export type ScreenParams = {
  MainTabs: undefined;
  Todo: { id: string };
};

export type NavigationProp<T extends keyof ScreenParams> =
  NativeStackNavigationProp<ScreenParams, T>;

export type RouteProp<T extends keyof ScreenParams> = NavigationRouteProp<
  ScreenParams,
  T
>;

export type ScreenProps<T extends keyof ScreenParams> = NativeStackScreenProps<
  ScreenParams,
  T
>;

export default StackNavigator;
