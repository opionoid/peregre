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
import { color, space } from 'src/assets/style'
import { IToggleButtonProps, ToggleButton } from '../actor/button/ToggleButton'
import { Icons } from 'src/assets/icons'
import { WeaponButton } from '../actor/button/WeaponButton'
import { ButtonBase } from '../actor/button/ButtonBase'
import { IRollResult, ROLL_RESULT } from 'src/constants'
import { rollDice10 } from 'src/utils/Math'

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
  const [skillHand, setSkillHand] = React.useState(
    [...Array(5)].map((_, i) => skills[i]),
  )
  const [currentSkill, setCurrentSkill] = React.useState<ISkill>(skillHand[0])

  // 探索系ステータス
  const abilities: IAbility[] = useRecoilValue(abilityListAtom)
  const [currentAbility, setCurrentAbility] = React.useState<IAbility>(
    abilities[0],
  )

  // モード
  const [isAdventureMode, toggleAdventureMode] = useToggle(false) // 探索 / 戦闘
  const [isEditMode, toggleEditMode] = useToggle(false) // 編集モードは戦闘モードの子要素

  // インフォ
  const abilityInfo = <div>TODO: アビリティ</div>
  const skillInfo = <div>TODO: スキル</div>

  // 編集エリア
  const editArea = <div>TODO: 編集エリアつくる</div>

  // コンテンツ
  const content = isAdventureMode
    ? abilityInfo
    : isEditMode
    ? editArea
    : skillInfo

  // クリック
  const handleClick = () => {
    if (isAdventureMode) {
      const diceNumber = rollDice10()
      const rollResult: IRollResult = (() => {
        if (diceNumber === 1) return ROLL_RESULT.CRITICAL
        else if (diceNumber === 10) return ROLL_RESULT.FUMBLE
        else if (diceNumber < currentAbility.successRate)
          return ROLL_RESULT.SUCCESS
        else return ROLL_RESULT.FAILURE
      })()
      console.log(`${currentAbility.name}: ${diceNumber}${rollResult}`)
      // const message = `${currentAbility.name}: ${diceNumber}${rollResult}`
      // sendMessageToDiscord('ability', message)
    } else {
      if (isEditMode) {
        // TODO
        setSkillHand([skills[0], skills[1]])
      }
      if (!isEditMode) {
        // sendMessageToDiscord
        console.log(currentSkill)
      }
    }
  }

  return (
    <CharacterSheetWrapper>
      <Name>{name}</Name>
      <ToggleWrapper>
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
              <AbilityButton
                ability={ability}
                onClick={() => setCurrentAbility(ability)}
              />
            </Card>
          ))}
        {!isAdventureMode &&
          skillHand.map((skill) => (
            <Card key={skill.name}>
              <WeaponButton
                skill={skill}
                setCurrentSkill={() => setCurrentSkill(skill)}
              />
            </Card>
          ))}
      </CardList>
      <ContentArea>
        {!isAdventureMode && (
          <ToggleButton
            {...EditToggle}
            onClick={toggleEditMode}
            isReversed={isEditMode}
            lighten
          />
        )}
        {content}
        <ButtonBase onClick={handleClick}>テストする</ButtonBase>
      </ContentArea>
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
const ContentArea = styled.div`
  padding: ${space.l} 0;
  margin: ${space.l} auto;
  background-color: ${color.backgroundHighContrast};
  color: ${color.fontInHighContrast};
`
