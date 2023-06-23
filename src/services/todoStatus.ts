import { TodoStatus } from '@/models/TodoNode';
import { mmkvDefine } from '@/utils/mmkv';

export const todoStatusService = mmkvDefine<{ [key in string]: TodoStatus }>(
  'todoStatus',
  {},
);
