import { mmkvDefine } from '@/utils/mmkv';

export const doneCommentService = mmkvDefine<{ [key in string]: string }>(
  'doneComment',
  {},
);
