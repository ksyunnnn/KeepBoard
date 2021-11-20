import { useEffect, useState } from 'react';
import { useLoading } from './useLoading';
import { Brick } from '../data/brick';
import { useSession } from './useSession';
import { onSnapshot } from '../lib/firebase';
import { bricksDocumentRef } from '../api/bricks';

export const useBrick = (id: string) => {
  const { loading, setLoading } = useLoading();
  const { session } = useSession();

  const [brick, setBrick] = useState<Brick>();

  useEffect(() => {
    if (!session || !id) {
      return () => null;
    }
    setLoading(true);
    const unsubscribe = onSnapshot(bricksDocumentRef(session.user.uid, id), {
      next: (snapshot) => {
        const data = snapshot.data();
        setBrick(data);
        setLoading(false);
      },
    });
    return unsubscribe;
  }, [session, id, setLoading]);

  return {
    brick,
    loading,
  };
};
