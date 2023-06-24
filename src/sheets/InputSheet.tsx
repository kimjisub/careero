import React, { useCallback, useState } from 'react';
import { SheetManager, SheetProps } from 'react-native-actions-sheet';

import Button from '@/components/design/Button';
import Col from '@/components/design/Col';
import Input from '@/components/design/Input';
import BottomSheetLayout from '@/sheets/base/BottomSheetLayout';

export const SHEET_ID_INPUT = 'input';

const InputSheet = (props: SheetProps<CheckIdSheetShowPayload>) => {
  const [text, setText] = useState(props.payload?.value || '');
  const closeSheet = useCallback(
    (value: CheckIdSheetReturnPayload) => {
      SheetManager.hide(props.sheetId, {
        payload: value,
      });
    },
    [props.sheetId],
  );
  return (
    <BottomSheetLayout id={SHEET_ID_INPUT} title={props.payload?.title}>
      <Col gap={24}>
        <Input
          type="default"
          label={props.payload?.label}
          value={text}
          onChangeText={setText}
          placeholder={props.payload?.placeholder}
          autoFocus
        />
        <Button
          text="확인"
          onPress={() => {
            closeSheet(text);
          }}
        />
      </Col>
    </BottomSheetLayout>
  );
};

interface CheckIdSheetShowPayload {
  title: string;
  value?: string;
  placeholder?: string;
  label?: string;
}

type CheckIdSheetReturnPayload = string;

InputSheet.id = SHEET_ID_INPUT;

InputSheet.show = ({
  title,
  value,
  placeholder = '입력하세요.',
  label = '입력',
}: CheckIdSheetShowPayload) => {
  return SheetManager.show<CheckIdSheetShowPayload, CheckIdSheetReturnPayload>(
    SHEET_ID_INPUT,
    {
      payload: { title, value, placeholder, label },
    },
  );
};

export default InputSheet;
