import React, { useCallback, useState } from 'react';
import { FlatList, ListRenderItem, TouchableOpacity } from 'react-native';
import { SheetManager, SheetProps } from 'react-native-actions-sheet';
import { SvgProps } from 'react-native-svg';

import Button from '@/components/design/Button';
import Gap from '@/components/design/Gap';
import Icon from '@/components/design/Icon';
import Text from '@/components/design/Text';
import useColor from '@/hooks/useColor';
import BottomSheetLayout from '@/sheets/base/BottomSheetLayout';

export const SHEET_ID_PICKER = 'Picker';

const PickerSheet = (props: SheetProps<PickerSheetShowPayload>) => {
  const { Color } = useColor();
  const confirmable = props.payload?.confirmable ?? false;
  const closeSheet = useCallback(
    (value: any) => {
      SheetManager.hide(props.sheetId, {
        payload: value,
      });
    },
    [props.sheetId],
  );

  const [selected, setSelected] = useState<any>(props.payload?.value || null);

  const renderItems = useCallback<ListRenderItem<PickerItem>>(
    ({ item: { value, label, iconSource } }) => (
      <TouchableOpacity
        style={{
          backgroundColor: selected === value ? Color.Secondary[100] : '#0000',
          padding: 10,
          marginHorizontal: 24,
          borderRadius: 10,
        }}
        onPress={() => {
          if (confirmable) {
            setSelected(value);
          } else {
            closeSheet(value);
          }
        }}
        key={String(value)}>
        <Gap gap={8} flexDirection="row">
          {iconSource && <Icon source={iconSource} size={24} />}
          <Text
            size="b3"
            weight="md"
            color={Color.Secondary[selected === value ? 900 : 400]}
            style={{ textAlign: 'center' }}>
            {label}
          </Text>
        </Gap>
      </TouchableOpacity>
    ),
    [Color.Secondary, closeSheet, confirmable, selected],
  );

  return (
    <BottomSheetLayout
      id={SHEET_ID_PICKER}
      title={props.payload?.title || '선택'}>
      <FlatList
        data={props.payload?.items}
        renderItem={renderItems}
        style={{
          maxHeight: 300,
        }}
      />
      {confirmable && (
        <Button
          style={{
            marginHorizontal: 24,
          }}
          text="확인"
          onPress={() => closeSheet(selected)}
        />
      )}
    </BottomSheetLayout>
  );
};

interface PickerItem {
  value: any;
  label: string;
  iconSource?: React.FC<SvgProps>;
}

interface PickerSheetShowPayload {
  title: string;
  items: PickerItem[];
  value?: any;
  confirmable?: boolean;
}

PickerSheet.id = SHEET_ID_PICKER;

PickerSheet.show = (payload: PickerSheetShowPayload) => {
  return SheetManager.show<PickerSheetShowPayload, any>(SHEET_ID_PICKER, {
    payload,
  });
};

export default PickerSheet;
