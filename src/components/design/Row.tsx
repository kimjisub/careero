import React from 'react';

import Gap, { GapProps } from './Gap';

export type RowProps = Omit<GapProps, 'flexDirection'>;

const Row = (props: RowProps) => (
  <Gap {...props} flexDirection="row">
    {props.children}
  </Gap>
);

export default Row;
