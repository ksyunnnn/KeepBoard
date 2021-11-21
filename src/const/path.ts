import { Keep } from '../data/keep';

const ROOT = '';
export const TOP = `${ROOT}/`;
export const SIGNUP = `${ROOT}/signup`;
export const KEEP = (keep: Keep) => `${ROOT}/b/${keep.id}`;
