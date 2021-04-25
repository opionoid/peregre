import React from 'react'
import { RecoilRoot } from 'recoil'
import { CharacterMaking } from 'src/components/character/CharacterMaking'
import { CharacterSheet } from 'src/components/character/CharacterSheet'
//import styled from 'styled-components'

export interface ICharacterPageProps {}

export const CharacterPage: React.VFC = () => {
  return (
    <RecoilRoot>
      <CharacterMaking />
      <CharacterSheet />
    </RecoilRoot>
  )
}

/**
 * config（デフォルトは全てオフ）
 * - バトルモードと設定モードのボタンの色を反転
 * - リロードボタンを表示
 * - スキル使用前の確認をスキップ
 * - 
 */