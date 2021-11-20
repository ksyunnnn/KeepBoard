import { atom } from 'recoil';

type ActionType = {
  name: string;
  dispatch: () => Promise<void>;
}

type Dialog = {
  shown: boolean;

  title: string;
  desc?: string;
  action?: ActionType;
}

const InitState: Dialog = {
  shown: false,
  title: 'Default Title',
};

export const DialogState = atom<Dialog>({
  key: 'DialogState',
  default: InitState,
});
