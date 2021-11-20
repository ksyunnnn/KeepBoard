import { useEffect, useState } from 'react';
// import { useRecoilState } from 'recoil';
import {
  auth, AuthUser, onAuthStateChanged,
} from '../lib/firebase';
// import { CurrentUserState } from '../state/currentUser';
import { useLoading } from './useLoading';

// 配置場所検討
export type Session = {
    user: AuthUser;
    expires?: '' // WIP 有効期限ぽい
}

export const useSession = () => {
  const { loading, setLoading } = useLoading(true);
  const [session, setSession] = useState<Session>();

  // [TODO]Session取得したらとりいにいく
  // const [currentUser, setCurrentUser] = useRecoilState(CurrentUserState);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setSession({
          user,
        });
      } else {
        setSession(undefined);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [setLoading]);

  return {
    loading,
    session,
    // currentUser,
  };
};
