export const colorPallet = {
  // 抹茶
  green: '#86ab7a',
  greenLighten: '#9ac58c',
  greenDarken: '#729168',
  // 象牙
  white: '#fef8e7',
  whiteLighten: '#ffffff', // いわゆる白飛び状態であまり綺麗じゃないが，ベース色をこれ以上暗くもしたくない
  whiteDarken: '#d8d3c4',
  // ベージュ
  beige: '#e0c3ac',
  beigeLighten: '#ffe0c6',
  beigeDarken: '#bea692',
  // 薄花桜
  lightBlue: '#616f8d',
  lightBlueLighten: '#7080a2',
  lightBlueDarken: '#525e78',
  // 藍鉄
  darkBlue: '#2f3846',
  darkBlueLighten: '#364051',
  darkBlueDarken: '#28303c'
}

const whiteTheme = {
  /**
   * 文字
   */
  font: colorPallet.darkBlue,
  fontLight: colorPallet.lightBlue,
  fontInHighContrast: colorPallet.white,
  /**
   * 背景
   */
  // 基礎
  background: colorPallet.white,
  backgroundShadowLighten: colorPallet.whiteLighten,
  backgroundShadowDarken: colorPallet.whiteDarken,
  // ローコントラスト（暗め）
  backgroundDaLowContrast: colorPallet.beige,
  backgroundLowContrastShadowLighten: colorPallet.beigeLighten,
  backgroundLowContrastShadowDarken: colorPallet.beigeDarken,
  // ハイコントラスト（フォントと一緒）
  backgroundHighContrast: colorPallet.darkBlue,
  backgroundHighContrastShadowLighten: colorPallet.darkBlueLighten,
  backgroundHighContrastShadowDarken: colorPallet.darkBlueDarken,
  /**
   * アクセント
   */
  accent: colorPallet.green
}

const darkTheme = {
  /**
   * 文字
  */
  font: colorPallet.white,
  fontLight: colorPallet.beige,
  fontInHighContrast: colorPallet.darkBlue,
  /**
   * 背景
   */
  // 基礎
  background: colorPallet.darkBlue,
  backgroundShadowLighten: colorPallet.darkBlueLighten,
  backgroundShadowDarken: colorPallet.darkBlueDarken,
  // ローコントラスト（明るめ）
  backgroundLowContrast: colorPallet.lightBlue,
  backgroundLowContrastShadowLighten: colorPallet.lightBlueLighten,
  backgroundLowContrastShadowDarken: colorPallet.lightBlueDarken,
  // ハイコントラスト（フォントと一緒）
  backgroundHighContrast: colorPallet.white,
  backgroundHighContrastShadowLighten: colorPallet.whiteLighten,
  backgroundHighContrastShadowDarken: colorPallet.whiteDarken,
  /**
   * アクセント
   */
  accent: colorPallet.green
}

export const theme = {
  white: whiteTheme,
  dark: darkTheme
}
