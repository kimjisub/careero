import React, { memo, ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

export type GapProps = {
  gap?: number;
  flex?: number;
  flexDirection?: ViewStyle['flexDirection'];
  justifyContent?: ViewStyle['justifyContent'];
  alignItems?: ViewStyle['alignItems'];
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  separator?: ReactNode;
};

const Gap = memo((props: GapProps) => {
  const {
    gap = 0,
    flex,
    flexDirection = 'column',
    justifyContent = 'flex-start',
    alignItems = 'stretch',
    children,
    separator,
  } = props;

  const styles = StyleSheet.create({
    container: {
      flex,
      flexDirection,
      alignItems,
      justifyContent,
    },
    space: {
      [flexDirection === 'column' ? 'height' : 'width']: gap,
    },
  });

  return (
    <View style={[styles.container, props.style]}>
      {React.Children.toArray(flattenChildren(children)).map(
        (child, index, array) => (
          <React.Fragment key={index}>
            {child}
            {index === array.length - 1 ? null : separator ? (
              separator
            ) : (
              <View {...styles.space} />
            )}
          </React.Fragment>
        ),
      )}
    </View>
  );
});

type ReactChildArray = ReturnType<typeof React.Children.toArray>;

function flattenChildren(
  children: React.ReactNode,
  keys: (string | number)[] = [],
): ReactChildArray {
  const childrenArray = React.Children.toArray(children);
  return childrenArray.reduce(
    (flatChildren: ReactChildArray, child: any, index: number) => {
      if ((child as React.ReactElement<any>).type === React.Fragment) {
        return flatChildren.concat(
          flattenChildren(
            (child as React.ReactElement<any>).props.children,
            keys.concat(child.key || index),
          ),
        );
      }
      if (React.isValidElement(child)) {
        return flatChildren.concat(
          React.cloneElement(child, {
            key: keys.concat(String(child.key || index)).join('.'),
          }),
        );
      }
      return flatChildren.concat(child);
    },
    [],
  );
}

export default Gap;
