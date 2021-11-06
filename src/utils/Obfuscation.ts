/**
 * テキストを難読化
 * @param text 難読化したいテキスト
 * @returns 難読化されたバイナリテキスト
 */
export const encodeTextToObfuscated = (text: string) => {
  const codeUnits = new Uint16Array(text.length)
  for (let i = 0; i < codeUnits.length; i++) {
    codeUnits[i] = text.charCodeAt(i)
  }
  const convertedBinary = String.fromCharCode(
    ...new Uint8Array(codeUnits.buffer),
  )
  return btoa(convertedBinary)
}

/**
 * 難読化されたテキストを平易化
 * @param binary 難読化されたバイナリテキスト
 * @returns 平易化されたテキスト
 */
export const decodeObfuscatedTextToReadable = (binary: string) => {
  const decodedBinary = atob(binary)
  const bytes = new Uint8Array(decodedBinary.length)
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = decodedBinary.charCodeAt(i)
  }
  return String.fromCharCode(...new Uint16Array(bytes.buffer))
}
