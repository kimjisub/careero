import React, { useCallback } from 'react';
import { View } from 'react-native';
import { SheetManager, SheetProps } from 'react-native-actions-sheet';
import styled from 'styled-components';

import Col from '@/components/design/Col';
import useColor from '@/hooks/useColor';

import Button from '../../components/design/Button';
import Text from '../../components/design/Text';
import ModalLayout from '../base/ModalLayout';

const Title = styled(Text)`
  text-align: center;
`;

const ID = 'confirm';

type PayloadType = {
  title: string;
  submitText?: string;
  cancelText?: string;
};

type ResultType = boolean | null;
async function show(payload: PayloadType) {
  return await SheetManager.show<PayloadType, ResultType>(ID, {
    payload,
  });
}

function ConfirmModal(props: SheetProps<PayloadType>) {
  const { title, submitText, cancelText } = props.payload ?? {};
  const { Color } = useColor();

  const hideWithResult = useCallback(
    (result: ResultType) => {
      SheetManager.hide<ResultType>(props.sheetId, {
        payload: result,
      });
    },
    [props.sheetId],
  );

  return (
    <ModalLayout id={props.sheetId}>
      <Col gap={24}>
        <Title color={Color.Secondary[900]} size="b3" weight="md">
          {title}
        </Title>

        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginHorizontal: 16,
          }}>
          <Button
            text={cancelText ?? '취소'}
            type="secondary"
            onPress={() => hideWithResult(false)}
            style={{
              flex: 1,
              borderRadius: 40,
              height: 40,
              marginRight: 16,
            }}
            textStyle={{
              fontSize: 14,
            }}
          />

          <Button
            text={submitText ?? '확인'}
            onPress={() => hideWithResult(true)}
            style={{
              flex: 1,
              borderRadius: 40,
              height: 40,
            }}
            textStyle={{
              fontSize: 14,
            }}
          />
        </View>
      </Col>
    </ModalLayout>
  );
}

ConfirmModal.show = show;
ConfirmModal.id = ID;

export default ConfirmModal;
