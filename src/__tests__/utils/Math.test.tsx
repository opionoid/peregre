import * as UtilMath from '~/utils/Math'

/*
test('Math/randomizeXorShift', () => {
  expect(() => UtilMath.randomizeXorShift(1111)).???(() => UtilMath.randomizeXorShift(1112))
})
*/

test('Math/getRandomizedIndex', () => {
  expect(() => UtilMath.getRandomizedIndex(10, 1111)).toBeGreaterThanOrEqual(0)
  expect(() => UtilMath.getRandomizedIndex(10, 1111)).toBeLessThanOrEqual(9)
})

test('Math/rollDice10', () => {
  expect(() => UtilMath.rollDice10()).toBeGreaterThanOrEqual(1);
  expect(() => UtilMath.rollDice10()).toBeLessThanOrEqual(10);

  expect(() => UtilMath.rollDice10(10)).toBeGreaterThanOrEqual(10);
  expect(() => UtilMath.rollDice10(10)).toBeLessThanOrEqual(100);
})