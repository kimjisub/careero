import React from 'react';
import { TouchableOpacity, ViewProps } from 'react-native';
import styled from 'styled-components';

import { useChangeTodoStatus } from '@/apis/todo/todos';
import { MyTodoNode } from '@/models/TodoNode';

import Button from './design/Button';
import Card from './design/Card';
import Text from './design/Text';

export interface TodoViewProps extends ViewProps {
  myTodoNode: MyTodoNode;
  onPress: () => void;
}

const TodoView = ({ myTodoNode, onPress }: TodoViewProps) => {
  const { mutate: changeTodoStatus } = useChangeTodoStatus();
  const notInTodo = !myTodoNode.status;

  return (
    <TouchableOpacity onPress={onPress}>
      <Container>
        <Text size="b3">{myTodoNode.title}</Text>
        <Text size="b3">{myTodoNode.content}</Text>
        <Text size="b3">{myTodoNode.status}</Text>
        {notInTodo && (
          <Button
            text="추가하기"
            onPress={() => {
              changeTodoStatus({ id: myTodoNode.id, status: 'todo' });
            }}
          />
        )}
      </Container>
    </TouchableOpacity>
  );
};

const Container = styled(Card)`
  padding: 16px;
`;

export default TodoView;
