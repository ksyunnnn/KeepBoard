import {
  FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState,
} from 'react';
import { Popover, Transition } from '@headlessui/react';
import {
  usePost, useSession, useDialog, useAuth,
} from '../hooks';
import { Keep } from '../data/keep';
import { addKeep } from '../api/keep';
import Button from '../components/Button';

const init = '';

const KeepInput = () => {
  const { session } = useSession();
  const { setDialog } = useDialog();

  const { post } = usePost<{
    keep: Keep;
    uid: string;
  }>(addKeep);

  const { signIn } = useAuth();

  const [label, setLabel] = useState(init);

  const textareaEl = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState(init);

  const [groupName, setGroupName] = useState(init);

  useEffect(() => {
    if (textareaEl.current) {
      textareaEl.current.style.height = 'inherit';
      const { scrollHeight } = textareaEl.current;
      textareaEl.current.style.height = `${scrollHeight}px`;
    }
  }, [value]);

  const ref = useRef(null);

  const disabled = useMemo(() => value === '' || (value !== ''
  && value.replace(/\s/g, '').length === 0), [value]);

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
      keep: {
        label,
        value,
        groupName,
        userId: session.user.uid,
      },
      uid: session.user.uid,
    });
    setLabel(init);
    setValue(init);
    setGroupName(init);
  };

  const enter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && e.metaKey) {
      e.preventDefault(); // preventDefaultしないと改行が残ってしまう
      submit(e);
    }
  };

  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button
            style={{ height: 40 }}
            className={`
            hover:opacity-60
            transition duration-300 ease-in-out
        `}
            id="Keep"
            title="Keep"
            aria-label="Keep"
            ref={ref}
          >
            <span
              className="
            py-2 px-4 rounded-md text-sm min-w-24
            border text-gray-500 hover:text-black border-black
            transition duration-300 ease-in-out
            disabled:border-gray-100 disabled:text-gray-500 disabled:cursor-default"
            >
              Keep
            </span>
          </Popover.Button>

          <Transition
            show={open}
            as="div"
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
            className="
            fixed z-10 left-0 top-0
            w-screen
            h-screen
            flex justify-center items-center
            bg-gray-50 bg-opacity-80
            "
          >
            <Popover.Panel>
              <form
                onSubmit={submit}
                className="
              grid gap-2 p-4
              bg-white rounded-md shadow-lg md:w-96 w-sm-full
              "
              >
                <input
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="ラベル(etc. 住所1)"
                />
                <textarea
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="テキストを入力* (etc. 東京都世田谷区)"
                  required
                  className="p-4 rounded-md"
                  style={{ resize: 'none' }}
                  ref={textareaEl}
                  onKeyDown={enter}
                />
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="グループ(etc. 住所)"
                />
                <div className="flex justify-end"><Button type="submit" id="Submit">Submit(⌘ + Enter)</Button></div>
              </form>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default KeepInput;
