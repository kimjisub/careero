import React, { useMemo } from 'react';
import { TouchableOpacity, View, ViewProps } from 'react-native';
import styled from 'styled-components';

import { useTodos } from '@/apis/todo/todos';
import { MyTodoNode } from '@/models/TodoNode';
import icProgressBacklog from '@images/progress_backlog.svg';
import icProgressDoing from '@images/progress_doing.svg';
import icProgressDone from '@images/progress_done.svg';
import icProgressTodo from '@images/progress_todo.svg';

import Card from './design/Card';
import Gap from './design/Gap';
import Icon from './design/Icon';
import Text from './design/Text';
import TodoBadge from './TodoBadge';

export interface TodoViewProps extends ViewProps {
  myTodoNode: MyTodoNode;
  onPress: () => void;
}

const TodoItem = ({ myTodoNode, onPress }: TodoViewProps) => {
  const { data: todos } = useTodos();
  const renderReasons = useMemo(() => {
    return (
      <Gap gap={8} flexDirection="row">
        {myTodoNode.recommendReasons?.map(reason => {
          const todo = todos?.find(a => a.id === reason.id);
          if (!todo) {
            return null;
          }
          return <TodoBadge key={todo?.id} myTodoNode={todo} />;
        })}
      </Gap>
    );
  }, [myTodoNode.recommendReasons, todos]);

  const renderStatusIcon = useMemo(() => {
    switch (myTodoNode.status) {
      case 'todo':
        return icProgressTodo;
      case 'doing':
        return icProgressDoing;
      case 'done':
        return icProgressDone;
      default:
        return icProgressBacklog;
    }
  }, [myTodoNode.status]);

  return (
    <TouchableOpacity onPress={onPress}>
      <Container>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon source={renderStatusIcon} size={16} />

          <Text
            size="b3"
            style={{
              marginLeft: 8,
            }}>
            {myTodoNode.title}
          </Text>
        </View>
        <View style={{ flexDirection: 'column' }}>{renderReasons}</View>
      </Container>
    </TouchableOpacity>
  );
};

const Container = styled(Card)`
  padding: 16px;
`;

export default TodoItem;
