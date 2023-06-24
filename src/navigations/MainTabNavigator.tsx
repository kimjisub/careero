import React, { useCallback } from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ParamListBase, RouteProp } from '@react-navigation/native';

import Icon from '@/components/design/Icon';
import DoneScreen from '@/screens/DoneScreen';
import JobScreen from '@/screens/JobScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import RoadmapScreen from '@/screens/RoadmapScreen';
import TodosScreen from '@/screens/TodosScreen';
import icProfile from '@images/account_circle.svg';
import icPaper from '@images/description.svg';
import icForkRight from '@images/fork_right.svg';
import icTodo from '@images/format_list.svg';
import icWork from '@images/work.svg';

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
        source={
          {
            '할 일': icTodo,
            로드맵: icForkRight,
            '나의 이력서': icPaper,
            직업: icWork,
            프로필: icProfile,
          }[route.name] ?? icTodo
        }
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
        <Tab.Screen name="할 일" component={TodosScreen} />
        <Tab.Screen name="로드맵" component={RoadmapScreen} />
        <Tab.Screen name="나의 이력서" component={DoneScreen} />
        <Tab.Screen name="직업" component={JobScreen} />
        <Tab.Screen name="프로필" component={ProfileScreen} />
      </Tab.Navigator>
    </View>
  );
};
export default MainTabNavigator;
