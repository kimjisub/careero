import React, { useMemo } from 'react';
import { View, ViewProps } from 'react-native';
import styled from 'styled-components';

import Text from './design/Text';

export interface TodoViewProps extends ViewProps {
  type: TodoNodeType;
}
export type TodoNodeType =
  | 'skill'
  | 'competition'
  | 'job'
  | 'certificate'
  | 'class'
  | 'grade';

const TodoBadge = ({ type }: TodoViewProps) => {
  const statusColorSet = useMemo(() => {
    switch (type) {
      case 'skill':
        return {
          background: '#f2c94c',
          text: '#000',
        };
      case 'competition':
        return {
          background: '#5e6ad2',
          text: '#fff',
        };
      case 'job':
        return {
          background: '#eb5757',
          text: '#fff',
        };
      case 'certificate':
        return {
          background: '#2f80ed',
          text: '#fff',
        };
      case 'class':
        return {
          background: '#219653',
          text: '#fff',
        };
      case 'grade':
        return {
          background: '#f2994a',
          text: '#fff',
        };
      default:
        return {
          background: '#efefef',
          text: '#000',
        };
    }
  }, [type]);

  const text = useMemo(() => {
    switch (type) {
      case 'skill':
        return '기술';
      case 'competition':
        return '공모전';
      case 'job':
        return '경력';
      case 'certificate':
        return '자격증';
      case 'class':
        return '수업';
      case 'grade':
        return '학년';
      default:
        return '기타';
    }
  }, [type]);

  return (
    <Container
      style={{
        backgroundColor: statusColorSet.background,
      }}>
      <Text size="b5" color={statusColorSet.text}>
        # {text}
      </Text>
    </Container>
  );
};

const Container = styled(View)`
  padding: 4px 12px;
  align-items: center;
  border-radius: 32px;
`;

export default TodoBadge;
