import { randomFruit } from './util';

export class Hi {
  hi() {
    return 'Sleep';
  }
}

// for (var i = 0; i < 10; i--) {}
//
// for (var i = 10; i >= 0; i++) {}

export const hi = () => {
  const s = new Hi();
  console.warn(s.hi());
  const i = 'Hello';
  const t = randomFruit();
  return `${i} World ${t}`;
};
