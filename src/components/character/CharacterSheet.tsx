/**
 * TODO: 要リファクタリング
 */
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
  const abilityInfo = (
    <>
      <h3>{currentAbility.name}</h3>
      <p>{currentAbility.description}</p>
    </>
  )
  const skillInfo = (
    <>
      <h3>{currentSkill.name}</h3>
      <p>深度: {currentSkill.depth}</p>
      <p>{currentSkill.description}</p>
    </>
  )
  const infoArea = isAdventureMode ? abilityInfo : skillInfo

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

  const [hasEditError, setHasEditError] = React.useState(false)
  // 編集
  const handleClickOnEditMode = (skill: ISkill) => {
    if (hasEditError) setHasEditError(false)
    if (skillHand.includes(skill)) {
      const tmp = skillHand.filter((hand) => hand.name !== skill.name)
      console.log(`${skill.name} is included`)
      setSkillHand(tmp)
    } else if (skillHand.length < 5) {
      const tmp = skillHand
      console.log(`${skill.name} is pushed`)
      setSkillHand([...tmp, skill])
    } else {
      setHasEditError(true)
    }
  }

  // 編集エリア(jsx)
  const editArea = (
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
        {subWeapon.skillList.map((skill, i) => (
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
    </>
  )

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
                accent={currentAbility.name === ability.name}
                onClick={() => setCurrentAbility(ability)}
              />
            </Card>
          ))}
        {!isAdventureMode &&
          skillHand.map((skill) => (
            <Card key={skill.name}>
              <WeaponButton
                skill={skill}
                accent={!isEditMode && currentSkill.name === skill.name}
                onClick={() => setCurrentSkill(skill)}
              />
            </Card>
          ))}
      </CardList>
      {!isAdventureMode && isEditMode && <EditArea>{editArea}</EditArea>}
      <InfoArea>{infoArea}</InfoArea>
      <ButtonsWrapper>
        {!isAdventureMode && (
          <ToggleButton
            {...EditToggle}
            onClick={toggleEditMode}
            isReversed={isEditMode}
            lighten
          />
        )}
        {!isEditMode && (
          <ActionButton>
            <ButtonBase onClick={handleClick} accent={hasEditError}>
              使用
            </ButtonBase>
          </ActionButton>
        )}
      </ButtonsWrapper>
    </CharacterSheetWrapper>
  )
}

const CharacterSheetWrapper = styled.div`
  max-width: 90%;
  min-width: 60%;
  min-height: 84vh;
  margin: 0 auto;
`
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
  column-gap: ${space.s};
`
const Card = styled.div`
  margin-top: ${space.s};
`
const InfoArea = styled.div`
  margin-top: ${space.s};
  padding: calc(0.8rem + 1.2vmin) calc(1.2rem + 2.6vmin) calc(1rem + 2.4vmin)
    calc(1.2rem + 2.6vmin);
  border-radius: 1.5em;
  color: ${color.fontInHighContrast};
  background-color: ${color.backgroundHighContrast};
  min-height: 80px;
`
const EditArea = styled.div`
  margin-bottom: ${space.l};
`
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
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: ${space.xs};
  margin: ${space.m} auto ${space.l} auto;
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
