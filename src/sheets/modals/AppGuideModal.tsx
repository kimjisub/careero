import React, { useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import styled from 'styled-components';

import Card from '@/components/design/Card';
import Icon from '@/components/design/Icon';
import Row from '@/components/design/Row';
import { Toggle } from '@/components/design/Toggle';
import useColor from '@/hooks/useColor';
import icClose from '@images/close.svg';
import icCursor from '@images/cursor.svg';
import icScrollDown from '@images/scroll_down.svg';

import Text from '../../components/design/Text';

const SettingExampleCard = styled(Card)`
  margin: 32px;
`;

const Title = styled(Text)`
  text-align: center;
  padding: 4px;
`;

const ID = 'AppGuide';

type PayloadType = {};

type ResultType = null;
async function show(payload: PayloadType) {
  return await SheetManager.show<PayloadType, ResultType>(ID, {
    payload,
  });
}

function AppGuideModal(props: SheetProps<PayloadType>) {
  const { Color } = useColor();

  const hideWithResult = useCallback(() => {
    SheetManager.hide<ResultType>(props.sheetId, {
      payload: null,
    });
  }, [props.sheetId]);

  return (
    <ActionSheet
      id={props.sheetId}
      statusBarTranslucent
      gestureEnabled={false}
      defaultOverlayOpacity={0.8}
      overlayColor="#000"
      containerStyle={{
        backgroundColor: 'transparent',
        height: '100%',
        justifyContent: 'center',
      }}
      safeAreaInsets={{ top: 0, bottom: 0, left: 0, right: 0 }}>
      <TouchableOpacity
        style={{ alignSelf: 'flex-end' }}
        onPress={() => {
          hideWithResult();
        }}>
        <Icon
          source={icClose}
          style={{ margin: 16 }}
          color={Color.GrayScale.White}
        />
      </TouchableOpacity>
      <View>
        <Title size="b3" color={Color.GrayScale.White}>
          나의 선호주차 구역, 방문 차량관리와
        </Title>
        <Title size="b3" color={Color.GrayScale.White}>
          우리집 관리비 내역 등
        </Title>
        <Title size="b3" color={Color.Primary[700]}>
          내가 원하는 기능의 위젯만 맞춤 설정
        </Title>
        <Title size="b3" color={Color.GrayScale.White}>
          할 수 있어요
        </Title>
        <SettingExampleCard>
          {[
            '관리비',
            '공지사항',
            '차량 정보',
            '방문 차량',
            '선호주차 구역',
            '공용 CCTV',
          ].map((item, index) => (
            <Row key={index} style={{ padding: 8 }}>
              <Text size="b3" style={{ flex: 1 }}>
                {item}
              </Text>
              <View>
                <Toggle enabled={true} />
                {index === 5 && (
                  <Icon
                    source={icCursor}
                    size={60}
                    style={{ position: 'absolute', top: 5, left: 20 }}
                  />
                )}
              </View>
            </Row>
          ))}
        </SettingExampleCard>
        <Title size="b3" color={Color.GrayScale.White}>
          위젯 설정은 여기 아래에 있어요
        </Title>

        <View style={{ alignItems: 'center', marginTop: 16 }}>
          <Icon size={48} source={icScrollDown} />
        </View>
      </View>
    </ActionSheet>
  );
}

AppGuideModal.show = show;
AppGuideModal.id = ID;

export default AppGuideModal;
