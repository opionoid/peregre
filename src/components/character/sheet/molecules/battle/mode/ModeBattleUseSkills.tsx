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
  depth: 0 | 1 | 2 | 3 | 4
  setDepth: React.Dispatch<React.SetStateAction<0 | 1 | 2 | 3 | 4>>
  currentSkill: ISkill
  setCurrentSkill: React.Dispatch<React.SetStateAction<ISkill>>
  skillHand: ISkill[]
}

export const ModeBattleUseSkills: React.VFC<IModeBattleUseSkills> = ({
  depth,
  setDepth,
  currentSkill,
  setCurrentSkill,
  skillHand,
}) => {
  const name = useRecoilValue(nameAtom)
  const { onClickSkill } = useBattle()
  const canUseSkill = React.useMemo(() => depth >= -currentSkill.depth, [depth, currentSkill.depth])
  const handleClick = () => {
    if (!canUseSkill) return
    onClickSkill(currentSkill, setDepth, name)
  }

  return (
    <>
      {/** TODO: FIXME: スキルが存在しないとき CardList の箇所に 0 という文字が出る */}
      <CardList>
        {skillHand?.length && skillHand.map((skill) => (
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
        <ButtonBase disabled={!canUseSkill} onClick={handleClick}>
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
