import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import styled from 'styled-components';

import useColor from '@/hooks/useColor';

import Col from './Col';
import Gap from './Gap';
import Icon from './Icon';
import Text from './Text';

interface ScreenLayoutProps {
  title?: string;
  description?: string;
  icon: React.FC<SvgProps>;
  direction?: 'row' | 'column';
  style?: StyleProp<ViewStyle>;
  RightComponent?: React.ReactNode;
}

const ScreenHeader = (props: ScreenLayoutProps) => {
  const {
    title,
    description,
    icon,
    direction = 'row',
    style,
    RightComponent,
  } = props;
  const { Color } = useColor();

  return (
    <View style={style}>
      <HeaderContainer gap={direction === 'row' ? 12 : 6}>
        <TitleContainer
          flexDirection={direction}
          alignItems={direction === 'row' ? 'center' : 'flex-start'}
          gap={direction === 'row' ? 12 : 18}>
          <Icon source={icon} size={32} />
          <Text size="b1" weight="bd">
            {title}
          </Text>
          {RightComponent && (
            <View
              style={{
                position: 'absolute',
                right: 0,
              }}>
              {RightComponent}
            </View>
          )}
        </TitleContainer>
        {description && (
          <Description size="b4" color={Color.Secondary[600]}>
            {description}
          </Description>
        )}
      </HeaderContainer>
    </View>
  );
};

const HeaderContainer = styled(Col)`
  margin-top: 16px;
  margin-bottom: 24px;
`;

const TitleContainer = styled(Gap)`
  margin-horizontal: 24px;
`;

const Description = styled(Text)`
  margin-horizontal: 24px;
`;

export default ScreenHeader;
