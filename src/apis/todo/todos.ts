import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEY_TODOS } from '@/constants/QueryKey';
import { MyTodoNode, TodoStatus } from '@/models/TodoNode';
import { todoStatusService } from '@/services/todoStatus';

import { TodoData } from './todoData';

export const useTodos = () => {
  return useQuery([QUERY_KEY_TODOS], async () => {
    const todoStatus = todoStatusService.get();

    const todos: MyTodoNode[] = Object.values(TodoData).map(todo => ({
      ...todo,
      status: todoStatus[todo.id] ?? null,
    }));

    return todos;
  });
};

export const useMyTodos = () => {
  return useQuery([QUERY_KEY_TODOS, 'my'], async () => {
    const todoStatus = todoStatusService.get();

    const todos: MyTodoNode[] = Object.values(TodoData).map(todo => ({
      ...todo,
      status: todoStatus[todo.id] ?? null,
    }));

    return todos.filter(todo => todo.status !== null);
  });
};

export const useRecommendTodo = () => {
  return useQuery([QUERY_KEY_TODOS, 'recommended'], async () => {
    const todoStatus = todoStatusService.get();

    const todos: MyTodoNode[] = Object.values(TodoData).map(todo => ({
      ...todo,
      status: todoStatus[todo.id] ?? null,
    }));

    const myTodos = todos.filter(todo => todo.status !== null);

    return (
      todos
        // check not in list
        .filter(todo => todo.status === null)
        // check is next of done
        .map(todo => {
          const recommendReasons = myTodos.reduce(
            (acc: { reason: string; id: string }[], myTodo) => {
              if (myTodo.prev.includes(todo.id)) {
                acc.push({ reason: 'prev', id: myTodo.id });
                console.log(myTodo.id, todo.id);
              }
              if (myTodo.related.includes(todo.id)) {
                acc.push({ reason: 'related', id: myTodo.id });
                console.log(myTodo.id, todo.id);
              }
              if (myTodo.status === 'done' && myTodo.next.includes(todo.id)) {
                acc.push({ reason: 'next', id: myTodo.id });
                console.log(myTodo.id, todo.id);
              }

              return acc;
            },
            [],
          );

          return {
            ...todo,
            recommendReasons,
          };
        })
        .filter(todo => todo.recommendReasons?.[0]) as MyTodoNode[]
    );
  });
};

export const useTodo = (id: string) => {
  return useQuery([QUERY_KEY_TODOS, id], async () => {
    const todoStatus = todoStatusService.get();

    const todo: MyTodoNode = {
      ...TodoData[id],
      status: todoStatus[id] ?? null,
    };

    return todo;
  });
};

export const useChangeTodoStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (body: { id: string; status: TodoStatus }) => {
      const { id, status } = body;

      todoStatusService.set(prev => ({
        ...prev,
        [id]: status,
      }));
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEY_TODOS]);
      },
    },
  );
};
