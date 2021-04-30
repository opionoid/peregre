import React from 'react'
import { useRecoilValue } from 'recoil'
import { color } from 'src/assets/style'
import { CharacterMaking } from 'src/components/character/CharacterMaking'
import { CharacterSheet } from 'src/components/character/CharacterSheet'
import { isMakingFinishedAtom } from 'src/data/atom'
import styled from 'styled-components'
//import styled from 'styled-components'

export const CharacterPage: React.VFC = () => {
  const shouldShowSheet = useRecoilValue(isMakingFinishedAtom);

  return (
    <Page>
        {shouldShowSheet ? <CharacterSheet /> : <CharacterMaking />}
    </Page>
  )
}

const Page = styled.div`
  background-color: ${color.background};
`

/**
 * config（デフォルトは全てオフ）
 * - バトルモードと設定モードのボタンの色を反転
 * - リロードボタンを表示
 * - スキル使用前の確認をスキップ
 * - 
 */