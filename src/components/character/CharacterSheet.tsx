
import React from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { abilityListAtom, mainWeaponAtom, nameAtom, subWeaponAtom } from 'src/data/atom'
import { IAbility, ISkill } from 'src/interfaces'
import { useToggle } from 'react-use'
import { ButtonBase } from '../actor/button/ButtonBase'
import { AbilityButton } from '../actor/button/AbilityButton'
import { space } from 'src/assets/style'

export interface ICharacterSheetProps {}

export const CharacterSheet: React.VFC<ICharacterSheetProps> = () => {
  // プロフィール
  const name = useRecoilValue(nameAtom)

  // 戦闘系ステータス
  const mainWeapon = useRecoilValue(mainWeaponAtom)
  const subWeapon = useRecoilValue(subWeaponAtom)
  const maxHp = React.useMemo(() => Math.ceil(mainWeapon.hp * 0.6 + subWeapon.hp * 0.4), [mainWeapon, subWeapon])
  const [hp, setHp] = React.useState<number>(maxHp) // TODO 0~maxHp の整数に制限する
  const [depth, setDepth] = React.useState<0 | 1 | 2 | 3 | 4>(1)
  const skills: ISkill[] = React.useMemo(() => (
    [...mainWeapon.skillList, ...subWeapon.skillList.filter(skill => skill.isUlt !== true)]
    ), [mainWeapon, subWeapon])

  // 探索系ステータス
  const abilities: IAbility[] = useRecoilValue(abilityListAtom)

  // モード
  const [isEditMode, toggleEditMode] = useToggle(false)
  const [isAdventureMode, toggleAdventureMode] = useToggle(false)

  return (
    <CharacterSheetWrapper>
      <HeadWrapper>
        <Name>{name}</Name>
        <EditButton>
          <ButtonBase onClick={toggleEditMode}>＠＠</ButtonBase>
        </EditButton>
        <EditButton>
          <ButtonBase onClick={toggleAdventureMode}>＠＠</ButtonBase>
        </EditButton>
      </HeadWrapper>
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
        {
          isAdventureMode &&
          abilities.map(ability => (
            <Card key={ability.name}>
              <AbilityButton ability={ability} />
            </Card>
          ))
        }
        {
          !isAdventureMode &&
          skills.map(skill => (
            <Card key={skill.name}>
              {skill.name}
            </Card>
          ))
        }
      </CardList>
      {
        isEditMode && <p>TODO: エディット</p>
      }
    </CharacterSheetWrapper>
  )
}

const CharacterSheetWrapper = styled.div``
const HeadWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Name = styled.h1`
`
const EditButton = styled.div`
  border-radius: 50%;
  width: 80px;
  height: 80px;
`
const StatusWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
`

const Card = styled.div`
  margin: ${space.xxs};
`