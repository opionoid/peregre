import React from 'react'
import styled from 'styled-components'
import { space } from 'src/assets/style'
import { ISkill } from 'src/interfaces'
import { WeaponButton } from 'src/components/actor/button/WeaponButton'
import { ButtonBase } from 'src/components/actor/button/ButtonBase'
import { useBattle } from 'src/utils/hooks/useBattle'
import { useRecoilValue } from 'recoil'
import { nameAtom } from 'src/data/atom'
import { SkillInfo } from './SkillInfo'

export interface IModeBattleUseSkills {
  setDepth: React.Dispatch<React.SetStateAction<0 | 1 | 2 | 3 | 4>>
  currentSkill: ISkill
  setCurrentSkill: React.Dispatch<React.SetStateAction<ISkill>>
  skillHand: ISkill[]
}

export const ModeBattleUseSkills: React.VFC<IModeBattleUseSkills> = ({
  setDepth,
  currentSkill,
  setCurrentSkill,
  skillHand,
}) => {
  const name = useRecoilValue(nameAtom)
  const { onClickSkill } = useBattle()
  const handleClick = () => onClickSkill(currentSkill, setDepth, name)
  
  return (
    <>
    <CardList>
      {skillHand.map((skill) => (
            <Card key={skill.name}>
              <WeaponButton
                skill={skill}
                accent={currentSkill.name === skill.name}
                onClick={() => setCurrentSkill(skill)}
              />
            </Card>
          ))}
    </CardList>
    <SkillInfo currentSkill={currentSkill} />
    <ActionButton>
            <ButtonBase onClick={handleClick}>
              使用
            </ButtonBase>
          </ActionButton>
    </>
  )
}

const CardList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  column-gap: ${space.s};
  margin-top: ${space.m};
`
const Card = styled.div`
  margin-top: ${space.s};
`
const ActionButton = styled.div`
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
