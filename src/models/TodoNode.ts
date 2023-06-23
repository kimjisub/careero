export type TodoNodeType =
  | 'skill'
  | 'competition'
  | 'job'
  | 'scholarship'
  | 'certificate'
  | 'class';

export interface TodoNode {
  id: string;
  title: string;
  type: TodoNodeType;
  content: string;
  prev: string[];
  next: string[];
  related: string[];
}

export type TodoStatus = 'todo' | 'doing' | 'done' | null;

export interface MyTodoNode extends TodoNode {
  status: TodoStatus;
}
