import React from 'react'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { mainWeaponAtom, subWeaponAtom } from 'src/data/atom'
import { color, space } from 'src/assets/style'
import { useToggle } from 'react-use'
import { ISkill } from 'src/interfaces'
import { Icons } from 'src/assets/icons'
import { ModeBattleEditSkills } from './mode/ModeBattleEditSkills'
import { ModeBattleUseSkills } from './mode/ModeBattleUseSkills'
import { ToggleButton } from 'src/components/actor/button/ToggleButton'

const SUB_WEAPON_SKILL_SURPLUS = 3 as const

export const ModeBattle = () => {
  const mainWeapon = useRecoilValue(mainWeaponAtom)
  const subWeapon = useRecoilValue(subWeaponAtom)

  const maxHp = React.useMemo(
    () => Math.ceil(mainWeapon.hp * 0.6 + subWeapon.hp * 0.4),
    [mainWeapon, subWeapon],
  )
  const [hp, setHp] = React.useState<number>(maxHp) // TODO 0~maxHp の整数に制限する
  const [depth, setDepth] = React.useState<0 | 1 | 2 | 3 | 4>(1)

  const skills: ISkill[] = React.useMemo(
    () => [
      ...mainWeapon.skillList,
      // サブ武器のスキル数は少ない
      ...subWeapon.skillList.filter(
        (_, i) => i % SUB_WEAPON_SKILL_SURPLUS !== 1 /** seed % 3 */,
      ),
    ],
    [mainWeapon, subWeapon],
  )
  const [skillHand, setSkillHand] = React.useState(
    [...Array(5)].map((_, i) => skills[i]),
  )
  const [currentSkill, setCurrentSkill] = React.useState<ISkill>(skillHand[0])

  const [isEditMode, toggleMode] = useToggle(false)

  return (
    <section>
      <BaseStatus>
        <HeadingWrapper>
          <ToggleButton defaultImage={{ src: Icons.Oration }} defaultLabel='戦闘' reversedImage={{ src: Icons.Training }} reversedLabel='編集' onClick={() => toggleMode()} isReversed={isEditMode} />
        </HeadingWrapper>
        <StatusWrapper>
          <Hp>
            <StatusIcon src={Icons.MaxHp} alt="魂魄量" />
            <CurrentHp
              value={hp}
              onChange={(e) => {
                const dirtyValue = parseInt(e.currentTarget.value) | 0
                setHp(dirtyValue < maxHp ? dirtyValue : maxHp)
              }}
            />
            <MaxHp>{maxHp}</MaxHp>
          </Hp>
          <Depth>
            <StatusIcon src={Icons.MaxDepth} alt="深度" />
            <CurrentDepth
              value={depth}
              onChange={(e) => {
                const dirtyValue = parseInt(e.currentTarget.value) | 0
                setDepth(dirtyValue < 5 ? (dirtyValue as 0 | 1 | 2 | 3 | 4) : 4)
              }}
            />
            <MaxDepth>4</MaxDepth>
          </Depth>
        </StatusWrapper>
      </BaseStatus>
      <div aria-hidden={isEditMode}>
        <ModeBattleUseSkills setDepth={setDepth} currentSkill={currentSkill} setCurrentSkill={setCurrentSkill} skillHand={skillHand} />
      </div>
      <div aria-hidden={!isEditMode}>
        <ModeBattleEditSkills currentSkill={currentSkill} setCurrentSkill={setCurrentSkill} skillHand={skillHand} setSkillHand={setSkillHand} subWeaponSkillSurplus={SUB_WEAPON_SKILL_SURPLUS} />
      </div>
    </section>
  )
}

const BaseStatus = styled.div`
  display: flex;
  column-gap: ${space.xl};
  margin: 0 auto;
  width: fit-content;
  align-items: center;

  @media screen and (max-width: 35rem) {
    display: block;
  }
`
const HeadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: ${space.xs};
  margin-top: ${space.m};
`
const StatusWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: ${space.m};
  margin-top: ${space.m};
`
const Hp = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`
const StatusIcon = styled.img`
  width: 4em;
  height: 4em;
`
const CurrentHp = styled.input`
  display: block;
  width: 3rem;
  padding: 4px 0;
  box-sizing: border-box;
  border: 0;
  background-color: inherit;
  font-size: 2rem;
  text-align: center;
  outline-color: ${color.accent};
`
const MaxHp = styled.p`
  display: inline-block;
  position: absolute;
  text-align: center;
  top: 1.5rem;
  left: 0;
  width: 1.9em;
  height: 1.9em;
  border-radius: 50%;
  background-color: ${color.backgroundHighContrast};
  color: ${color.fontInHighContrast};
`
const Depth = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`
const CurrentDepth = styled.input`
  display: block;
  width: 3rem;
  padding: 4px 0;
  box-sizing: border-box;
  border: 0;
  background-color: inherit;
  font-size: 2rem;
  text-align: center;
  outline-color: ${color.accent};
`
const MaxDepth = styled.p`
  display: inline-block;
  position: absolute;
  text-align: center;
  top: 1.5rem;
  left: 0;
  width: 1.9em;
  height: 1.9em;
  border-radius: 50%;
  background-color: ${color.backgroundHighContrast};
  color: ${color.fontInHighContrast};
`
