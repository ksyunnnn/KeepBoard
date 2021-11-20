import {
  FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState,
} from 'react';
import {
  usePost, useSession, useDialog, useBrickInputRef, useAuth,
} from '../hooks';
import { Brick } from '../data/brick';
import { addBrick } from '../api/bricks';
import Button from '../components/Button';

const init = '';

const BrickInput = () => {
  const [text, setText] = useState(init);
  const { session } = useSession();
  const { setDialog } = useDialog();
  const { setBrickInputRef } = useBrickInputRef();
  const { post } = usePost<{
    brick: Brick;
    uid: string;
  }>(addBrick);

  const { signIn } = useAuth();

  const textareaEl = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaEl.current?.focus();
    setBrickInputRef(textareaEl);
  }, [setBrickInputRef]);

  useEffect(() => {
    if (textareaEl.current) {
      textareaEl.current.style.height = 'inherit';
      const { scrollHeight } = textareaEl.current;
      textareaEl.current.style.height = `${scrollHeight}px`;
    }
  }, [text]);

  const disabled = useMemo(() => text === '' || (text !== ''
  && text.replace(/\s/g, '').length === 0), [text]);

  const submit = (e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    if (!session) {
      setDialog({
        shown: true,
        title: 'サインインが必要な操作です🤖',
        desc: 'テキストを保存するためにサインインしましょう〜',
        action: {
          name: 'Sign In',
          dispatch: signIn,
        },
      });
      return;
    }
    if (disabled) return;
    post({
      brick: { text, userId: session.user.uid },
      uid: session.user.uid,
    });
    setText(init);
  };

  const enter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && e.metaKey) {
      e.preventDefault(); // preventDefaultしないと改行が残ってしまう
      submit(e);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="grid gap-2"
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        className="p-4 rounded-md"
        style={{ resize: 'none' }}
        ref={textareaEl}
        onKeyDown={enter}
      />
      <div className="flex justify-end"><Button type="submit" id="Submit">Submit(⌘ + Enter)</Button></div>
    </form>
  );
};

export default BrickInput;
