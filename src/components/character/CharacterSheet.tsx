import React from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import {
  abilityListAtom,
  mainWeaponAtom,
  nameAtom,
  subWeaponAtom,
} from 'src/data/atom'
import { IAbility, ISkill } from 'src/interfaces'
import { useToggle } from 'react-use'
import { AbilityButton } from '../actor/button/AbilityButton'
import { space } from 'src/assets/style'
import { IToggleButtonProps, ToggleButton } from '../actor/button/ToggleButton'
import { Icons } from 'src/assets/icons'
import { WeaponButton } from '../actor/button/WeaponButton'

const EditToggle: IToggleButtonProps = {
  defaultImage: {
    src: Icons.Acting, // TODO
    alt: 'モード',
  },
  defaultLabel: '編集',
  reversedImage: {
    src: Icons.Agitation,
    alt: '',
  },
  reversedLabel: '編集中...',
}

const AdventureToggle: IToggleButtonProps = {
  defaultImage: {
    src: Icons.Oration,
    alt: '',
  },
  defaultLabel: '戦闘',
  reversedImage: {
    src: Icons.Navigation,
    alt: '',
  },
  reversedLabel: '探索',
}

export interface ICharacterSheetProps {}

export const CharacterSheet: React.VFC<ICharacterSheetProps> = () => {
  // プロフィール
  const name = useRecoilValue(nameAtom)

  // 戦闘系ステータス
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
      ...subWeapon.skillList.filter((skill) => skill.isUlt !== true),
    ],
    [mainWeapon, subWeapon],
  )

  // 探索系ステータス
  const abilities: IAbility[] = useRecoilValue(abilityListAtom)

  // モード
  const [isEditMode, toggleEditMode] = useToggle(false)
  const [isAdventureMode, toggleAdventureMode] = useToggle(false)

  return (
    <CharacterSheetWrapper>
      <Name>{name}</Name>
      <ToggleWrapper>
        <ToggleButton
          {...EditToggle}
          onClick={toggleEditMode}
          isReversed={isEditMode}
          lighten
        />
        <ToggleButton
          {...AdventureToggle}
          onClick={toggleAdventureMode}
          isReversed={isAdventureMode}
        />
      </ToggleWrapper>
      <StatusWrapper>
        <Hp>
          <CurrentHp value={hp} onInput={() => setHp} />
          <MaxHp> / {maxHp}</MaxHp>
        </Hp>
        <Depth>
          <CurrentDepth value={depth} onInput={() => setDepth} />
          <MaxDepth> / 4</MaxDepth>
        </Depth>
      </StatusWrapper>
      <CardList>
        {isAdventureMode &&
          abilities.map((ability) => (
            <Card key={ability.name}>
              <AbilityButton ability={ability} />
            </Card>
          ))}
        {!isAdventureMode &&
          skills.map((skill, i) => {
            if (i > 4) return
            else {
              return (
                <Card key={skill.name}>
                  <WeaponButton skill={skill} setCurrentSkill={() => {}} />
                </Card>
              )
            }
          })}
      </CardList>
      {isEditMode && <p>TODO: エディット</p>}
    </CharacterSheetWrapper>
  )
}

const CharacterSheetWrapper = styled.div``
const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: ${space.xs};
  margin-top: ${space.l};
`
const Name = styled.h1``

const StatusWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${space.m};
`
const Hp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const CurrentHp = styled.input`
  display: block;
  padding: 10px;
`
const MaxHp = styled.p`
  display: block;
`
const Depth = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const CurrentDepth = styled.input`
  display: block;
  padding: 10px;
`
const MaxDepth = styled.p`
  display: block;
`
const CardList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  column-gap: ${space.xs};
`

const Card = styled.div`
  margin-top: ${space.xs};
`
