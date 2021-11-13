import React from 'react'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { CharacterMaking } from 'src/components/character/making/CharacterMaking'
import { CharacterSheet } from 'src/components/character/sheet/CharacterSheet'
import { isMakingFinishedAtom } from 'src/data/atom'

export const CharacterPage: React.VFC = () => {
  const shouldShowSheet = useRecoilValue(isMakingFinishedAtom)

  return <Character>{shouldShowSheet ? <CharacterSheet /> : <CharacterMaking />}</Character>
}

const Character = styled.div`
  margin-bottom: 9em;
  
  &::before {
    content: '';
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    background-image: url('https://picsum.photos/1200/1200');
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: cover;
    width: 100%;
    height: 100vh;
    filter: opacity(0.1) grayscale(0.1) blur(4px) sepia(1);
  }
`
