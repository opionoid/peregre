/**
 * 汎用的な interface の定義場所
 * 増えてきたらファイルを分ける
 */
export interface IImage {
  src: string
  alt?: string // 画像近くの文が画像と同じ内容のときのみ空になる
}

export interface ILink {
  href: string
  target?: string
  text?: string
}

export interface IAbility {
  name: string
  icon: IImage
  description: string
  level: number
}

export interface IWeapon {
  name: string
  description: string
  hp: number
  skillList: ISkill[]
}

export interface ISkill {
  name: string
  description: string
  depth: number
  shouldCast: boolean
  isUlt: boolean
}
