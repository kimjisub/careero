import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import Gap from '@/components/design/Gap';
import Icon from '@/components/design/Icon';
import Text from '@/components/design/Text';
import GraphConnection from '@/components/GraphConnection';
import TodoBadge from '@/components/TodoBadge';
import TypeBadge from '@/components/TypeBadge';
import useColor from '@/hooks/useColor';
import { ScreenProps } from '@/navigations/StackNavigator';
import { doneCommentService } from '@/services/doneComment';
import InputSheet from '@/sheets/InputSheet';
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

  const [doneComment, setDoneComment] = useState<string | null>(null);

  useEffect(() => {
    if (todo?.status === 'done') {
      setDoneComment(doneCommentService.get()?.[todo.id] ?? null);
    }
  }, [todo?.id, todo?.status]);

  useEffect(() => {
    if (doneComment) {
      doneCommentService.set(prev => ({
        ...prev,
        [todo?.id ?? '']: doneComment,
      }));
    }
  }, [doneComment, todo?.id]);

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

  const getDoneComment = useCallback(async () => {
    if (!todo) {
      return null;
    }

    const ret = await InputSheet.show({
      title: '완료 메모',
      placeholder: '완료 메모를 입력해주세요.',
      value: doneCommentService.get()?.[todo.id] ?? '',
    });

    if (ret) {
      setDoneComment(ret);
    }
  }, [todo]);

  const headerRight = useMemo(
    () => (
      <Gap gap={16} flexDirection="row">
        {todo && <TypeBadge type={todo?.type} />}
        <TouchableOpacity
          onPress={async () => {
            const newStatus = await PickerSheet.show({
              title: '상태 변경',
              items: [
                { label: '할 일', value: 'todo', iconSource: icProgressTodo },
                {
                  label: '진행 중',
                  value: 'doing',
                  iconSource: icProgressDoing,
                },
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
            if (newStatus === 'done') {
              getDoneComment();
            }
          }}>
          <Icon source={renderStatusIcon} />
        </TouchableOpacity>
      </Gap>
    ),
    [changeTodoStatus, getDoneComment, renderStatusIcon, todo],
  );

  useEffect(() => {
    navigation.setOptions({
      title: todo?.title,
      headerRight: () => headerRight,
    });
  }, [
    changeTodoStatus,
    navigation,
    headerRight,
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
              getDoneComment();
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
  }, [changeTodoStatus, getDoneComment, todo]);

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
        {todo.status === 'done' && (
          <DoneComment
            style={{
              backgroundColor: '#d2d2d2',
            }}
            onPress={getDoneComment}>
            <Text size="b4">
              {doneComment || '눌러서 이력서를 위한 커멘트를 달아주세요!'}
            </Text>
          </DoneComment>
        )}

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
              fontSize: 18,
              color: Color.Secondary[900],
              lineHeight: 24,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 16,
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
              itemHeight={46}
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
              itemHeight={46}
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

const DoneComment = styled(TouchableOpacity)`
  margin: 16px;
  padding: 16px;
  border-radius: 8px;
`;
export default TodosScreen;
