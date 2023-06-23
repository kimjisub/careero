import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import styled from 'styled-components';

const Separator = (props: ViewProps) => (
  <SeparatorWrapper {...props}>
    <SeparatorInner />
  </SeparatorWrapper>
);

const SeparatorWrapper = styled(View)`
  overflow: hidden;
  height: ${StyleSheet.hairlineWidth}px;
`;

const SeparatorInner = styled(View)`
  flex: 1;
  height: 0;
  border-width: 1px;
  border-color: #999999;
  border-style: dashed;
`;

export default Separator;
