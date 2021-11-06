import * as UtilMath from 'src/utils/Math'

/*
test('Math/randomizeXorshift', () => {
  expect(() => UtilMath.randomizeXorshift(1111)).???(() => UtilMath.randomizeXorshift(1112))
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