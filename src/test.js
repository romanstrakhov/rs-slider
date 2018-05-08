import { uniteObjects } from './helpers';

const a = {
  a: 1,
  b: 'one',
  c: {
    a: 1,
    b: 'one',
  },
  d: [1, 2],
};

const b = {
  a: 2,
  b: 'two',
  c: {
    b: 'two',
    c: 0.2,
  },
  d: [2, 3, { a: 4, b: 5 }],
  e: 'fine',
};

const d = {
  a: 2,
  b: 'two',
  c: {
    a: 1,
    b: 'two',
    c: 0.2,
  },
  d: [1, 2, 3, { a: 4, b: 5 }],
  e: 'fine',
};

console.log('Here we go:');

const c = uniteObjects(a, b);

console.log('Here we get:');
console.log(c);
console.log(d);
console.log(JSON.stringify(c) === JSON.stringify(d) ? 'EQUAL' : 'different');
