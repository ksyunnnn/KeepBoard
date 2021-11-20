import { COLLECTION } from '../const';
import { Brick, BrickConverter } from '../data/brick';
import {
  addDoc,
  collection, db, doc, setDoc,
} from '../lib/firebase';
import logger from '../lib/logger';

export const bricksCollectionRef = (uid: string) => collection(
  db,
  `/${COLLECTION.USERS}/${uid}/${COLLECTION.BRICKS}`,
).withConverter(BrickConverter);

export const bricksDocumentRef = (uid: string, brickId: string) => doc(db,
  `/${COLLECTION.USERS}/${uid}/${COLLECTION.BRICKS}/${brickId}`).withConverter(BrickConverter);

export const addBrick = async ({ brick, uid }: {brick: Brick, uid: string}) => {
  if (brick.id) {
    try {
      const res = await setDoc(doc(bricksCollectionRef(uid), brick.id), brick);
      logger('SUCCES', 'setDoc', res);
    } catch (e) {
      logger('ERROR', 'Error adding document: ', e);
    }
  } else {
    try {
      const docRef = await addDoc(bricksCollectionRef(uid), brick);
      logger('SUCCES', 'Document written with ID: ', docRef.id);
    } catch (e) {
      logger('ERROR', 'Error adding document: ', e);
    }
  }
};
