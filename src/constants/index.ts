import { IAbility } from "~/interfaces"

// 項目が増えてきたら別ファイルにする
export type IRollResult = typeof ROLL_RESULT[keyof typeof ROLL_RESULT]
export const ROLL_RESULT = {
  CRITICAL: 'critical',
  SUCCESS: 'success',
  FAILURE: 'failure',
  FUMBLE: 'fumble'
} as const

// TODO: 文言組み込み
export const INITIAL_ABILITY: IAbility = {
  name: '未設定',
  description: 'このアビリティは未設定です。アビリティ設定モードにしますか？',
  icon: {
    src: '',
    alt: ''
  },
  level: 0,
} 