import React from 'react'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { color, space } from 'src/assets/style'
import { ISkill } from 'src/interfaces'
import { WeaponButton } from 'src/components/actor/button/WeaponButton'
import { mainWeaponAtom, subWeaponAtom } from 'src/data/atom'
import { SkillInfo } from './SkillInfo'

export interface IModeBattleEditSkills {
  currentSkill: ISkill
  setCurrentSkill: React.Dispatch<React.SetStateAction<ISkill>>
  skillHand: ISkill[]
  setSkillHand: React.Dispatch<React.SetStateAction<ISkill[]>>
  subWeaponSkillSurplus: number
}

export const ModeBattleEditSkills: React.VFC<IModeBattleEditSkills> = ({
  currentSkill,
  setCurrentSkill,
  skillHand,
  setSkillHand,
  subWeaponSkillSurplus
}) => {
  const mainWeapon = useRecoilValue(mainWeaponAtom)
  const subWeapon = useRecoilValue(subWeaponAtom)
  const [hasEditError, setHasEditError] = React.useState(false)
  const handleClickOnEditMode = (skill: ISkill) => {
    setCurrentSkill(skill)
    if (hasEditError) setHasEditError(false)
    if (skillHand.includes(skill)) {
      const tmp = skillHand.filter((hand) => hand.name !== skill.name)
      setSkillHand(tmp)
    } else if (skillHand.length < 5) {
      const tmp = skillHand
      setSkillHand([...tmp, skill])
    } else {
      setHasEditError(true)
    }
  }

  // 編集エリア TODO: 別コンポーネントに切り出す
  return (
    <>
      <EditWeapon>
        <EditWeaponIcon {...mainWeapon.icon} />
        <h2>{mainWeapon.name}</h2>
      </EditWeapon>
      <EditScrollX>
        {mainWeapon.skillList.map((skill, i) => (
          <div
            key={`${i}-${skill.name}`}
            style={{ width: '142px', marginRight: space.xs }}
          >
            <WeaponButton
              skill={skill}
              accent={skillHand.includes(skill)}
              onClick={() => handleClickOnEditMode(skill)}
            />
          </div>
        ))}
      </EditScrollX>
      <EditWeapon>
        <EditWeaponIcon {...subWeapon.icon} />
        <h2>{subWeapon.name}</h2>
      </EditWeapon>
      <EditScrollX>
        {subWeapon.skillList
          .filter((_, i) => i % subWeaponSkillSurplus !== 1 /** seed % 3 */)
          .map((skill, i) => (
            <div
              key={`${i}-${skill.name}`}
              style={{ width: '142px', marginRight: space.xs }}
            >
              <WeaponButton
                skill={skill}
                accent={skillHand.includes(skill)}
                onClick={() => handleClickOnEditMode(skill)}
              />
            </div>
          ))}
      </EditScrollX>
      <SkillInfo currentSkill={currentSkill} />
    </>
  )
}

const EditWeapon = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${space.xxs};
  margin: ${space.s} 0 0 ${space.xs};
`
const EditWeaponIcon = styled.img`
  width: 2em;
  height: 2em;
  background-color: ${color.backgroundHighContrast};
  border-radius: 1em;
`
const EditScrollX = styled.div`
  display: flex;
  width: 100%;
  margin: ${space.xxs} 0;
  overflow-x: scroll;
`