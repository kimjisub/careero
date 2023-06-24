import React from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';

import { useTodos } from '@/apis/todo/todos';
import Text from '@/components/design/Text';
import TodoItem from '@/components/TodoItem';
import { NavigationProp } from '@/navigations/StackNavigator';

const RoadmapScreen = () => {
  const navigation = useNavigation<NavigationProp<'MainTabs'>>();

  const { data: todoList } = useTodos();
  return (
    <Container>
      {todoList
        ?.filter(todo => todo.type === 'grade')
        ?.map(todo => (
          <View style={{ marginBottom: 16 }}>
            <TodoItem
              key={todo.id}
              todoId={todo.id}
              onPress={() => {
                navigation.push('Todo', { id: todo.id });
              }}
              mode="roadmap"
            />

            {todo.related.map(relatedTodo => (
              <TodoItem
                key={relatedTodo}
                todoId={relatedTodo}
                onPress={() => {
                  navigation.push('Todo', { id: relatedTodo });
                }}
              />
            ))}
          </View>
        ))}
      <Text />
    </Container>
  );
};

const Container = styled(ScrollView)`
  flex: 1;
  padding-top: 16px;
`;

export default RoadmapScreen;
