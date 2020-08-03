import { randomFruit } from './util';

export class Hi {
 hi() {
   return 'Sleep';
 }
}

export const hi = (): string => {
  const s = new Hi();
  console.warn(s.hi());
  const i = 'Hello';
  const t = randomFruit();
  return `${i} World ${t}`;
}
