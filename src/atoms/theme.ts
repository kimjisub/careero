import { atom } from 'recoil';

import { RECOIL_KEY_THEME } from '@/constants/RecoilKey';

import mmkvStorageEffect from './effects/mmkvStorageEffect';

interface Theme {
  theme: 'dark' | 'light' | 'system';
}

export const themeState = atom<Theme>({
  key: RECOIL_KEY_THEME,
  effects: [
    mmkvStorageEffect<Theme>({
      key: RECOIL_KEY_THEME,
      defaultValue: { theme: 'system' },
    }),
  ],
});
