import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components';

import { useTodo } from '@/apis/todo/todos';
import Text from '@/components/design/Text';
import { ScreenProps } from '@/navigations/StackNavigator';

const TodosScreen = ({
  navigation,
  route: {
    params: { id },
  },
}: ScreenProps<'Todo'>) => {
  const { data: todo } = useTodo(id);

  useEffect(() => {
    navigation.setOptions({ title: todo?.title });
  }, [navigation, todo?.title]);

  return (
    <Container>
      <Text>{todo?.content}</Text>
    </Container>
  );
};

const Container = styled(ScrollView)`
  flex: 1;
  padding-top: 16px;
`;

export default TodosScreen;
