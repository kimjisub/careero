import { useColorScheme } from 'react-native';
import { useRecoilValue } from 'recoil';

import { themeState } from '@/atoms/theme';
import Color, { DarkColor } from '@/design/Color';

const useColor = () => {
  const { theme } = useRecoilValue(themeState);
  const systemColorScheme = useColorScheme();

  const colorScheme = theme === 'system' ? systemColorScheme : theme;

  return { Color: colorScheme === 'light' ? Color : DarkColor, colorScheme };
};

export default useColor;
