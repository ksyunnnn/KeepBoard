import { FirestoreDataConverter, Timestamp } from 'firebase/firestore';

export interface User {
  _type?: 'user';
  id?: string;

  /* Firebase Auth のUserInfoより */
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string; // Auth uidと一致することになる

  displayId: string; // URLやメンションに使うもの

  createdAt?: Date;
  updatedAt?: Date;
}

export const UserConverter: FirestoreDataConverter<User> = {
  toFirestore: (user: User) => {
    if (user.displayId === '') throw new Error('user.displayId');
    return {
      _type: 'user',

      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
      displayId: user.displayId,

      createdAt: Timestamp.fromDate(user.createdAt ? user.createdAt : new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
    };
  },
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    const user = {
      id: snapshot.id,
      ...data,
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
    } as User;
    return user;
  },
};
