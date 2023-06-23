import React from 'react';
import { ViewProps } from 'react-native';
import { NumberProp, SvgProps } from 'react-native-svg';

import useColor from '@/hooks/useColor';

interface IconProps extends ViewProps {
  source: React.FC<SvgProps>;
  size?: number;
  width?: NumberProp;
  height?: NumberProp;
  color?: string;
}

const Icon = (props: IconProps) => {
  const {
    source: SvgIcon,
    size = 24,
    width,
    height,
    color,
    ...viewProps
  } = props;
  const { Color } = useColor();
  return (
    <SvgIcon
      width={width ?? size}
      height={height ?? size}
      color={color || Color.Secondary[900]}
      /* @ts-ignore */
      colorLight={Color.Secondary[50]}
      {...viewProps}
    />
  );
};

export default Icon;
