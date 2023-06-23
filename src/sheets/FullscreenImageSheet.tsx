import React, { useCallback, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import Carousel from 'react-native-reanimated-carousel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ReactNativeZoomableView from '@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView';
import styled from 'styled-components';

import ImageView from '@/components/design/ImageView';
import Text from '@/components/design/Text';
import useColor from '@/hooks/useColor';
import CloseIcon from '@images/close.svg';

const CloseIconView = styled(CloseIcon)`
  margin: 16px;
  align-self: flex-end;
`;

const MyImageView = styled(ImageView)`
  flex: 1;
  width: 100%;
  height: 100px;
`;

const ID = 'fullscreen-image';

type PayloadType = {
  images: (string | (() => JSX.Element) | null | undefined)[];
  useAuth?: boolean;
};

type ResultType = null;
async function show(payload: PayloadType) {
  return await SheetManager.show<PayloadType, ResultType>(ID, {
    payload,
  });
}

function FullscreenImageSheet(props: SheetProps<PayloadType>) {
  const insets = useSafeAreaInsets();
  const { Color } = useColor();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { images = [], useAuth = false } = props.payload ?? {};

  const hideWithResult = useCallback(
    (result: ResultType = null) => {
      SheetManager.hide<ResultType>(props.sheetId, {
        payload: result,
      });
    },
    [props.sheetId],
  );

  return (
    <ActionSheet
      id={props.sheetId}
      ref={actionSheetRef}
      gestureEnabled={false}
      animated={false}
      indicatorStyle={{ opacity: 0 }}
      containerStyle={{
        height: '100%',
        top: insets.top,
        backgroundColor: 'transparent',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      }}
      isModal
      useBottomSafeAreaPadding={false}>
      <View
        style={{
          height: '100%',
        }}
        onLayout={e => {
          setWidth(e.nativeEvent.layout.width);
          setHeight(e.nativeEvent.layout.height);
        }}>
        {width > 0 && height > 0 && (
          <Carousel
            style={{ backgroundColor: Color.GrayScale.Black }}
            width={width}
            height={height}
            data={images}
            loop={false}
            enabled={images.length > 1}
            onProgressChange={(_, abs) => {
              const newIndex = Math.round(abs);
              if (newIndex !== currentIndex) {
                setCurrentIndex(newIndex);
              }
            }}
            renderItem={({ item }) => (
              <ReactNativeZoomableView
                maxZoom={4}
                minZoom={0.5}
                zoomStep={0.5}
                initialZoom={1}
                bindToBorders={true}>
                {typeof item === 'string' ? (
                  <MyImageView
                    style={{
                      width: width,
                      height: height,
                    }}
                    source={{ uri: item }}
                    resizeMode={'contain'}
                    useAuth={useAuth}
                    aspectRatio="none"
                  />
                ) : (
                  item?.()
                )}
              </ReactNativeZoomableView>
            )}
          />
        )}

        <View
          style={{
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text color={Color.Secondary[100]} style={{ flex: 1, padding: 16 }}>
            {currentIndex + 1} / {images.length}
          </Text>
          <TouchableOpacity onPress={() => hideWithResult()}>
            <CloseIconView color={Color.Secondary[100]} />
          </TouchableOpacity>
        </View>
      </View>
    </ActionSheet>
  );
}

FullscreenImageSheet.show = show;
FullscreenImageSheet.id = ID;

export default FullscreenImageSheet;
