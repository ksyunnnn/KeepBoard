import { useRecoilState } from 'recoil';
import { BrickInputRefState } from '../../state/ui/brickInputRef';

export const useBrickInputRef = () => {
  const [brickInputRef, setBrickInputRef] = useRecoilState(BrickInputRefState);

  return {
    brickInputRef,
    setBrickInputRef,
  };
};
