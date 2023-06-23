const Color = {
  Primary: {
    50: '#FFF4E2',
    100: '#FFE1B6',
    200: '#FFCE88',
    300: '#FFBA5A',
    400: '#FFAB3A',
    500: '#FF9C27',
    600: '#FF9125',
    700: '#FA8123',
    800: '#F37321',
    900: '#E9581E',
  },
  Secondary: {
    50: '#F9F9F9',
    100: '#F2F2F2',
    200: '#E8E8E8',
    300: '#D8D8D8',
    400: '#B4B4B4',
    500: '#949494',
    600: '#6C6C6C',
    700: '#595959',
    800: '#3A3A3A',
    900: '#1A1A1A',
  },
  GrayScale: {
    Black: '#000000',
    90: 'rgba(26, 26, 26, 0.9)',
    60: 'rgba(0, 0, 0, 0.6)',
    20: 'rgba(0, 0, 0, 0.2)',
    BG: '#EBEBEB',
    White: '#FFFFFF',
  },
  Background: {
    100: '#EBEBEB',
    200: '#FFFFFF',
  },
  System: {
    Error: '#F70000',
    Negative: '#AAB4C7',
    Positive: '#8DC63F',
  },
  Group: {
    Red: {
      100: '#FFEBEB',
      900: '#F70000',
    },
  },
  Sheet: {
    Background: '#FFFFFF',
  },
  Overlay: {
    Opaque: 'rgba(255,255,255,1)',
    Translucent: 'rgba(255,255,255,0.8)',
    Transparent: 'rgba(255,255,255,0)',
  },
};

export const DarkColor = {
  ...Color,
  Secondary: {
    50: '#1A1A1A',
    100: '#202020',
    200: '#303030',
    300: '#404040',
    400: '#4D4D4D',
    500: '#636363',
    600: '#848484',
    700: '#AEAEAE',
    800: '#DADADA',
    900: '#EFEFEF',
  },
  Background: {
    100: '#121212',
    200: 'rgb(32, 32, 32)',
  },
  Sheet: {
    Background: '#282828',
  },
  Overlay: {
    Opaque: 'rgba(32,32,32,1)',
    Translucent: 'rgba(32,32,32,0.8)',
    Transparent: 'rgba(32,32,32,0)',
  },
};

export default Color;
