export const randomizeXorShift = (seed: number) => {
  let [x, y, z, w] = [654297, 720421, 904279, seed]

  const t = x ^ (x << 11)
  x = y
  y = z
  z = w

  w = w ^ (w >>> 19) ^ (t ^ (t >>> 8))

  return w < 0 ? w * -1 : w
}

export const getRandomizedIndex = (length: number, seed: number) =>
  (randomizeXorShift(seed) % length) - 1

export const rollDice10 = (amount: number = 1) =>
  Math.ceil(Math.random() * 10) * amount
