import { Brick } from '../data/brick';

const ROOT = '';
export const TOP = `${ROOT}/`;
export const SIGNUP = `${ROOT}/signup`;
export const BRICK = (brick: Brick) => `${ROOT}/b/${brick.id}`;
