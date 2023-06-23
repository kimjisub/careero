import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import ActionSheet, {
  ActionSheetProps,
  SheetManager,
} from 'react-native-actions-sheet';
import styled from 'styled-components';

import useColor from '@/hooks/useColor';
import icClose from '@images/close.svg';

import Icon from '../../components/design/Icon';
import Row from '../../components/design/Row';
import Text from '../../components/design/Text';

interface BottomSheetLayoutProps extends ActionSheetProps {
  id: string;
  title?: string;
  children: React.ReactNode;
  marginContent?: number;
}

const BottomSheetLayout = ({
  id,
  title,
  children,
  marginContent = 24,
  ...props
}: BottomSheetLayoutProps) => {
  const { Color } = useColor();
  return (
    <ActionSheet
      id={id}
      containerStyle={{
        backgroundColor: Color.Sheet.Background,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
      drawUnderStatusBar={false}
      safeAreaInsets={{ bottom: 0, left: 0, right: 0, top: 0 }}
      ExtraOverlayComponent={<View />}
      {...props}>
      <Container>
        {title && (
          <Row
            alignItems="center"
            justifyContent="space-between"
            style={{
              paddingHorizontal: 24,
              paddingTop: 24,
            }}>
            <Text size="b2" weight="bd">
              {title}
            </Text>
            <TouchableOpacity onPress={() => SheetManager.hide(id)}>
              <Icon source={icClose} size={24} color={Color.Secondary[500]} />
            </TouchableOpacity>
          </Row>
        )}

        <ContentContainer
          style={{
            margin: marginContent,
            marginBottom: 32,
          }}>
          {children}
        </ContentContainer>
      </Container>
    </ActionSheet>
  );
};

export const Container = styled(View)`
  max-height: 600px;
`;

export const ContentContainer = styled(View)`
  margin-top: 24px;
`;

export default BottomSheetLayout;
