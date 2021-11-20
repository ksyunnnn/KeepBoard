import { useRecoilState } from 'recoil';
import { CurrentUserState } from '../state/currentUser';

export const useCurrentUserState = () => {
  const [brickInputRef, setBrickInputRef] = useRecoilState(CurrentUserState);

  return {
    brickInputRef,
    setBrickInputRef,
  };
};
