import React, { useEffect, useMemo } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components';

import { useChangeTodoStatus, useTodo, useTodos } from '@/apis/todo/todos';
import Button from '@/components/design/Button';
import Icon from '@/components/design/Icon';
import GraphConnection from '@/components/GraphConnection';
import TodoBadge from '@/components/TodoBadge';
import useColor from '@/hooks/useColor';
import { ScreenProps } from '@/navigations/StackNavigator';
import PickerSheet from '@/sheets/PickerSheet';
import icProgressBacklog from '@images/progress_backlog.svg';
import icProgressDoing from '@images/progress_doing.svg';
import icProgressDone from '@images/progress_done.svg';
import icProgressTodo from '@images/progress_todo.svg';
const TodosScreen = ({
  navigation,
  route: {
    params: { id },
  },
}: ScreenProps<'Todo'>) => {
  const { Color } = useColor();
  const insets = useSafeAreaInsets();
  const { data: todos } = useTodos();
  const { data: todo } = useTodo(id);
  const { mutate: changeTodoStatus } = useChangeTodoStatus();
  const { width } = useWindowDimensions();

  const renderStatusIcon = useMemo(() => {
    switch (todo?.status) {
      case 'todo':
        return icProgressTodo;
      case 'doing':
        return icProgressDoing;
      case 'done':
        return icProgressDone;
      default:
        return icProgressBacklog;
    }
  }, [todo?.status]);

  const renderStatusButton = useMemo(
    () => (
      <TouchableOpacity
        onPress={async () => {
          const newStatus = await PickerSheet.show({
            title: '상태 변경',
            items: [
              { label: '할 일', value: 'todo', iconSource: icProgressTodo },
              { label: '진행 중', value: 'doing', iconSource: icProgressDoing },
              { label: '완료', value: 'done', iconSource: icProgressDone },
              {
                label: '목록에서 삭제',
                value: 'backlog',
                iconSource: icProgressBacklog,
              },
            ],
            value: todo?.status ?? 'backlog',
          });
          if (newStatus && todo) {
            if (newStatus === 'backlog') {
              changeTodoStatus({ id: todo.id, status: null });
            } else {
              changeTodoStatus({ id: todo.id, status: newStatus });
            }
          }
        }}>
        <Icon source={renderStatusIcon} />
      </TouchableOpacity>
    ),
    [changeTodoStatus, renderStatusIcon, todo],
  );

  useEffect(() => {
    navigation.setOptions({
      title: todo?.title,
      headerRight: () => renderStatusButton,
    });
  }, [
    changeTodoStatus,
    navigation,
    renderStatusButton,
    renderStatusIcon,
    todo,
    todo?.title,
  ]);

  const renderButton = useMemo(() => {
    if (!todo) {
      return null;
    }

    switch (todo?.status) {
      case 'todo':
        return (
          <Button
            text="시작하기"
            onPress={() => {
              changeTodoStatus({ id: todo.id, status: 'doing' });
            }}
          />
        );
      case 'doing':
        return (
          <Button
            text="완료하기"
            onPress={() => {
              changeTodoStatus({ id: todo.id, status: 'done' });
            }}
          />
        );
      case 'done':
        return null;
      default:
        return (
          <Button
            text="내 리스트에 담기"
            onPress={() => {
              changeTodoStatus({ id: todo.id, status: 'todo' });
            }}
          />
        );
    }
  }, [changeTodoStatus, todo]);

  if (!todo) {
    return null;
  }

  return (
    <Container
      style={{
        flex: 1,
        marginBottom: insets.bottom,
        justifyContent: 'space-between',
      }}>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            marginHorizontal: 16,
          }}>
          <RenderHtml
            contentWidth={width}
            source={{
              html: todo?.content ?? '',
            }}
            baseStyle={{
              fontSize: 16,
              color: Color.Secondary[600],
              lineHeight: 24,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View>
            {todo?.prev?.map(next => {
              const myTodoNode = todos?.find(a => a.id === next);

              return (
                myTodoNode && <TodoBadge key={next} myTodoNode={myTodoNode} />
              );
            })}
          </View>

          {(todo?.prev?.length ?? 0) > 0 && (
            <GraphConnection
              connections={todo?.prev?.map((_, index) => [index, 0]) ?? []}
              itemHeight={39.7}
              width={50}
            />
          )}

          <View>
            <TodoBadge myTodoNode={todo} me={true} />
            {todo?.related?.map(next => {
              const myTodoNode = todos?.find(a => a.id === next);

              return (
                myTodoNode && <TodoBadge key={next} myTodoNode={myTodoNode} />
              );
            })}
          </View>

          {(todo?.next?.length ?? 0) > 0 && (
            <GraphConnection
              connections={todo?.next?.map((_, index) => [0, index]) ?? []}
              itemHeight={39.7}
              width={50}
            />
          )}

          <View>
            {todo?.next?.map(next => {
              const myTodoNode = todos?.find(a => a.id === next);

              return (
                myTodoNode && <TodoBadge key={next} myTodoNode={myTodoNode} />
              );
            })}
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          marginHorizontal: 16,
        }}>
        {renderButton}
      </View>
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  padding-top: 16px;
`;

export default TodosScreen;
