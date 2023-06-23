import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

export const mmkvDefine = <T>(key: string, defaultValue: T) => {
  const get = () => {
    const savedValue = storage.getString(key);
    if (savedValue) {
      return JSON.parse(savedValue) as T;
    } else {
      return defaultValue;
    }
  };

  const set = (newValue: T | ((prevData: T) => T)) => {
    if (typeof newValue === 'function') {
      const prevData = get();
      newValue = (newValue as (prevData: T) => T)(prevData);
    }
    storage.set(key, JSON.stringify(newValue));
  };

  return { get, set };
};
