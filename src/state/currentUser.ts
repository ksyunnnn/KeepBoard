import { atom } from 'recoil';
import { User } from '../data/user';

export const CurrentUserState = atom<User | null>({
  key: 'CurrentUserState',
  default: null,
});
