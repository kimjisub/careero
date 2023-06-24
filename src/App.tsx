import React from 'react';
import { LogBox } from 'react-native';
import { SheetProvider } from 'react-native-actions-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import './sheets';

import Color, { DarkColor } from './design/Color';
import useColor from './hooks/useColor';
import NavigationContainer from './navigations/NavigationContainer';

LogBox.ignoreAllLogs();

const queryClient = new QueryClient();

const App = () => {
  const { colorScheme } = useColor();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={colorScheme === 'light' ? Color : DarkColor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <SheetProvider>
              <NavigationContainer />
            </SheetProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
const _App = () => (
  <RecoilRoot>
    <App />
  </RecoilRoot>
);

export default _App;
