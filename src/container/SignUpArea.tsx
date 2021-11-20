import { Transition } from '@headlessui/react';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import { useAuth } from '../hooks';
import { useSession } from '../hooks/useSession';

const SignUpArea = () => {
  const { signIn } = useAuth();
  const { session, loading: loadingSession } = useSession();

  if (loadingSession) {
    return (
      <div className="grid items-center">
        <Avatar src={null} title="loading" isLoading width="20" height="20" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="grid items-center">
        <Button
          onClick={() => signIn()}
          id="Sign in"
        >
          Sign in
        </Button>
      </div>
    );
  }

  return (
    <div className="w-screen -mt-12">
      <div className="container grid gap-4">
        {/* [TODO]インプットが完全に表示されたあと、loadingSession: trueから数秒後に表示するほうが違和感ないかも */}
        <Transition
          show={!loadingSession}
          enter="transform transition duration-700 ease-in-out"
          enterFrom="opacity-0  -translate-x-10"
          enterTo="opacity-100  translate-x-0"
          leave="transform duration-400 transition ease-in-out"
          leaveFrom="opacity-100 scale-100 translate-x-0"
          leaveTo="opacity-0 scale-95"
        >
          <div className="grid gap-2">
            <h1 className="font-bold text-3xl tracking-wide">{`ようこそ ${session.user.displayName}`}</h1>
            <p>サービス内で利用する公開idを設定してください。</p>
          </div>
        </Transition>

        <input type="text" placeholder="例: ksyunnnn" />
      </div>
    </div>
  );
};

export default SignUpArea;
