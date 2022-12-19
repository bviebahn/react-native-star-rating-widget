import { getStars } from '../utils';

test('returns stars array', () => {
  expect(getStars(3.5, 5)).toEqual(['full', 'full', 'full', 'half', 'empty']);
});
