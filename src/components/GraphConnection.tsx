import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import styled from 'styled-components';

export interface GraphConnectionProps {
  connections: [number, number][];
  itemHeight: number;
  width: number;
}

const GraphConnection = ({
  connections,
  itemHeight,
  width,
}: GraphConnectionProps) => {
  const maxIndex = Math.max(...connections.flat(), 0);

  return (
    <Container
      style={{
        height: (maxIndex + 1) * itemHeight,
        width: width,
      }}>
      {connections.length > 0 && (
        <Lines height={(maxIndex + 1) * itemHeight} width={width}>
          {connections.map(([start, end], index) => {
            const startY = itemHeight * (start + 0.5);
            const endY = itemHeight * (end + 0.5);
            const d = `M0 ${startY} C${width / 2} ${startY} ${
              width / 2
            } ${endY} ${width} ${endY}`;
            return (
              <Path
                key={index}
                d={d}
                stroke="#888"
                strokeWidth="2"
                fill="none"
              />
            );
          })}
        </Lines>
      )}
    </Container>
  );
};

const Container = styled(View)``;

const Lines = styled(Svg)`
  position: absolute;
`;

export default GraphConnection;
