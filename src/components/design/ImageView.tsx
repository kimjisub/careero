import React, { useEffect, useMemo, useState } from 'react';
import ReactNativeBlobUtil, {
  ReactNativeBlobUtilConfig,
} from 'react-native-blob-util';
import FastImage, { FastImageProps, Source } from 'react-native-fast-image';
import { useRecoilState } from 'recoil';

import { tokensState } from '@/atoms/auth';

export interface ImageViewProps extends FastImageProps {
  source: Source;
  aspectRatio?: number | 'auto' | 'none';
  useAuth?: boolean;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
  cacheKey?: any;
}

const Image = React.memo(
  ({
    source,
    aspectRatio = 'auto',
    useAuth,
    resizeMode = 'contain',
    cacheKey = 0,
    style,
    ...props
  }: ImageViewProps) => {
    const [defaultAspectRatio, setDefaultAspectRatio] = useState<
      number | undefined
    >(undefined);
    const [tokens] = useRecoilState(tokensState);
    const [uri, setUri] = useState(source.uri);
    const [loaded, setLoaded] = useState(false);
    const headers = useMemo(
      () => ({
        ...(useAuth ? { Authorization: `Bearer ${tokens?.accessToken}` } : {}),
      }),
      [tokens?.accessToken, useAuth],
    );
    const usingAspectRatio =
      aspectRatio === 'auto'
        ? defaultAspectRatio
        : aspectRatio === 'none'
        ? undefined
        : aspectRatio;

    useEffect(() => {
      setUri(source.uri);
    }, [source]);

    const handleError = () => {
      setUri(undefined);
      setDefaultAspectRatio(undefined);
    };

    const downloadImage = (imageUrl: string | undefined) => {
      if (imageUrl) {
        try {
          const ext = imageUrl.split('.').pop();
          const extension = ext ? '.' + ext : '.png';

          const { config, fs } = ReactNativeBlobUtil;
          let PictureDir = fs.dirs.PictureDir;
          let options: ReactNativeBlobUtilConfig = {
            fileCache: true,
            addAndroidDownloads: {
              useDownloadManager: true,
              notification: false,
              path:
                PictureDir +
                '/image_' +
                encodeURIComponent(imageUrl + extension),
              description: 'Image',
            },
          };
          config(options)
            .fetch('GET', imageUrl)
            .then(res => {
              setUri(res.data);
            })
            .catch(handleError);
        } catch (e) {
          handleError();
        }
      }
    };

    return (
      <FastImage
        key={`${cacheKey}-${usingAspectRatio}`}
        style={[{ width: '100%', aspectRatio: usingAspectRatio }, style]}
        source={{
          uri,
          cache: 'web',
          priority: FastImage.priority.high,
          headers,
        }}
        onLoad={e => {
          if (!loaded) {
            setLoaded(true);
            const newDefaultAspectRatio =
              e.nativeEvent.width / e.nativeEvent.height;
            if (defaultAspectRatio !== newDefaultAspectRatio) {
              setDefaultAspectRatio(e.nativeEvent.width / e.nativeEvent.height);
            }
          }
        }}
        resizeMode={resizeMode}
        onError={() => downloadImage(uri)}
        {...props}
      />
    );
  },
);

export default Image;
