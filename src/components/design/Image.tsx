import React from 'react';
import { TouchableOpacity } from 'react-native';

import FullscreenImageSheet from '@/sheets/FullscreenImageSheet';

import ImageView, { ImageViewProps } from './ImageView';

export interface ImageProps extends ImageViewProps {
  fullscreen?: boolean;
}

const Image = React.memo(({ fullscreen = true, ...props }: ImageProps) => {
  return (
    <TouchableOpacity
      disabled={!(fullscreen && props.source.uri)}
      onPress={() => {
        FullscreenImageSheet.show({
          images: [props.source.uri],
          useAuth: props.useAuth,
        });
      }}>
      <ImageView {...props} />
    </TouchableOpacity>
  );
});

export default Image;
