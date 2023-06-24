export type TodoNodeType =
  | 'skill'
  | 'competition'
  | 'job'
  | 'certificate'
  | 'class'
  | 'grade';

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
export type TodoRecommendReason = 'next' | 'prev' | 'related';
export interface TodoRecommend {
  reason: TodoRecommendReason;
  id: string;
}

export interface MyTodoNode extends TodoNode {
  status: TodoStatus;
  recommendReasons?: TodoRecommend[];
  comment?: string;
}
