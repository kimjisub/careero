import React, { useState } from 'react';
import {
  NativeSyntheticEvent,
  Platform,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components';

import useColor from '@/hooks/useColor';
import icEye from '@images/eye.svg';
import icVisibilityOff from '@images/visibility_off.svg';

import Icon from './Icon';
import Row from './Row';
import Text from './Text';

export type InputError = {
  message?: string | null;
};

export type InputType =
  | 'default'
  | 'id'
  | 'password'
  | 'newPassword'
  | 'newPasswordAgain'
  | 'otp'
  | 'phone'
  | 'plateNumber'
  | 'name'
  | 'dong'
  | 'ho'
  | 'address'
  | 'title'
  | 'content'
  | 'search'
  | 'birthday'
  | 'resident';

interface InputProps extends TextInputProps {
  type?: InputType;
  label?: string;
  LeftSlot?: React.ReactElement;
  RightSlot?: React.ReactElement;
  LeftComponent?: React.ReactElement;
  RightComponent?: React.ReactElement;
  dark?: boolean;
  error?: InputError;
  nextRef?: React.RefObject<TextInput>;
}

interface InputConfigDefine extends TextInputProps {
  label?: string;
  filterText?: (text: string) => string;
}

const inputConfigs: { [key in InputType]: InputConfigDefine } = {
  default: {
    label: undefined,
    filterText: text => text,
    maxLength: 300,
    keyboardType: 'default',
    autoCapitalize: 'sentences',
    textContentType: 'none',
  },
  id: {
    label: 'ID',
    placeholder: '아이디를 입력하세요',
    autoCapitalize: 'none',
    textContentType: 'username',
  },
  password: {
    label: '비밀번호',
    placeholder: '비밀번호를 입력하세요',
    autoCapitalize: 'none',
    textContentType: 'password',
    secureTextEntry: true,
  },
  newPassword: {
    label: '비밀번호',
    placeholder: '비밀번호를 입력하세요',
    autoCapitalize: 'none',
    textContentType: 'newPassword',
    secureTextEntry: true,
  },
  newPasswordAgain: {
    label: '비밀번호 재입력',
    placeholder: '비밀번호를 입력하세요',
    autoCapitalize: 'none',
    textContentType: 'newPassword',
    secureTextEntry: true,
  },
  otp: {
    label: '인증번호',
    keyboardType: 'number-pad',
    textContentType: 'oneTimeCode',
    maxLength: 6,
  },
  phone: {
    label: '연락처',
    placeholder: "'-' 없이 숫자만 입력하세요",
    filterText: text => text.replace(/[^0-9,;+*#+]/g, ''),
    maxLength: 11,
    keyboardType: 'phone-pad',
    textContentType: 'telephoneNumber',
  },
  plateNumber: {
    label: '차량 번호',
    placeholder: '12가1234',
    filterText: text => text.replace(/[^0-9ㄱ-ㅎㅏ-ㅣ가-힣ㆍᆢa-zA-Z]/g, ''),
    maxLength: 10,
  },
  name: {
    label: '이름',
    placeholder: '이름을 입력하세요',
    filterText: text => text.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣ㆍᆢa-zA-Z ]/g, ''),
    maxLength: 10,
    textContentType: 'name',
  },
  dong: {
    label: '동',
    placeholder: '동을 입력해주세요',
    keyboardType: 'number-pad',
    filterText: text => text.replace(/[^0-9]/g, ''),
    maxLength: 5,
  },
  ho: {
    label: '호',
    placeholder: '호수를 입력해주세요',
    keyboardType: 'number-pad',
    filterText: text => text.replace(/[^0-9]/g, ''),
    maxLength: 5,
  },
  address: {
    label: '주소',
    placeholder: '아파트를 검색하세요',
  },
  title: {
    label: '제목',
    placeholder: '제목을 입력하세요',
  },
  content: {
    label: '내용',
    placeholder: '내용을 입력하세요',
    multiline: true,
    scrollEnabled: true,
  },
  search: {
    placeholder: '검색어를 입력하세요',
  },
  birthday: {
    label: '생년월일',
    placeholder: '19900101',
    filterText: text => text.replace(/[^0-9]/g, ''),
    keyboardType: 'number-pad',
    maxLength: 8,
  },
  resident: {
    label: '입주민 선택',
    placeholder: '-',
  },
};

const getInputConfig = (type: InputType) => {
  return { ...inputConfigs.default, ...inputConfigs[type] };
};

const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      type = 'default',
      label,
      error,
      style,
      LeftSlot,
      RightSlot,
      LeftComponent,
      RightComponent,
      dark = false,
      value,
      onChangeText,
      nextRef,
      ...props
    },
    ref,
  ) => {
    const { Color } = useColor();
    const [isFocused, setFocused] = useState(false);
    const [showSecureTextEntry, setShowSecureTextEntry] = useState(false);

    const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocused(true);
      props.onFocus?.(e);
    };

    const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocused(false);
      props.onBlur?.(e);
    };

    const {
      filterText,
      label: configLabel,
      secureTextEntry: configSecureTextEntry,
      ...inputConfig
    } = getInputConfig(type);
    const realLabel = label ?? configLabel;
    const secureTextEntry = props.secureTextEntry || configSecureTextEntry;

    return (
      <Container style={style}>
        {realLabel && <Text weight="md">{realLabel}</Text>}
        <Row gap={8} alignItems="flex-end">
          {LeftComponent}
          <InputBox isFocused={isFocused} dark={dark}>
            {LeftSlot}
            <NativeInput
              ref={ref}
              placeholderTextColor={Color.Secondary[400]}
              value={value}
              onChangeText={text => onChangeText?.(filterText?.(text) ?? text)}
              onFocus={onFocus}
              onBlur={onBlur}
              dark={dark}
              secureTextEntry={secureTextEntry && !showSecureTextEntry}
              returnKeyType={nextRef && 'next'}
              blurOnSubmit={nextRef && false}
              onSubmitEditing={() => nextRef?.current?.focus()}
              style={{
                includeFontPadding: false,
                lineHeight: Platform.OS === 'android' ? 28 : undefined,
              }}
              {...inputConfig}
              {...props}
            />
            {RightSlot ||
              (secureTextEntry && (
                <TouchableOpacity
                  onPress={() => setShowSecureTextEntry(prev => !prev)}>
                  <Icon
                    color={Color.Secondary[400]}
                    source={showSecureTextEntry ? icEye : icVisibilityOff}
                  />
                </TouchableOpacity>
              ))}
          </InputBox>
          {RightComponent}
        </Row>
        {error?.message && (
          <ErrorText color={Color.System.Error}>{error.message}</ErrorText>
        )}
      </Container>
    );
  },
);

const Container = styled(View)``;

const InputBox = styled(View)<{ isFocused: boolean; dark: boolean }>`
  flex-direction: row;
  align-items: center;
  border-bottom-width: ${({ isFocused, dark }) =>
    isFocused && dark ? 2 : 1}px;
  border-color: ${({ isFocused, dark, theme }) =>
    isFocused && !dark ? theme.Secondary[900] : theme.Secondary[200]};
  padding-vertical: 7px;
  flex: 1;
`;

const NativeInput = styled(TextInput)<{ dark: boolean }>`
  padding: 0;
  margin: 0;
  border-width: 0;
  flex: 1;
  font-size: 18px;
  font-weight: 500;
  font-family: ${'Noto Sans KR'};
  color: ${({ dark, theme }) =>
    dark ? theme.GrayScale.White : theme.Secondary[900]};
`;

const ErrorText = styled(Text)`
  margin-top: 6px;
`;

export default Input;
