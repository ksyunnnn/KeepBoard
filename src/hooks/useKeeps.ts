import { useEffect, useState } from 'react';
import { keepCollectionRef } from '../api/keep';
import { Keep, BrickStatus } from '../data/keep';
import {
  onSnapshot, orderBy, query, where,
} from '../lib/firebase';
import { useLoading } from './useLoading';
import { useSession } from './useSession';

const initBricks: Keep[] = [];

export const useKeeps = () => {
  const [keep, setBricks] = useState<Keep[]>(initBricks);
  const { session } = useSession();
  const { loading, setLoading } = useLoading();

  const [currentStatus, setCurrentStatus] = useState<BrickStatus>('BRICK');

  useEffect(() => {
    if (!session) {
      setBricks(initBricks);
      return () => null;
    }
    setLoading(true);
    const unsubscribe = onSnapshot(query(
      keepCollectionRef(session.user.uid),
      currentStatus === 'ARCHIVED' ? where('status', '==', 'ARCHIVED') : where('status', '==', 'BRICK'),
      orderBy('createdAt', 'desc'),
    ), {
      next: (snapshot) => {
        const data = snapshot.docs.map((documentSnapshot) => documentSnapshot.data());
        setBricks(data);
        setLoading(false);
      },
    });
    return unsubscribe;
  }, [session, setBricks, setLoading, currentStatus]);

  return {
    keep,
    loading,
    currentStatus,
    setCurrentStatus,
  };
};
