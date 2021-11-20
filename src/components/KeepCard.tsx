import { Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { ArchiveIcon } from '@heroicons/react/outline';
import Button from './Button';
import { Keep } from '../data/keep';
import sleep from '../lib/sleep';
import { format } from '../lib/date';
import Link from './Link';
import { PATH } from '../const';

const KeepCard: React.FCX<{
  checked: boolean;
  active: boolean;
  archive?: () => void;
  keep: Keep;
  variant?: 'SHOW' | 'LIST'
  clipBoard: ()=> void;
 }> = ({
   checked,
   active,
   archive,
   keep,
   variant = 'LIST',
   clipBoard,
 }) => {
   const [show, setShow] = useState(false);
   useEffect(() => {
     setShow(true);
   }, []);
   return (
     <Transition
       as={Fragment}
       show={show}
       enter="transform transition duration-400"
       enterFrom="opacity-0  -translate-y-10"
       enterTo="opacity-100  translate-y-0"
       leave="transform duration-400 transition ease-in-out"
       leaveFrom="opacity-100 scale-100 translate-x-0"
       leaveTo={`opacity-0 scale-95 ${keep.status === 'ARCHIVED' ? '-translate-x-10' : 'translate-x-10'}`}
     >
       <div
         className="
            bg-white shadow-lg
            rounded-md
            pt-4 pb-2 px-4 transition-card
            relative
            grid gap-4
        "
       >
         <div
           className={`
           whitespace-pre-wrap
           break-all
           ${active || checked ? 'text-sky-100' : 'text-gray-500'}
           `}
           style={{ minHeight: 80 }}
         >
           {keep.value}
         </div>
         <div className="flex justify-between items-end text-xs h-8 text-gray-400">
           <div className="pl-1">
             {((checked || active) && variant === 'LIST') && (
             <>
               <Button
                 onClick={clipBoard}
                 id="クリップボードにコピー"
               >
                 クリップボードにコピー
               </Button>
             </>
             )}
           </div>
           {((checked || active) && variant === 'LIST') && (
             <>
               <Button
                 type="button"
                 onClick={async () => {
                   setShow(false);
                   await sleep(300);
                   if (archive)archive();
                 }}
                 aria-label="archives"
                 title="archives"
                 id="archives"
                 variant="icon"
               >
                 {keep.status === 'ARCHIVED' ? '←' : <ArchiveIcon className="h-4 w-4" /> }
               </Button>
             </>
           )}
         </div>
       </div>
     </Transition>
   );
 };

export default KeepCard;
