import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import { useAuth } from '../hooks';
import { useSession } from '../hooks/useSession';

const SignInArea = () => {
  const { signIn, signOut, loading } = useAuth();
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
    <div className="grid items-center gap-4 grid-flow-col">
      <Popover className="relative">
        <Popover.Button
          style={{ height: 40 }}
          className={`
            hover:opacity-60
            transition duration-300 ease-in-out
          `}
        >
          <Avatar
            src={session.user.photoURL}
            title={session.user.displayName || ''}
          />
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute z-10 right-0 bg-white rounded-md shadow-lg md:w-96 w-sm-full">
            <div className="grid gap-8 p-4">
              <div className="grid gap-4">
                <div>
                  <div className="text-gray-600 mr-2">Signed in as </div>
                  <div className="font-bold text-2xl">{session.user.displayName}</div>
                </div>
                <div>{session.user.email}</div>
              </div>
              <Button
                onClick={() => signOut()}
                loading={loading}
                id="Sign out"
              >
                Sign out
              </Button>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>

    </div>
  );
};

export default SignInArea;
