import React, { useCallback } from 'react';
import { ScrollView, View } from 'react-native';
import { SheetManager, SheetProps } from 'react-native-actions-sheet';
import styled from 'styled-components';

import Button from '@/components/design/Button';
import Col from '@/components/design/Col';
import ScreenHeader from '@/components/design/ScreenHeader';
import Text from '@/components/design/Text';
import useColor from '@/hooks/useColor';
import { requestAllPermissions } from '@/utils/permission';
import icPermission from '@images/permission.svg';
import Camera from '@images/permission_camera.svg';
import Permission from '@images/permission_image.svg';

import BottomSheetLayout from './base/BottomSheetLayout';

const ID = 'permission';

type PayloadType = {};

type ResultType = null;
async function show(payload: PayloadType) {
  return await SheetManager.show<PayloadType, ResultType>(ID, {
    payload,
  });
}

function PermissionSheet(props: SheetProps<PayloadType>) {
  const { Color } = useColor();

  const hideWithResult = useCallback(
    (result: ResultType = null) => {
      SheetManager.hide<ResultType>(props.sheetId, {
        payload: result,
      });
    },
    [props.sheetId],
  );

  const onConfirm = () => {
    requestAllPermissions().finally(() => hideWithResult());
  };

  return (
    <BottomSheetLayout
      id={ID}
      marginContent={0}
      gestureEnabled={false}
      animated={true}
      closeOnPressBack={false}
      closeOnTouchBackdrop={false}>
      <Container>
        <ScreenHeader
          style={{
            paddingHorizontal: 0,
          }}
          icon={icPermission}
          title="휴대폰 접근 허용"
          description="휴대폰 기능 일부를 접근할 수 있도록 허용해 주세요"
        />
        <Content>
          <ScrollView style={{ height: 300 }}>
            <PermissionCategory>
              <Text weight="md" color={Color.Primary[800]}>
                필수적 접근 권한
              </Text>
              <Text size="b4" weight="md">
                없음
              </Text>
            </PermissionCategory>
            <Divider />
            <PermissionCategory>
              <Text weight="md" color={Color.Primary[800]}>
                선택적 접근 권한
              </Text>
              <PermissionContainer>
                <Permission width={40} color={Color.Secondary[900]} />
                <PermissionDescContainer>
                  <Text size="b4" weight="md">
                    사진
                  </Text>
                  <Text color={Color.Secondary[600]}>
                    프로필 설정 및 게시글 작성 시 이미지 등록 등에 사용 합니다.
                  </Text>
                </PermissionDescContainer>
              </PermissionContainer>
              <PermissionContainer>
                <Camera width={40} color={Color.Secondary[900]} />
                <PermissionDescContainer>
                  <Text size="b4" weight="md">
                    카메라
                  </Text>
                  <Text color={Color.Secondary[600]}>
                    프로필 설정 및 게시글 작성 시 이미지 등록을 위한 사진촬영 및
                    QR 촬영에 사용합니다.
                  </Text>
                </PermissionDescContainer>
              </PermissionContainer>
              {/* <PermissionContainer>
                <Bluetooth width={40} color={Color.Secondary[900]} />
                <PermissionDescContainer>
                  <Text size="b4" weight="md">
                    블루투스
                  </Text>
                  <Text color={Color.Secondary[600]}>
                    모바일 카드 사용시 사용합니다.
                  </Text>
                </PermissionDescContainer>
              </PermissionContainer> */}
            </PermissionCategory>
          </ScrollView>
          <ConfirmButton text="확인" onPress={onConfirm} />
        </Content>
      </Container>
    </BottomSheetLayout>
  );
}

PermissionSheet.show = show;
PermissionSheet.id = ID;

export default PermissionSheet;

const Container = styled(View)``;

const PermissionCategory = styled(Col).attrs({ gap: 16 })`
  margin-bottom: 24px;
`;

const PermissionContainer = styled(View)`
  align-items: center;
  flex-direction: row;
  margin-bottom: 16px;
`;

const PermissionDescContainer = styled(View)`
  flex: 1;
  margin-left: 16px;
`;

const Divider = styled(View)`
  align-self: stretch;
  height: 1px;
  background-color: ${({ theme }) => theme.Secondary[300]};
`;
const Content = styled(View)`
  margin-horizontal: 24px;
`;

const ConfirmButton = styled(Button)``;
