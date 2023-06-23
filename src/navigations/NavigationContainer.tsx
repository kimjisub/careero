import React from 'react';
import {
  createNavigationContainerRef,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';

import useColor from '@/hooks/useColor';

import StackNavigator, { ScreenParams } from './StackNavigator';

export const navigationRef = createNavigationContainerRef<ScreenParams>();

const Navigation = () => {
  const { Color } = useColor();

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: Color.Background[100],
        },
      }}>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
