import React, { useCallback } from 'react';
import { View } from 'react-native';
import { SheetManager, SheetProps } from 'react-native-actions-sheet';
import styled from 'styled-components';

import Image from '@/components/design/Image';
import RoundButton from '@/components/design/RoundButton';
import Row from '@/components/design/Row';
import useColor from '@/hooks/useColor';

import Text from '../../components/design/Text';
import ModalLayout from '../base/ModalLayout';

const ID = 'vote-item';

export interface Item {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  percent?: number;
  _count: {
    votingItems: number;
    surveying?: number;
  };
}

type PayloadType = {
  item: Item;
};

type ResultType = boolean | null;
async function show(payload: PayloadType) {
  return await SheetManager.show<PayloadType, ResultType>(ID, {
    payload,
  });
}

function VoteItemModal(props: SheetProps<PayloadType>) {
  const { item } = props.payload ?? {};
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
      <ContentContainer>
        <Row
          style={{
            paddingBottom: 12,
            borderBottomWidth: 0.5,
            borderBottomColor: Color.Secondary[300],
          }}>
          <Text>{item?.title}</Text>
        </Row>
        <Row style={{ paddingTop: 12, paddingBottom: 12 }}>
          <Text>{item?.description}</Text>
        </Row>
        {item?.imageUrl && (
          <Image
            source={{ uri: item.imageUrl }}
            style={{ marginBottom: 12 }}
            fullscreen={false}
          />
        )}
        <RoundButton
          text="확인"
          // fillColor={Color.Secondary[900]}
          onPress={() => hideWithResult(true)}
        />
      </ContentContainer>
    </ModalLayout>
  );
}

VoteItemModal.show = show;
VoteItemModal.id = ID;

const ContentContainer = styled(View)`
  background-color: ${({ theme }) => theme.Background[200]};
  border-radius: 20px;
`;

export default VoteItemModal;
