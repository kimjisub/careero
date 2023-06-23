import React from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';

import { useTodos } from '@/apis/todo/todos';
import Text from '@/components/design/Text';
import TodoView from '@/components/TodoView';
import { NavigationProp } from '@/navigations/StackNavigator';

const TodosScreen = () => {
  const navigation = useNavigation<NavigationProp<'MainTabs'>>();

  const { data: todoList } = useTodos();

  console.log(todoList);

  return (
    <Container>
      {todoList?.map(todo => (
        <TodoView
          key={todo.id}
          myTodoNode={todo}
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

export default TodosScreen;
