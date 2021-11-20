import { useState } from 'react';
import {
  getCredential, signIn as signInBase, signOut as signOutBase,
} from '../lib/firebase';
import logger from '../lib/logger';
import { useLoading } from './useLoading';

export const useAuth = () => {
  const { loading, setLoading } = useLoading();
  const [token, setToken] = useState<string | undefined>();

  const signIn = () => {
    setLoading(true);

    return signInBase()
      .then((result) => {
        logger('SUCCES', result);

        const credential = getCredential(result);
        const accessToken = credential?.accessToken;
        setToken(accessToken);
      })
      .catch((reason) => logger('ERROR', reason))
      .finally(() => setLoading(false));
  };
  const signOut = () => {
    setLoading(true);
    return signOutBase().then((v) => logger('SUCCES', v)).catch((reason) => logger('ERROR', reason)).finally(() => setLoading(false));
  };

  return {
    loading,
    signIn,
    signOut,
    token,
  };
};
