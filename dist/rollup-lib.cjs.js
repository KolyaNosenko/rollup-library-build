'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var random = _interopDefault(require('lodash/random'));

const FRUITS = ['🍏', '🍉', '🍇'];

const randomFruit = () => FRUITS[random(0, FRUITS.length - 1)];

class Hi {
  hi() {
    return 'Sleep';
  }

} // for (var i = 0; i < 10; i--) {}
//
// for (var i = 10; i >= 0; i++) {}

const hi = () => {
  const s = new Hi();
  console.warn(s.hi());
  const i = 'Hello';
  const t = randomFruit();
  return `${i} World ${t}`;
};

exports.Hi = Hi;
exports.hi = hi;
