import React, { useMemo, useState } from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import styled from 'styled-components';

import useColor from '@/hooks/useColor';
import icCreate from '@images/create.svg';

import Icon from './Icon';
import Row from './Row';
import Text from './Text';

interface CustomButtonProps {
  /**
   * 버튼 텍스트
   */
  text: string;
  subText?: string;
  /**
   * 버튼 타입
   * @default primary
   */
  type?: 'primary' | 'secondary' | 'create' | 'outline_orange';
  textStyle?: StyleProp<TextStyle>;
}

interface ButtonInternalProps extends CustomButtonProps {
  disabled: boolean | null | undefined;
}

export type ButtonProps = CustomButtonProps & TouchableOpacityProps;

/**
 * Design System Button Component
 */
const Button = (props: ButtonProps) => {
  const {
    text,
    subText,
    type = 'primary',
    textStyle,
    onPress,
    ...touchableOpacityProps
  } = props;
  const { Color } = useColor();

  const buttonProps = useMemo(
    () => ({
      text,
      subText,
      type,
    }),
    [subText, text, type],
  );

  const [isOnPressRunning, setOnPressRunning] = useState(false);

  const buttonExtraProps = useMemo(
    () => ({
      ...buttonProps,
      disabled: touchableOpacityProps.disabled,
    }),
    [buttonProps, touchableOpacityProps.disabled],
  );

  return (
    <ButtonContainer
      {...buttonExtraProps}
      {...touchableOpacityProps}
      onPress={async e => {
        if (isOnPressRunning) {
          return;
        }
        setOnPressRunning(true);
        await onPress?.(e);
        setOnPressRunning(false);
      }}>
      <Row alignItems="center" gap={4}>
        {type === 'create' && <Icon source={icCreate} />}
        <ButtonText
          size="b4"
          weight="bd"
          {...buttonExtraProps}
          style={textStyle}>
          {props.text}
        </ButtonText>
      </Row>
      {subText && (
        <Text size="c2" color={Color.Secondary[700]}>
          {subText}
        </Text>
      )}
    </ButtonContainer>
  );
};

const ButtonContainer = styled(TouchableOpacity)<ButtonInternalProps>`
  align-items: center;
  justify-content: center;
  height: ${({ subText }) => (subText ? 72 : 54)}px;
  border-radius: 14px;
  border-width: 1px;
  opacity: ${({ type = 'primary', disabled }) => {
    switch (type) {
      case 'create':
        return disabled ? 0.5 : 1;
      default:
        return 1;
    }
  }};
  border-style: ${({ type = 'primary' }) => {
    switch (type) {
      case 'create':
        return 'dashed';
      default:
        return 'solid';
    }
  }};
  border-color: ${({ type = 'primary', disabled, theme }) => {
    switch (type) {
      case 'primary':
        return theme.Secondary[disabled ? 300 : 900];
      case 'secondary':
        return theme.Secondary[300];
      case 'create':
        return theme.Secondary[600];
      case 'outline_orange':
        return theme.Primary[800];
    }
  }};
  background-color: ${({ type = 'primary', disabled, theme }) => {
    switch (type) {
      case 'primary':
        return theme.Secondary[disabled ? 300 : 900];
      case 'outline_orange':
        return theme.Secondary[50];
      case 'secondary':
      case 'create':
        return theme.Secondary[50];
    }
  }};
`;

const ButtonText = styled(Text)<ButtonInternalProps>`
  text-align: center;
  color: ${({ type = 'primary', disabled, theme }) => {
    switch (type) {
      case 'primary':
        return disabled ? theme.Secondary[400] : theme.Secondary[50];
      case 'outline_orange':
        return theme.Primary[800];
      case 'secondary':
      case 'create':
        return theme.Secondary[900];
    }
  }};
`;

export default Button;
