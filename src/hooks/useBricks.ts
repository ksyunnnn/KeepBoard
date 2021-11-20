import { useEffect, useState } from 'react';
import { bricksCollectionRef } from '../api/bricks';
import { Brick, BrickStatus } from '../data/brick';
import {
  onSnapshot, orderBy, query, where,
} from '../lib/firebase';
import { useLoading } from './useLoading';
import { useSession } from './useSession';

const initBricks: Brick[] = [];

export const useBricks = () => {
  const [bricks, setBricks] = useState<Brick[]>(initBricks);
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
      bricksCollectionRef(session.user.uid),
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
    bricks,
    loading,
    currentStatus,
    setCurrentStatus,
  };
};
