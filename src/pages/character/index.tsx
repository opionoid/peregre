import React from 'react'
import { useRecoilValue } from 'recoil'
import { CharacterMaking } from 'src/components/character/CharacterMaking'
import { CharacterSheet } from 'src/components/character/CharacterSheet'
import { isMakingFinishedAtom } from 'src/data/atom'

export const CharacterPage: React.VFC = () => {
  const shouldShowSheet = useRecoilValue(isMakingFinishedAtom)

  return <>{shouldShowSheet ? <CharacterSheet /> : <CharacterMaking />}</>
}

/**
 * config（デフォルトは全てオフ）
 * - バトルモードと設定モードのボタンの色を反転
 * - リロードボタンを表示
 * - スキル使用前の確認をスキップ
 * -
 */
