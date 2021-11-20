import { FirestoreDataConverter, Timestamp } from 'firebase/firestore';

export type BrickStatus = 'BRICK' | 'ARCHIVED';

export type Brick = {
  _type?: 'brick';
  id?: string;
  text: string;
  status?: BrickStatus
  createdAt?: Date;
  updatedAt?: Date;
  userId: string;
};

export const BrickConverter: FirestoreDataConverter<Brick> = {
  toFirestore: (brick: Brick) => {
    if (
      brick.text === '' || (brick.text !== '' && brick.text.replace(/\s/g, '').length === 0
      )) throw new Error('required brick.text');
    return {
      _type: 'brick',
      text: brick.text,
      status: brick.status || 'BRICK',
      createdAt: Timestamp.fromDate(brick.createdAt ? brick.createdAt : new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
      userId: brick.userId,
    };
  },
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    const brick = {
      id: snapshot.id,
      ...data,
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
    } as Brick;
    return brick;
  },
};
