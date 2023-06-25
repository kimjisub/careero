import React, { useMemo } from 'react';
import { TouchableOpacity, View, ViewProps } from 'react-native';
import styled from 'styled-components';

import { useRecommendTodo, useTodos } from '@/apis/todo/todos';
import icProgressBacklog from '@images/progress_backlog.svg';
import icProgressDoing from '@images/progress_doing.svg';
import icProgressDone from '@images/progress_done.svg';
import icProgressTodo from '@images/progress_todo.svg';

import Card from './design/Card';
import Gap from './design/Gap';
import Icon from './design/Icon';
import Text from './design/Text';
import TodoBadge from './TodoBadge';
import TypeBadge from './TypeBadge';

export interface TodoViewProps extends ViewProps {
  todoId?: string;
  mode?: 'default' | 'done' | 'recommend' | 'roadmap' | 'job';
  onPress: () => void;
}

const TodoItem = ({ todoId, mode = 'default', onPress }: TodoViewProps) => {
  const { data: todos } = useTodos();
  const { data: recommendedTodos } = useRecommendTodo();

  const myTodoNode = todos?.find(a => a.id === todoId);
  const recommendReasons = recommendedTodos?.find(
    a => a.id === todoId,
  )?.recommendReasons;
  const renderReasons = useMemo(() => {
    return (
      <Gap gap={8} flexDirection="row">
        {recommendReasons?.map(reason => {
          const todo = todos?.find(a => a.id === reason.id);
          if (!todo) {
            return null;
          }
          return <TodoBadge key={todo?.id} myTodoNode={todo} />;
        })}
      </Gap>
    );
  }, [recommendReasons, todos]);

  const renderStatusIcon = useMemo(() => {
    switch (myTodoNode?.status) {
      case 'todo':
        return icProgressTodo;
      case 'doing':
        return icProgressDoing;
      case 'done':
        return icProgressDone;
      default:
        return icProgressBacklog;
    }
  }, [myTodoNode?.status]);

  if (!myTodoNode) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <Container
        style={{
          backgroundColor: mode === 'roadmap' ? '#0000' : '#fff',
        }}>
        <Gap
          gap={8}
          flexDirection="row"
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Gap
            gap={8}
            flexDirection="row"
            style={{
              alignItems: 'center',
              flex: 1,
            }}>
            {mode === 'default' && <Icon source={renderStatusIcon} size={16} />}

            <Text size="b3" ellipsizeMode="tail" numberOfLines={1}>
              {myTodoNode.title}
            </Text>
          </Gap>
          {mode !== 'roadmap' && mode !== 'job' && (
            <TypeBadge type={myTodoNode.type} />
          )}
        </Gap>
        {mode === 'recommend' && (
          <View style={{ flexDirection: 'column' }}>{renderReasons}</View>
        )}
        {mode === 'done' && (
          <Text size="b5" style={{ marginTop: 4 }}>
            {myTodoNode.comment}
          </Text>
        )}
      </Container>
    </TouchableOpacity>
  );
};

const Container = styled(Card)`
  padding: 16px;
`;

export default TodoItem;
