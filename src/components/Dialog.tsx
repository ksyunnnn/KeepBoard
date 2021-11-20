import { Dialog as HDialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useDialog } from '../hooks';
import Button from './Button';

// [todo] actionのエラーハンドリングをしたい
const Dialog: React.FCX = () => {
  const {
    dialog: {
      shown, title, desc, action,
    }, setDialog,
  } = useDialog();
  const close = () => setDialog((prev) => ({
    ...prev,
    shown: false,
  }));
  return (
    <Transition appear show={shown} as={Fragment}>
      <HDialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={close}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <HDialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
              <HDialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {title}
              </HDialog.Title>

              {desc && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  {desc}
                </p>
              </div>
              )}

              <div className="mt-4 flex gap-2">
                {action ? (
                  <>
                    <Button
                      id={action.name}
                      onClick={() => {
                        action.dispatch().then(close);
                      }}
                    >
                      {action.name}
                    </Button>
                    <Button
                      id="close"
                      onClick={close}
                      variant="text"
                    >
                      Close
                    </Button>
                  </>
                ) : (
                  <Button
                    id="close"
                    onClick={close}
                  >
                    Close
                  </Button>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </HDialog>
    </Transition>
  );
};

export default Dialog;
