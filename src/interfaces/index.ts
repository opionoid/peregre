import Icons from "src/assets/icons";

/**
 * 汎用的な interface の定義場所
 * 増えてきたらファイルを分ける
 */
export interface IImage {
  src: string
  alt?: string // 画像近くの文が画像と同じ内容のときのみ空になる
}

export interface IIconImage {
  src: IIconKey | string
  alt?: string;
}

export interface ILink {
  href: string
  target?: string
  text?: string
}

export type IIconKey = keyof (typeof Icons)

export interface IAbility {
  name: string
  icon: IIconImage
  description: string
  level: number
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
