import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { keepCollectionRef } from '../api/keep';
import { Keep, KeepStatus } from '../data/keep';
import {
  onSnapshot, orderBy, query, where,
} from '../lib/firebase';
import { useLoading } from './useLoading';
import { useSession } from './useSession';

const initKeep: Keep[] = [];

export const useKeeps = () => {
  const [keep, setKeep] = useState<Keep[]>(initKeep);
  const { session } = useSession();
  const { loading, setLoading } = useLoading();

  const [currentStatus, setCurrentStatus] = useState<KeepStatus>('KEEP');

  const router = useRouter();
  const { groupName: qGroupName } = router.query as { groupName: string };

  useEffect(() => {
    if (!session) {
      setKeep(initKeep);
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
        setKeep(data);
        setLoading(false);
      },
    }) : onSnapshot(query(
      keepCollectionRef(session.user.uid),
      currentStatus === 'ARCHIVED' ? where('status', '==', 'ARCHIVED') : where('status', '==', 'KEEP'),
      orderBy('createdAt', 'desc'),
    ), {
      next: (snapshot) => {
        const data = snapshot.docs.map((documentSnapshot) => documentSnapshot.data());
        setKeep(data);
        setLoading(false);
      },
    });
    return unsubscribe;
  }, [session, setKeep, setLoading, currentStatus, qGroupName]);

  return {
    keep,
    loading,
    currentStatus,
    setCurrentStatus,
  };
};
