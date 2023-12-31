import React from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';

import { useMyTodos } from '@/apis/todo/todos';
import Text from '@/components/design/Text';
import TodoItem from '@/components/TodoItem';
import { NavigationProp } from '@/navigations/StackNavigator';

const DoneScreen = () => {
  const navigation = useNavigation<NavigationProp<'MainTabs'>>();

  const { data: todoList } = useMyTodos();

  return (
    <Container>
      {todoList
        ?.filter(todo => todo.status === 'done')
        ?.map(todo => (
          <TodoItem
            key={todo.id}
            todoId={todo.id}
            mode="done"
            onPress={() => {
              navigation.push('Todo', { id: todo.id });
            }}
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

export default DoneScreen;
