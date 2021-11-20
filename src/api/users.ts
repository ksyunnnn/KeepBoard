import { COLLECTION } from '../const';
import { User, UserConverter } from '../data/user';
import {
  addDoc, collection, db, doc, setDoc,
} from '../lib/firebase';
import logger from '../lib/logger';

export const usersCollectionRef = (uid: string) => collection(
  db, `/${COLLECTION.USERS}/${uid}`,
).withConverter(UserConverter);

// [TODO] 未使用・どういう使い方するか検討
export const postUser = async ({ user, uid }: {user: User, uid: string}) => {
  if (user.id) {
    try {
      const res = await setDoc(doc(usersCollectionRef(uid), user.id), user);
      logger('SUCCES', 'setDoc', res);
    } catch (e) {
      logger('ERROR', 'Error adding document: ', e);
    }
  } else {
    try {
      const docRef = await addDoc(usersCollectionRef(uid), user);
      logger('SUCCES', 'Document written with ID: ', docRef.id);
    } catch (e) {
      logger('ERROR', 'Error adding document: ', e);
    }
  }
};
