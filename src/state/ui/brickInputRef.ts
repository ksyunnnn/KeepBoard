import { RefObject } from 'react';
import { atom } from 'recoil';

export const BrickInputRefState = atom<RefObject<HTMLTextAreaElement> | null>({
  key: 'BrickInputRefState',
  default: null,
  dangerouslyAllowMutability: true,
});
