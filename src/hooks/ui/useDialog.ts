import { useRecoilState } from 'recoil';
import { DialogState } from '../../state/ui/dialog';

export const useDialog = () => {
  const [dialog, setDialog] = useRecoilState(DialogState);
  return {
    dialog,
    setDialog,
  };
};
