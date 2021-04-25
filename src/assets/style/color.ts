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

export const color = {
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
  backgroundLowContrast: colorPallet.beige,
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

