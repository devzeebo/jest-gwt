import { isNil } from 'lodash/fp';

let internal: any | null = null;

export const set = (value: any) => {
  if (isNil(internal)) {
    internal = value;
  }

  return internal;
};

export const get = () => internal;
