import React from 'react'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { abilityAtom, nameAtom } from 'src/data/atom'
import { color, space } from 'src/assets/style'
import { ButtonBase } from 'src/components/actor/button/ButtonBase'
import { useAdventure } from 'src/utils/hooks/useAdventure'

export const ModeAbility: React.VFC = () => {
  const name = useRecoilValue(nameAtom)
  const ability = useRecoilValue(abilityAtom)

  const { onClickAbility } = useAdventure()
  const handleClick = () => onClickAbility(ability, name)

  return (
    <section>
      <InfoArea>
        <h3>{ability.name}</h3>
        <p>{ability.description}</p>
      </InfoArea>
      <ActionButton>
        <ButtonBase onClick={handleClick}>
          使用
        </ButtonBase>
      </ActionButton>
    </section>
  )
}

const InfoArea = styled.div`
  margin-top: ${space.s};
  padding: calc(0.8rem + 1.2vmin) calc(1.2rem + 2.6vmin) calc(1rem + 2.4vmin)
    calc(1.2rem + 2.6vmin);
  border-radius: 1.5em;
  color: ${color.fontInHighContrast};
  background-color: ${color.backgroundHighContrast};
  min-height: 80px;
`
const ActionButton = styled.div`
  margin: ${space.s} auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 60px;
  transition: border-radius 0.3s ease-in-out;
  border-radius: 0.75em;

  &:hover {
    border-radius: 24px;
    opacity: 0.98;
    transform: translateZ(1.8);
  }
`
