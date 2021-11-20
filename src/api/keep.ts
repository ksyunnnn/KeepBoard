import { COLLECTION } from '../const';
import { Keep, KeepConverter } from '../data/keep';
import {
  addDoc,
  collection, db, doc, setDoc,
} from '../lib/firebase';
import logger from '../lib/logger';

export const keepCollectionRef = (uid: string) => collection(
  db,
  `/${COLLECTION.USERS}/${uid}/${COLLECTION.KEEP}`,
).withConverter(KeepConverter);

export const keepDocumentRef = (uid: string, keepId: string) => doc(db,
  `/${COLLECTION.USERS}/${uid}/${COLLECTION.KEEP}/${keepId}`).withConverter(KeepConverter);

export const addKeep = async ({ keep, uid }: {keep: Keep, uid: string}) => {
  if (keep.id) {
    try {
      const res = await setDoc(doc(keepCollectionRef(uid), keep.id), keep);
      logger('SUCCES', 'setDoc', res);
    } catch (e) {
      logger('ERROR', 'Error adding document: ', e);
    }
  } else {
    try {
      const docRef = await addDoc(keepCollectionRef(uid), keep);
      logger('SUCCES', 'Document written with ID: ', docRef.id);
    } catch (e) {
      logger('ERROR', 'Error adding document: ', e);
    }
  }
};
