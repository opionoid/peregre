import React from 'react'
import { useRecoilValue } from 'recoil'
import { CharacterMaking } from 'src/components/character/making/CharacterMaking'
import { CharacterSheet } from 'src/components/character/sheet/CharacterSheet'
import { isMakingFinishedAtom } from 'src/data/atom'

export const CharacterPage: React.VFC = () => {
  const shouldShowSheet = useRecoilValue(isMakingFinishedAtom)

  return <>{shouldShowSheet ? <CharacterSheet /> : <CharacterMaking />}</>
}
