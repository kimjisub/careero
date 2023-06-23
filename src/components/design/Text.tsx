import { Text as RNText, TextStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import get from 'lodash.get';
import styled, { css } from 'styled-components';

import Color from '@/design/Color';

export interface TextProps {
  size?: 'b1' | 'b2' | 'b3' | 'b4' | 'b5' | 's' | 'c1' | 'c2' | number;
  weight?: 'rg' | 'md' | 'bd' | number;
  color?: string;
  fontFamily?: 'NotoSansKR' | 'Manrope';
}
export interface TextHighlightProps extends TextProps {
  searchWords?: string[];
  highlightStyle?: TextStyle;
}

const lineHeightStyle = css<TextProps>`
  line-height: ${({ size = 'b5', fontFamily = 'NotoSansKR' }) => {
    if (typeof size === 'number') {
      return size;
    }
    switch (size) {
      case 'b1':
        return fontFamily === 'NotoSansKR' ? 42 : 48;
      case 'b2':
        return 30;
      case 'b3':
        return fontFamily === 'NotoSansKR' ? 28 : 24;
      case 'b4':
        return 24;
      case 'b5':
      case 's':
        return 22;
      case 'c1':
        return 20;
      case 'c2':
        return 18;
    }
  }}px;
`;

const fontSizeStyle = css<TextProps>`
  font-size: ${({ size = 'b5', fontFamily = 'NotoSansKR' }) => {
    if (typeof size === 'number') {
      return size;
    }
    switch (size) {
      case 'b1':
        return fontFamily === 'NotoSansKR' ? 28 : 32;
      case 'b2':
        return fontFamily === 'NotoSansKR' ? 20 : 20;
      case 'b3':
        return fontFamily === 'NotoSansKR' ? 18 : 16;
      case 'b4':
        return 16;
      case 'b5':
      case 's':
        return 14;
      case 'c1':
        return 13;
      case 'c2':
        return 12;
    }
  }}px;
`;

const fontWeightStyle = css<TextProps>`
  font-weight: ${({ weight = 'rg' }) => {
    if (typeof weight === 'number') {
      return weight;
    }
    switch (weight) {
      case 'rg':
        return 400;
      case 'md':
        return 500;
      case 'bd':
        return 700;
    }
  }};
`;

const fontFamilyStyle = css<TextProps>`
  font-family: ${({ fontFamily = 'NotoSansKR' }) =>
    fontFamily === 'Manrope' ? 'Manrope' : 'Noto Sans KR'};
`;

const textStyle = css<TextProps>`
  ${lineHeightStyle}
  ${fontSizeStyle}
  ${fontWeightStyle}
  ${fontFamilyStyle}
  color: ${({ color, theme }) => getColor(theme, color)};
`;

const Text = styled(RNText)<TextProps>`
  ${textStyle}
`;

const getColor = (theme: typeof Color, value?: string) => {
  if (!value) {
    return theme.Secondary[900];
  }
  if (value.startsWith('rgb') || value.startsWith('#')) {
    return value;
  }
  return get(theme, value, theme.Secondary[900]);
};

export const AnimatedText = Animated.createAnimatedComponent(Text);

export default Text;
