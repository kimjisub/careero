import React, { useCallback } from 'react';
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

const ID = 'alert';

type PayloadType = {
  title: string;
  submitText?: string;
};

type ResultType = boolean | null;
async function show(payload: PayloadType) {
  return await SheetManager.show<PayloadType, ResultType>(ID, {
    payload,
  });
}

function AlertModal(props: SheetProps<PayloadType>) {
  const { title, submitText } = props.payload ?? {};
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

        <Button
          text={submitText ?? '확인'}
          type="primary"
          onPress={() => hideWithResult(true)}
          style={{
            marginHorizontal: 16,
            borderRadius: 40,
            height: 40,
          }}
          textStyle={{
            fontSize: 14,
          }}
        />
      </Col>
    </ModalLayout>
  );
}

AlertModal.show = show;
AlertModal.id = ID;

export default AlertModal;
