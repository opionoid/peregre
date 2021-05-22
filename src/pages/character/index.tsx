import React from 'react'
import { useRecoilValue } from 'recoil'
import { CharacterMaking } from 'src/components/character/CharacterMaking'
import { CharacterSheet } from 'src/components/character/CharacterSheet'
import { isMakingFinishedAtom } from 'src/data/atom'

export const CharacterPage: React.VFC = () => {
  const shouldShowSheet = useRecoilValue(isMakingFinishedAtom)

  return <>{shouldShowSheet ? <CharacterSheet /> : <CharacterMaking />}</>
}
