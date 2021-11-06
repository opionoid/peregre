/**
 * シード値付き疑似乱数生成器
 * @param seed シード値
 * @returns 乱数
 */
export const randomizeXorshift = (seed: number) => {
  let [x, y, z, w] = [654297, 720421, 904279, seed]

  const t = x ^ (x << 11)
  x = y
  y = z
  z = w

  w = w ^ (w >>> 19) ^ (t ^ (t >>> 8))

  return w < 0 ? w * -1 : w
}

/**
 * ランダムなインデックスを取得
 * @param length 配列の長さ
 * @param seed シード値
 * @returns ランダムなインデックス
 */
export const getRandomizedIndex = (length: number, seed: number) =>
  (randomizeXorshift(seed) % length) - 1

/**
 * 10面ダイスを任意の個数振る
 * TODO: なぜか Xorshift つかってないので使う
 * @param amount ダイスの数
 * @returns 出目合計
 */
export const rollDice10 = (amount: number = 1) =>
  Math.ceil(Math.random() * 10) * amount
