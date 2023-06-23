import React from 'react';
import { Pressable, View } from 'react-native';
import ActionSheet, {
  ActionSheetProps,
  SheetManager,
} from 'react-native-actions-sheet';
import styled from 'styled-components';

interface ModalLayoutProps extends ActionSheetProps {
  id: string;
  children: React.ReactNode;
}

const ModalLayout = ({ id, children, ...props }: ModalLayoutProps) => {
  return (
    <ActionSheet
      id={id}
      statusBarTranslucent
      gestureEnabled={false}
      animated={false}
      containerStyle={{
        backgroundColor: 'transparent',
        flex: 1,
        height: '100%',
        bottom: 0,
      }}
      defaultOverlayOpacity={0.3}
      safeAreaInsets={{ top: 0, bottom: 0, left: 0, right: 0 }}
      {...props}>
      <ModalRoot
        onPress={() => {
          SheetManager.hide(id, {
            payload: null,
          });
        }}>
        <Modal>{children}</Modal>
      </ModalRoot>
    </ActionSheet>
  );
};

export const Container = styled(View)`
  max-height: 560px;
`;

export const ContentContainer = styled(View)`
  margin-top: 24px;
`;

const ModalRoot = styled(Pressable)`
  height: 100%;
  justify-content: center;
`;

const Modal = styled(Pressable)`
  background-color: ${({ theme }) => theme.Sheet.Background};
  margin: 32px;
  padding: 24px;
  border-radius: 20px;
  color: ${({ theme }) => theme.Secondary[100]};
`;

export default ModalLayout;
