import React, { useCallback } from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ParamListBase, RouteProp } from '@react-navigation/native';

import Icon from '@/components/design/Icon';
import ProfileScreen from '@/screens/ProfileScreen';
import TodosScreen from '@/screens/TodosScreen';
import icProfile from '@images/add.svg';
import icTodo from '@images/add.svg';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const tabBarIcon = useCallback<
    (props: {
      focused: boolean;
      color: string;
      size: number;
      route: RouteProp<ParamListBase, string>;
    }) => React.ReactNode
  >(({ focused, color, size, route }) => {
    return (
      <Icon
        source={{ Todo: icProfile, Profile: icProfile }[route.name] ?? icTodo}
      />
    );
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) =>
            tabBarIcon({ focused, color, size, route }),
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Todo" component={TodosScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </View>
  );
};
export default MainTabNavigator;
