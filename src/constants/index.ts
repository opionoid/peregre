import { IAbility, ISkill, IWeapon } from 'src/interfaces'
import { Icons } from 'src/assets/icons'

// 項目が増えてきたら別ファイルにする
export const ROUTE = {
  top: '/',
  rules: '/rules',
  character: '/character',
  stories: '/stories',
  news: '/news',
  config: '/config',
}

export type IRollResult = typeof ROLL_RESULT[keyof typeof ROLL_RESULT]
export const ROLL_RESULT = {
  CRITICAL: 'critical',
  SUCCESS: 'success',
  FAILURE: 'failure',
  FUMBLE: 'fumble',
} as const

export const INITIAL_ABILITY: IAbility = {
  name: '未設定',
  description:
    'このアビリティは未設定です。本来表示されない画面なのでバグが疑われます。@EggoggE にご連絡くださると大変うれしいです。',
  icon: {
    src: Icons.Navigation,
    alt: '',
  },
  successRate: 0,
}

export const INITIAL_SKILL: ISkill = {
  icon: {
    src: Icons.FirstAid,
    alt: '',
  },
  name: `スキルが未設定です`,
  description: '編集モードでスキルを5つ設定してください。',
  depth: 0,
  shouldCast: false,
  isUlt: false,
}

export const INITIAL_MAIN_WEAPON: IWeapon = {
  name: '未設定メイン武器',
  range: '中距離',
  description:
    'このアビリティは未設定です。本来表示されない画面なのでバグが疑われます。@EggoggE にご連絡くださると大変うれしいです。',
  icon: {
    src: '',
    alt: '',
  },
  hp: 0,
  skillList: [INITIAL_SKILL],
}

export const INITIAL_SUB_WEAPON: IWeapon = {
  name: '未設定サブ武器',
  range: '中距離',
  description:
    'このアビリティは未設定です。本来表示されない画面なのでバグが疑われます。@EggoggE にご連絡くださると大変うれしいです。',
  icon: {
    src: '',
    alt: '',
  },
  hp: 0,
  skillList: [INITIAL_SKILL],
}