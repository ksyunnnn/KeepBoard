import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { keepCollectionRef } from '../api/keep';
import { Keep, KeepStatus } from '../data/keep';
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

  const [currentStatus, setCurrentStatus] = useState<KeepStatus>('KEEP');

  const router = useRouter();
  const { groupName: qGroupName } = router.query as { groupName: string };

  useEffect(() => {
    if (!session) {
      setBricks(initBricks);
      return () => null;
    }

    setLoading(true);

    // [TODO] 要リファクタ
    const unsubscribe = qGroupName?.length > 0 ? onSnapshot(query(
      keepCollectionRef(session.user.uid),
      currentStatus === 'ARCHIVED' ? where('status', '==', 'ARCHIVED') : where('status', '==', 'KEEP'),
      orderBy('createdAt', 'desc'),
      where('groupName', '==', qGroupName),
    ), {
      next: (snapshot) => {
        const data = snapshot.docs.map((documentSnapshot) => documentSnapshot.data());
        setBricks(data);
        setLoading(false);
      },
    }) : onSnapshot(query(
      keepCollectionRef(session.user.uid),
      currentStatus === 'ARCHIVED' ? where('status', '==', 'ARCHIVED') : where('status', '==', 'KEEP'),
      orderBy('createdAt', 'desc'),
    ), {
      next: (snapshot) => {
        const data = snapshot.docs.map((documentSnapshot) => documentSnapshot.data());
        setBricks(data);
        setLoading(false);
      },
    });
    return unsubscribe;
  }, [session, setBricks, setLoading, currentStatus, qGroupName]);

  return {
    keep,
    loading,
    currentStatus,
    setCurrentStatus,
  };
};
