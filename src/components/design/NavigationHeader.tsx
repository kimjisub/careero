import React from 'react';
import { TouchableOpacity, View, ViewProps } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import styled from 'styled-components';

import icBack from '@images/chevron_left.svg';
import icClose from '@images/close.svg';

import Icon from './Icon';
import Text from './Text';

export interface AppBarProps extends ViewProps {
  title?: string;
  left?: React.ReactElement | null;
  right?: React.ReactElement | null;
}

const NavigationHeader = (props: NativeStackHeaderProps) => {
  const { navigation, options } = props;
  const insets = useSafeAreaInsets();

  const isModal = options.presentation?.toLowerCase().includes('modal');

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaContainer insets={insets} style={[options.headerStyle]}>
      <Container>
        <LeftContainer>
          {options.headerLeft?.({ canGoBack: false }) ||
            (!isModal ? (
              <TouchableOpacity onPress={goBack}>
                <Icon source={icBack} />
              </TouchableOpacity>
            ) : null)}
        </LeftContainer>
        <CenterContainer>
          <Text size="b3" weight="bd">
            {options.title}
          </Text>
        </CenterContainer>
        <RightContainer>
          {options.headerRight?.({ canGoBack: false }) ||
            (isModal ? (
              <TouchableOpacity onPress={goBack}>
                <Icon source={icClose} />
              </TouchableOpacity>
            ) : null)}
        </RightContainer>
      </Container>
    </SafeAreaContainer>
  );
};

const SafeAreaContainer = styled(View)<{ insets: EdgeInsets }>`
  background-color: ${({ theme }) => theme.Background[100]};
  padding-top: ${({ insets }) => insets.top}px;
  padding-left: ${({ insets }) => insets.left}px;
  padding-right: ${({ insets }) => insets.right}px;
`;

const Container = styled(View)`
  align-items: center;
  flex-direction: row;
  height: 54px;
  margin-horizontal: 24px;
`;

const LeftContainer = styled(View)`
  margin-vertical: 15px;
`;

const RightContainer = styled(View)`
  margin-vertical: 15px;
`;

const CenterContainer = styled(View)`
  flex: 1;
`;

export default NavigationHeader;
