import React, { useMemo } from 'react';
import { TouchableOpacity, View, ViewProps } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';

import { MyTodoNode } from '@/models/TodoNode';
import { NavigationProp } from '@/navigations/StackNavigator';

import Text from './design/Text';

export interface TodoViewProps extends ViewProps {
  myTodoNode: MyTodoNode;
  me?: boolean;
}

const TodoBadge = ({ myTodoNode, me = false }: TodoViewProps) => {
  const navigator = useNavigation<NavigationProp<any>>();

  const statusColorSet = useMemo(() => {
    switch (myTodoNode.status) {
      case 'todo':
        return {
          background: '#e2e2e2',
          text: '#000',
          borderColor: '#cccccc',
          shadowColor: '#000',
        };
      case 'doing':
        return {
          background: '#f2c94c',
          text: '#000',
          borderColor: '#0000',
          shadowColor: '#f2c94c',
        };
      case 'done':
        return {
          background: '#5e6ad2',
          text: '#fff',
          borderColor: '#0000',
          shadowColor: '#5e6ad2',
        };
      default:
        return {
          background: '#bec2c8',
          text: '#000',
          borderColor: '#0000',
          shadowColor: '#000',
        };
    }
  }, [myTodoNode.status]);

  return (
    <TouchableOpacity
      onPress={() => {
        navigator.push('Todo', { id: myTodoNode.id });
      }}>
      <Container
        style={{
          backgroundColor: statusColorSet.background,
          borderColor: statusColorSet.borderColor,
          borderWidth: 1,
          shadowColor: statusColorSet.shadowColor,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: me ? 0.7 : 0,
          shadowRadius: 8,
          elevation: me ? 4 : 0,
        }}>
        <Text size="b5" color={statusColorSet.text}>
          {myTodoNode.title}
        </Text>
      </Container>
    </TouchableOpacity>
  );
};

const Container = styled(View)`
  padding: 8px 12px;
  align-items: center;
  margin-bottom: 0;
  margin-vertical: 4px;
  border-radius: 32px;
  max-width: 100px;
`;

export default TodoBadge;
