import React from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';

import { useMyTodos, useRecommendTodo } from '@/apis/todo/todos';
import Text from '@/components/design/Text';
import TodoItem from '@/components/TodoItem';
import { NavigationProp } from '@/navigations/StackNavigator';

const TodosScreen = () => {
  const navigation = useNavigation<NavigationProp<'MainTabs'>>();

  const { data: todoList } = useMyTodos();
  const { data: recommendTodoList } = useRecommendTodo();

  return (
    <Container>
      {todoList
        ?.filter(todo => todo.status !== 'done')
        ?.sort((a, b) => {
          if (a.status === 'doing' && b.status === 'todo') {
            return -1;
          }
          if (a.status === 'todo' && b.status === 'doing') {
            return 1;
          }
          return 0;
        })
        ?.map(todo => (
          <TodoItem
            key={todo.id}
            todoId={todo.id}
            onPress={() => {
              navigation.push('Todo', { id: todo.id });
            }}
          />
        ))}

      <Text
        size="b2"
        style={{
          marginTop: 16,
          marginBottom: 8,
          marginLeft: 16,
        }}>
        추천
      </Text>

      {recommendTodoList?.map(todo => (
        <TodoItem
          key={todo.id}
          todoId={todo.id}
          onPress={() => {
            navigation.push('Todo', { id: todo.id });
          }}
          mode="recommend"
        />
      ))}
      <Text />
    </Container>
  );
};

const Container = styled(ScrollView)`
  flex: 1;
  padding-top: 16px;
`;

export default TodosScreen;
