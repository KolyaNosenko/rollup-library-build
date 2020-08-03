import { randomFruit, Bye } from './util';

export class Hi extends G{
 hi() {
   return 'Sleep';
 }
}

export const hi = () => {
  if("foobar".includes("foo")) {
    return 'Sleep';
  }
  const s = new Hi();
  const bb = new Bye();
  console.warn(s.hi());
  console.warn(bb.bye());
  const i = 'Hello';
  const t = randomFruit();
  return `${i} World ${t}`
}
