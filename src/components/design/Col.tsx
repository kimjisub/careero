import React from 'react';

import Gap, { GapProps } from './Gap';

type ColProps = Omit<GapProps, 'flexDirection'>;

const Col = (props: ColProps) => <Gap {...props}>{props.children}</Gap>;

export default Col;
