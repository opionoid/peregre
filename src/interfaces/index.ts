import { Icons } from 'src/assets/icons'

/**
 * 汎用的な interface の定義場所
 * 増えてきたらファイルを分ける
 */
export type IImage = {
  readonly src: string
  readonly alt?: string // 画像近くの文が画像と同じ内容のときのみ空になる
}

export type IIconImage = {
  readonly src: IIconKey | string
  readonly alt?: string
}

export type ILink = {
  readonly href: string
  readonly target?: string
  readonly text?: string
}

export type IIconKey = keyof typeof Icons

export type IDifficulty = '平易' | '標準' | '困難'

export interface IAbility {
  name: string
  icon: IIconImage
  description: string
  successRate: number
}

export interface IDirtyAbility {
  name: string
  icon: IIconKey
  description: string
}

export interface IWeapon {
  name: string
  icon: IIconImage
  description: string
  hp: number
  range: string
  skillList: ISkill[]
}

export interface IDirtyWeapon {
  name: string
  icon: IIconKey
  description: string
  hp: string
  range: string
  skills: IDirtySkill[]
}

export interface ISkill {
  icon: IIconImage
  name: string
  description: string
  depth: number
  shouldCast: boolean
  isUlt: boolean
}

export interface IDirtySkill {
  name: string
  description: string
  depth: string
  shouldCast: string
  isUlt: string
}

export interface IDirtyStory {
  title: string
  slug: string
  leading: string
  participants: string
  time: string
}