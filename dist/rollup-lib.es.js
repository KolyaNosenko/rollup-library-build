import random from 'lodash/random';

const FRUITS = ['🍏', '🍉', '🍇'];
const randomFruit = () => FRUITS[random(0, FRUITS.length - 1)];

class Hi {
    hi() {
        return 'Sleep';
    }
}
// for (var i = 0; i < 10; i--) {}
//
// for (var i = 10; i >= 0; i++) {}
const hi = () => {
    const s = new Hi();
    console.warn(s.hi());
    const i = 'Hello';
    const t = randomFruit();
    return `${i} World ${t}`;
};

export { Hi, hi };
