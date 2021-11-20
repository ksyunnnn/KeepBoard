import { FirestoreDataConverter, Timestamp } from 'firebase/firestore';

export type KeepStatus = 'KEEP' | 'ARCHIVED';

export type Keep = {
  _type?: 'keep';
  id?: string;
  status?: KeepStatus
  createdAt?: Date;
  updatedAt?: Date;
  userId: string;

  // [メモ]編集可能
  groupName?: string; // グルーピング用・重複した名前が入ってくる想定
  label?: string;
  value: string;
};

export const KeepConverter: FirestoreDataConverter<Keep> = {
  toFirestore: (keep: Keep) => {
    if (
      keep.value === '' || (keep.value !== '' && keep.value.replace(/\s/g, '').length === 0
      )) throw new Error('required keep.value');
    return {
      _type: 'keep',
      groupName: keep.groupName || '',
      label: keep.label || '',
      value: keep.value || '',
      status: keep.status || 'KEEP',
      createdAt: Timestamp.fromDate(keep.createdAt ? keep.createdAt : new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
      userId: keep.userId,
    };
  },
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    const brick = {
      id: snapshot.id,
      ...data,
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
    } as Keep;
    return brick;
  },
};
