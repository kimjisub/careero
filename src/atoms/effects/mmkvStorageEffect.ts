import { AtomEffect, DefaultValue } from 'recoil';

import { storage } from '@/utils/mmkv';

const mmkvStorageEffect =
  <T>({ key, defaultValue }: { key: string; defaultValue: T }): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    const savedValue = storage.getString(key);
    if (savedValue) {
      setSelf(JSON.parse(savedValue));
    } else {
      setSelf(defaultValue);
    }

    onSet(newValue => {
      if (newValue instanceof DefaultValue || newValue === null) {
        storage.delete(key);
      } else {
        storage.set(key, JSON.stringify(newValue));
      }
    });
  };

export default mmkvStorageEffect;
