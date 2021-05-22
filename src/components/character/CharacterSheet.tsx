/**
 * TODO: 要リファクタリング
 */
import React from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import {
  abilityListAtom,
  mainWeaponAtom,
  nameAtom,
  subWeaponAtom,
} from 'src/data/atom'
import { IAbility, ISkill, IWeapon } from 'src/interfaces'
import { useToggle } from 'react-use'
import { AbilityButton } from '../actor/button/AbilityButton'
import { color, space } from 'src/assets/style'
import { IToggleButtonProps, ToggleButton } from '../actor/button/ToggleButton'
import { Icons } from 'src/assets/icons'
import { WeaponButton } from '../actor/button/WeaponButton'
import { ButtonBase } from '../actor/button/ButtonBase'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { IRollResult, ROLL_RESULT } from 'src/constants'
import { rollDice10 } from 'src/utils/Math'
import {
  decodeObfuscatedTextToReadable,
  encodeTextToObfuscated,
} from 'src/utils/Obfuscation'

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

type IData = {
  name: string
  hp: number
  mainWeapon: IWeapon
  subWeapon: IWeapon
  abilities: IAbility[]
}

export interface ICharacterSheetProps {}

export const CharacterSheet: React.VFC<ICharacterSheetProps> = () => {
  // 基礎データ
  const [name, setName] = useRecoilState(nameAtom)
  const [mainWeapon, setMainWeapon] = useRecoilState(mainWeaponAtom)
  const [subWeapon, setSubWeapon] = useRecoilState(subWeaponAtom)
  const [abilities, setAbilities] = useRecoilState(abilityListAtom)

  // 魂魄量、深度
  const maxHp = React.useMemo(
    () => Math.ceil(mainWeapon.hp * 0.6 + subWeapon.hp * 0.4),
    [mainWeapon, subWeapon],
  )
  const [hp, setHp] = React.useState<number>(maxHp) // TODO 0~maxHp の整数に制限する
  const [depth, setDepth] = React.useState<0 | 1 | 2 | 3 | 4>(1)

  // スキル
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

  // アビリティ
  const [currentAbility, setCurrentAbility] = React.useState<IAbility>(
    abilities[0],
  )

  // モード
  const [isAdventureMode, toggleAdventureMode] = useToggle(false) // 探索 / 戦闘
  const [isEditMode, toggleEditMode] = useToggle(false) // 編集モードは戦闘モードの子要素

  // インフォ TODO: 別コンポーネントにする
  const abilityInfo = (
    <>
      <h3>{currentAbility.name}</h3>
      <p>{currentAbility.description}</p>
    </>
  )
  const skillInfo = (
    <>
      <div style={{ display: 'flex', columnGap: '32px', alignItems: 'center' }}>
        <h3 style={{ minWidth: '25%' }}>{currentSkill.name}</h3>
        <p style={{ fontSize: '1.4rem', lineHeight: '1', margin: '0' }}>
          <img
            src={Icons.Depth}
            width={24}
            height={24}
            style={{ marginRight: '0.625rem' }}
          />
          {currentSkill.depth}
        </p>
      </div>
      <p>{currentSkill.description}</p>
    </>
  )
  const infoArea = isAdventureMode ? abilityInfo : skillInfo

  // 使用
  const handleClickToUse = () => {
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
      // sendMessageToDiscord
      console.log(currentSkill)
    }
  }

  // 編集
  const [hasEditError, setHasEditError] = React.useState(false)
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

  // 編集エリア TODO: 別コンポーネントに切り出す
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

  // 保存 / 読込
  const handleClickToSave = (): string => {
    const jsonData: IData = {
      name: name,
      hp: hp,
      mainWeapon: mainWeapon,
      subWeapon: subWeapon,
      // skillHand: skillHand... recoil に含めるかどうか
      abilities: abilities,
    }
    const textData = JSON.stringify(jsonData)
    return encodeTextToObfuscated(textData)
  }
  const handleClickToLoad = (obfuscatedText: string): void => {
    const textData = decodeObfuscatedTextToReadable(obfuscatedText)
    const jsonData: IData = JSON.parse(textData)

    setName(jsonData.name ?? name)
    setMainWeapon(jsonData.mainWeapon ?? mainWeapon)
    setSubWeapon(jsonData.subWeapon ?? subWeapon)
    setAbilities(jsonData.abilities ?? abilities)
  }

  return (
    <CharacterSheetWrapper>
      <CopyWrapper>
        <LoadButton>
          <ButtonBase
            onClick={() =>
              handleClickToLoad(
                'ewAiAG4AYQBtAGUAIgA6ACIAZgBkACIALAAiAGgAcAAiADoAMQAyACwAIgBtAGEAaQBuAFcAZQBhAHAAbwBuACIAOgB7ACIAbgBhAG0AZQAiADoAIgDcem4wVmciACwAIgByAGEAbgBnAGUAIgA6ACIAYJDdjeKWIgAsACIAZABlAHMAYwByAGkAcAB0AGkAbwBuACIAOgAiAAwwa3BLMIkwJ1kwV5IwiFuLMIgwRjDcem8w8paSMFxPijABMJZZvnxvMCdZMFeSMKWAhDBZMIgwRjBPeoQwSzBqMKiYkjBcT2MwXzACMA0wIgAsACIAaQBjAG8AbgAiADoAewAiAHMAcgBjACIAOgAiAC8AcwB0AGEAdABpAGMALwBtAGUAZABpAGEALwBOAGEAdgBpAGcAYQB0AGkAbwBuAC4AYQAyAGQAMABlADgAOAA3AC4AcwB2AGcAIgAsACIAYQBsAHQAIgA6ACIAIgB9ACwAIgBoAHAAIgA6ADIAMAAsACIAcwBrAGkAbABsAEwAaQBzAHQAIgA6AFsAewAiAGkAYwBvAG4AIgA6AHsAIgBzAHIAYwAiADoAIgAvAHMAdABhAHQAaQBjAC8AbQBlAGQAaQBhAC8ATgBhAHYAaQBnAGEAdABpAG8AbgAuAGEAMgBkADAAZQA4ADgANwAuAHMAdgBnACIALAAiAGEAbAB0ACIAOgAiACIAfQAsACIAbgBhAG0AZQAiADoAIgD3lgaXIgAsACIAZABlAHAAdABoACIAOgAyACwAIgBkAGUAcwBjAHIAaQBwAHQAaQBvAG4AIgA6ACIAQQBvAEUAAjD7Tg9hbjCTlQhURDBrMDQAAjAiACwAIgBzAGgAbwB1AGwAZABDAGEAcwB0ACIAOgB0AHIAdQBlACwAIgBpAHMAVQBsAHQAIgA6AGYAYQBsAHMAZQB9ACwAewAiAGkAYwBvAG4AIgA6AHsAIgBzAHIAYwAiADoAIgAvAHMAdABhAHQAaQBjAC8AbQBlAGQAaQBhAC8ATgBhAHYAaQBnAGEAdABpAG8AbgAuAGEAMgBkADAAZQA4ADgANwAuAHMAdgBnACIALAAiAGEAbAB0ACIAOgAiACIAfQAsACIAbgBhAG0AZQAiADoAIgBSl1BdIgAsACIAZABlAHAAdABoACIAOgAxACwAIgBkAGUAcwBjAHIAaQBwAHQAaQBvAG4AIgA6ACIABFwLejAAAjBBAG8ARQACMDIAAjDOMMMwrzDQMMMwrzACMCIALAAiAHMAaABvAHUAbABkAEMAYQBzAHQAIgA6AGYAYQBsAHMAZQAsACIAaQBzAFUAbAB0ACIAOgBmAGEAbABzAGUAfQAsAHsAIgBpAGMAbwBuACIAOgB7ACIAcwByAGMAIgA6ACIALwBzAHQAYQB0AGkAYwAvAG0AZQBkAGkAYQAvAE4AYQB2AGkAZwBhAHQAaQBvAG4ALgBhADIAZAAwAGUAOAA4ADcALgBzAHYAZwAiACwAIgBhAGwAdAAiADoAIgAiAH0ALAAiAG4AYQBtAGUAIgA6ACIA3HpuMPx/IgAsACIAZABlAHAAdABoACIAOgAyACwAIgBkAGUAcwBjAHIAaQBwAHQAaQBvAG4AIgA6ACIAJmLYlYuVy1lCZgEw6oGrjmswqFmzWxCAJ2CSMNhODk5ZMIswAjB/Tyh1QmYBMPt51VJZMIswAjAiACwAIgBzAGgAbwB1AGwAZABDAGEAcwB0ACIAOgBmAGEAbABzAGUALAAiAGkAcwBVAGwAdAAiADoAZgBhAGwAcwBlAH0ALAB7ACIAaQBjAG8AbgAiADoAewAiAHMAcgBjACIAOgAiAC8AcwB0AGEAdABpAGMALwBtAGUAZABpAGEALwBOAGEAdgBpAGcAYQB0AGkAbwBuAC4AYQAyAGQAMABlADgAOAA3AC4AcwB2AGcAIgAsACIAYQBsAHQAIgA6ACIAIgB9ACwAIgBuAGEAbQBlACIAOgAiAPeW+ZZuMIZU7lQiACwAIgBkAGUAcAB0AGgAIgA6AC0AMgAsACIAZABlAHMAYwByAGkAcAB0AGkAbwBuACIAOgAiAEEAbwBFAAIwq4wakAIwOAACMARcC3qFUW4wk5UIVEQwZzB9VC1OWTCLMF8wczABWptSLQA0AAIwIgAsACIAcwBoAG8AdQBsAGQAQwBhAHMAdAAiADoAdAByAHUAZQAsACIAaQBzAFUAbAB0ACIAOgBmAGEAbABzAGUAfQAsAHsAIgBpAGMAbwBuACIAOgB7ACIAcwByAGMAIgA6ACIALwBzAHQAYQB0AGkAYwAvAG0AZQBkAGkAYQAvAE4AYQB2AGkAZwBhAHQAaQBvAG4ALgBhADIAZAAwAGUAOAA4ADcALgBzAHYAZwAiACwAIgBhAGwAdAAiADoAIgAiAH0ALAAiAG4AYQBtAGUAIgA6ACIAN2xZciIALAAiAGQAZQBwAHQAaAAiADoAMQAsACIAZABlAHMAYwByAGkAcAB0AGkAbwBuACIAOgAiAARcC3owAAIwNgACMCIALAAiAHMAaABvAHUAbABkAEMAYQBzAHQAIgA6AGYAYQBsAHMAZQAsACIAaQBzAFUAbAB0ACIAOgBmAGEAbABzAGUAfQAsAHsAIgBpAGMAbwBuACIAOgB7ACIAcwByAGMAIgA6ACIALwBzAHQAYQB0AGkAYwAvAG0AZQBkAGkAYQAvAE4AYQB2AGkAZwBhAHQAaQBvAG4ALgBhADIAZAAwAGUAOAA4ADcALgBzAHYAZwAiACwAIgBhAGwAdAAiADoAIgAiAH0ALAAiAG4AYQBtAGUAIgA6ACIAIgAsACIAZABlAHAAdABoACIAOgAwACwAIgBkAGUAcwBjAHIAaQBwAHQAaQBvAG4AIgA6ACIAIgAsACIAcwBoAG8AdQBsAGQAQwBhAHMAdAAiADoAZgBhAGwAcwBlACwAIgBpAHMAVQBsAHQAIgA6AGYAYQBsAHMAZQB9ACwAewAiAGkAYwBvAG4AIgA6AHsAIgBzAHIAYwAiADoAIgAvAHMAdABhAHQAaQBjAC8AbQBlAGQAaQBhAC8ATgBhAHYAaQBnAGEAdABpAG8AbgAuAGEAMgBkADAAZQA4ADgANwAuAHMAdgBnACIALAAiAGEAbAB0ACIAOgAiACIAfQAsACIAbgBhAG0AZQAiADoAIgAiACwAIgBkAGUAcAB0AGgAIgA6ADAALAAiAGQAZQBzAGMAcgBpAHAAdABpAG8AbgAiADoAIgAiACwAIgBzAGgAbwB1AGwAZABDAGEAcwB0ACIAOgBmAGEAbABzAGUALAAiAGkAcwBVAGwAdAAiADoAZgBhAGwAcwBlAH0ALAB7ACIAaQBjAG8AbgAiADoAewAiAHMAcgBjACIAOgAiAC8AcwB0AGEAdABpAGMALwBtAGUAZABpAGEALwBOAGEAdgBpAGcAYQB0AGkAbwBuAC4AYQAyAGQAMABlADgAOAA3AC4AcwB2AGcAIgAsACIAYQBsAHQAIgA6ACIAIgB9ACwAIgBuAGEAbQBlACIAOgAiACIALAAiAGQAZQBwAHQAaAAiADoAMAAsACIAZABlAHMAYwByAGkAcAB0AGkAbwBuACIAOgAiACIALAAiAHMAaABvAHUAbABkAEMAYQBzAHQAIgA6AGYAYQBsAHMAZQAsACIAaQBzAFUAbAB0ACIAOgBmAGEAbABzAGUAfQAsAHsAIgBpAGMAbwBuACIAOgB7ACIAcwByAGMAIgA6ACIALwBzAHQAYQB0AGkAYwAvAG0AZQBkAGkAYQAvAE4AYQB2AGkAZwBhAHQAaQBvAG4ALgBhADIAZAAwAGUAOAA4ADcALgBzAHYAZwAiACwAIgBhAGwAdAAiADoAIgAiAH0ALAAiAG4AYQBtAGUAIgA6ACIAIgAsACIAZABlAHAAdABoACIAOgAwACwAIgBkAGUAcwBjAHIAaQBwAHQAaQBvAG4AIgA6ACIAIgAsACIAcwBoAG8AdQBsAGQAQwBhAHMAdAAiADoAZgBhAGwAcwBlACwAIgBpAHMAVQBsAHQAIgA6AGYAYQBsAHMAZQB9ACwAewAiAGkAYwBvAG4AIgA6AHsAIgBzAHIAYwAiADoAIgAvAHMAdABhAHQAaQBjAC8AbQBlAGQAaQBhAC8ATgBhAHYAaQBnAGEAdABpAG8AbgAuAGEAMgBkADAAZQA4ADgANwAuAHMAdgBnACIALAAiAGEAbAB0ACIAOgAiACIAfQAsACIAbgBhAG0AZQAiADoAIgAiACwAIgBkAGUAcAB0AGgAIgA6ADAALAAiAGQAZQBzAGMAcgBpAHAAdABpAG8AbgAiADoAIgAiACwAIgBzAGgAbwB1AGwAZABDAGEAcwB0ACIAOgBmAGEAbABzAGUALAAiAGkAcwBVAGwAdAAiADoAZgBhAGwAcwBlAH0ALAB7ACIAaQBjAG8AbgAiADoAewAiAHMAcgBjACIAOgAiAC8AcwB0AGEAdABpAGMALwBtAGUAZABpAGEALwBOAGEAdgBpAGcAYQB0AGkAbwBuAC4AYQAyAGQAMABlADgAOAA3AC4AcwB2AGcAIgAsACIAYQBsAHQAIgA6ACIAIgB9ACwAIgBuAGEAbQBlACIAOgAiANx6bjDjXSIALAAiAGQAZQBwAHQAaAAiADoAMAAsACIAZABlAHMAYwByAGkAcAB0AGkAbwBuACIAOgAiAEEAbwBFAAIw+04PYW4wk5UIVEQwazAgADYAAjDlTk2WATDqgauOTDCiMK8wtzDnMPMwWTCLMF8wczD7Tg9hbjCTlQhURDBrMCAAQQBvAEUAIABnMCAAMwAgAJIwDk5IMIswAjCNUX9PKHUNTu9TAjAiACwAIgBzAGgAbwB1AGwAZABDAGEAcwB0ACIAOgB0AHIAdQBlACwAIgBpAHMAVQBsAHQAIgA6AHQAcgB1AGUAfQAsAHsAIgBpAGMAbwBuACIAOgB7ACIAcwByAGMAIgA6ACIALwBzAHQAYQB0AGkAYwAvAG0AZQBkAGkAYQAvAE4AYQB2AGkAZwBhAHQAaQBvAG4ALgBhADIAZAAwAGUAOAA4ADcALgBzAHYAZwAiACwAIgBhAGwAdAAiADoAIgAiAH0ALAAiAG4AYQBtAGUAIgA6ACIAUoMpWW4wApgiACwAIgBkAGUAcAB0AGgAIgA6ADAALAAiAGQAZQBzAGMAcgBpAHAAdABpAG8AbgAiADoAIgDbmNR/VzABMCFrbjDqgauObjCiMK8wtzDnMPMwfjBnMOqBq45vMNlyjzCMMGowTzBqMIowIABBAG8ARQAgAGswgjCriD5fVzBqME8wajCLMAIwIWtuMOqBq45uMKIwrzC3MOcw8zBnMGhRZjBuMJOVCFREMGswIAA4ACAAkjAgAEEAbwBFACAAZzAOTkgwATD7Tg9hbjCTlQhURDBrMEB3MFdZMIswAjAiACwAIgBzAGgAbwB1AGwAZABDAGEAcwB0ACIAOgBmAGEAbABzAGUALAAiAGkAcwBVAGwAdAAiADoAdAByAHUAZQB9ACwAewAiAGkAYwBvAG4AIgA6AHsAIgBzAHIAYwAiADoAIgAvAHMAdABhAHQAaQBjAC8AbQBlAGQAaQBhAC8ATgBhAHYAaQBnAGEAdABpAG8AbgAuAGEAMgBkADAAZQA4ADgANwAuAHMAdgBnACIALAAiAGEAbAB0ACIAOgAiACIAfQAsACIAbgBhAG0AZQAiADoAIgDcemgwllm+fG4waXKeiiIALAAiAGQAZQBwAHQAaAAiADoAMAAsACIAZABlAHMAYwByAGkAcAB0AGkAbwBuACIAOgAiACFrbjDqgauObjCiMK8wtzDnMPMwi5XLWUJmfjBnMPh2S2JuMDtlg2RLMIkw11NRMIswcV//l5IwIXG5UhZTWTCLMAIwUzBuMLkwrTDrMEswDDAWTkx1OWpuMEmEoFENMG4wf08odYxfDDDcevKWbjCgUneLGv9zVLllaFHhVGswqFmzWxCAJ2DYTg5ODTBrMAlZFlNZMIswAjAiACwAIgBzAGgAbwB1AGwAZABDAGEAcwB0ACIAOgB0AHIAdQBlACwAIgBpAHMAVQBsAHQAIgA6AHQAcgB1AGUAfQBdAH0ALAAiAHMAdQBiAFcAZQBhAHAAbwBuACIAOgB7ACIAbgBhAG0AZQAiADoAIgDNa2owizAcWW4w7XdjUiIALAAiAHIAYQBuAGcAZQAiADoAIgDRj92N4pYiACwAIgBkAGUAcwBjAHIAaQBwAHQAaQBvAG4AIgA6ACIADDB6emVnXzCKMAEwHFlvMHUwUTABMNx6bzAgd4owATCWWb58bzC9gh91SDCSMNhfjDBfMAIwDTAiACwAIgBpAGMAbwBuACIAOgB7ACIAcwByAGMAIgA6ACIALwBzAHQAYQB0AGkAYwAvAG0AZQBkAGkAYQAvAE4AYQB2AGkAZwBhAHQAaQBvAG4ALgBhADIAZAAwAGUAOAA4ADcALgBzAHYAZwAiACwAIgBhAGwAdAAiADoAIgAiAH0ALAAiAGgAcAAiADoAMQAyACwAIgBzAGsAaQBsAGwATABpAHMAdAAiADoAWwB7ACIAaQBjAG8AbgAiADoAewAiAHMAcgBjACIAOgAiAC8AcwB0AGEAdABpAGMALwBtAGUAZABpAGEALwBOAGEAdgBpAGcAYQB0AGkAbwBuAC4AYQAyAGQAMABlADgAOAA3AC4AcwB2AGcAIgAsACIAYQBsAHQAIgA6ACIAIgB9ACwAIgBuAGEAbQBlACIAOgAiAH1eDmZuMANSIgAsACIAZABlAHAAdABoACIAOgAxACwAIgBkAGUAcwBjAHIAaQBwAHQAaQBvAG4AIgA6ACIANQACMLkwzTCiMLZyS2FuMPh2S2JrMG8wAVqbUisAMwACMCIALAAiAHMAaABvAHUAbABkAEMAYQBzAHQAIgA6AGYAYQBsAHMAZQAsACIAaQBzAFUAbAB0ACIAOgBmAGEAbABzAGUAfQAsAHsAIgBpAGMAbwBuACIAOgB7ACIAcwByAGMAIgA6ACIALwBzAHQAYQB0AGkAYwAvAG0AZQBkAGkAYQAvAE4AYQB2AGkAZwBhAHQAaQBvAG4ALgBhADIAZAAwAGUAOAA4ADcALgBzAHYAZwAiACwAIgBhAGwAdAAiADoAIgAiAH0ALAAiAG4AYQBtAGUAIgA6ACIA2Ge0aW4wHoIiACwAIgBkAGUAcAB0AGgAIgA6AC0AMgAsACIAZABlAHMAYwByAGkAcAB0AGkAbwBuACIAOgAiAEEAbwBFAAIwNgACMPh2S2JuMEKbRJuSMDAAazBXMF8wNFgIVAEw+3nVUlcwZjCNUXp21VJZMIswAjBhZ/ZOkjCAbl8wWTBQloowUzBuMLlSnGdvMCOQmn1ZMIswAjAiACwAIgBzAGgAbwB1AGwAZABDAGEAcwB0ACIAOgBmAGEAbABzAGUALAAiAGkAcwBVAGwAdAAiADoAZgBhAGwAcwBlAH0ALAB7ACIAaQBjAG8AbgAiADoAewAiAHMAcgBjACIAOgAiAC8AcwB0AGEAdABpAGMALwBtAGUAZABpAGEALwBOAGEAdgBpAGcAYQB0AGkAbwBuAC4AYQAyAGQAMABlADgAOAA3AC4AcwB2AGcAIgAsACIAYQBsAHQAIgA6ACIAIgB9ACwAIgBuAGEAbQBlACIAOgAiAIhs2Z5uMDNeIgAsACIAZABlAHAAdABoACIAOgAyACwAIgBkAGUAcwBjAHIAaQBwAHQAaQBvAG4AIgA6ACIAMwACMEEAbwBFAAIwuTDNMKIwAjAiACwAIgBzAGgAbwB1AGwAZABDAGEAcwB0ACIAOgBmAGEAbABzAGUALAAiAGkAcwBVAGwAdAAiADoAZgBhAGwAcwBlAH0ALAB7ACIAaQBjAG8AbgAiADoAewAiAHMAcgBjACIAOgAiAC8AcwB0AGEAdABpAGMALwBtAGUAZABpAGEALwBOAGEAdgBpAGcAYQB0AGkAbwBuAC4AYQAyAGQAMABlADgAOAA3AC4AcwB2AGcAIgAsACIAYQBsAHQAIgA6ACIAIgB9ACwAIgBuAGEAbQBlACIAOgAiAHFf1WwrXiIALAAiAGQAZQBwAHQAaAAiADoALQAyACwAIgBkAGUAcwBjAHIAaQBwAHQAaQBvAG4AIgA6ACIA+3nVUlcwZjC5MMYw6zC5MGswajCKMAEw+3nVUk1SbjCTlQhURDBrMMcwszCkMJIwLYpuf1kwizACMFhTFH1qMKgwzTDfMPwwbzDHMLMwpDCSMCxnaXJgMGgwjYpYi1cwATBdMEYwZzBqME8waDCCMGCQ3Y3iljtlg2RuMMFYaDBqMIswAjDHMLMwpDBvMCFrbjDqgauObjCiMK8wtzDnMPMwn1tMiEJmSzCriD5fQmZrMDR4ylhVMIwwizACMCIALAAiAHMAaABvAHUAbABkAEMAYQBzAHQAIgA6AGYAYQBsAHMAZQAsACIAaQBzAFUAbAB0ACIAOgBmAGEAbABzAGUAfQAsAHsAIgBpAGMAbwBuACIAOgB7ACIAcwByAGMAIgA6ACIALwBzAHQAYQB0AGkAYwAvAG0AZQBkAGkAYQAvAE4AYQB2AGkAZwBhAHQAaQBvAG4ALgBhADIAZAAwAGUAOAA4ADcALgBzAHYAZwAiACwAIgBhAGwAdAAiADoAIgAiAH0ALAAiAG4AYQBtAGUAIgA6ACIA6lEiACwAIgBkAGUAcAB0AGgAIgA6ADQALAAiAGQAZQBzAGMAcgBpAHAAdABpAG8AbgAiADoAIgCwioIwRDBqMEQwk5UIVEQwTDBCMIwwcDB6dtVS71P9gAIwXTBTMGsw7zD8MNcwWTCLMAIwIgAsACIAcwBoAG8AdQBsAGQAQwBhAHMAdAAiADoAdAByAHUAZQAsACIAaQBzAFUAbAB0ACIAOgBmAGEAbABzAGUAfQAsAHsAIgBpAGMAbwBuACIAOgB7ACIAcwByAGMAIgA6ACIALwBzAHQAYQB0AGkAYwAvAG0AZQBkAGkAYQAvAE4AYQB2AGkAZwBhAHQAaQBvAG4ALgBhADIAZAAwAGUAOAA4ADcALgBzAHYAZwAiACwAIgBhAGwAdAAiADoAIgAiAH0ALAAiAG4AYQBtAGUAIgA6ACIArE59aW4w+3mNMEQwIgAsACIAZABlAHAAdABoACIAOgAwACwAIgBkAGUAcwBjAHIAaQBwAHQAaQBvAG4AIgA6ACIANAACMN5Wf5ACMF8wYDBXMN5Wf5BZMIswaDDqgauOkjDOMMMwrzDQMMMwrzBVMFswizACMCIALAAiAHMAaABvAHUAbABkAEMAYQBzAHQAIgA6AGYAYQBsAHMAZQAsACIAaQBzAFUAbAB0ACIAOgBmAGEAbABzAGUAfQAsAHsAIgBpAGMAbwBuACIAOgB7ACIAcwByAGMAIgA6ACIALwBzAHQAYQB0AGkAYwAvAG0AZQBkAGkAYQAvAE4AYQB2AGkAZwBhAHQAaQBvAG4ALgBhADIAZAAwAGUAOAA4ADcALgBzAHYAZwAiACwAIgBhAGwAdAAiADoAIgAiAH0ALAAiAG4AYQBtAGUAIgA6ACIAHFluMFBbiTAiACwAIgBkAGUAcAB0AGgAIgA6ADAALAAiAGQAZQBzAGMAcgBpAHAAdABpAG8AbgAiADoAIgBzVLllaFHhVG4w8W2mXpIw/nMoVyRQbjANUGswWTCLMAj/Ck5QljQACf8CMCIALAAiAHMAaABvAHUAbABkAEMAYQBzAHQAIgA6AHQAcgB1AGUALAAiAGkAcwBVAGwAdAAiADoAZgBhAGwAcwBlAH0ALAB7ACIAaQBjAG8AbgAiADoAewAiAHMAcgBjACIAOgAiAC8AcwB0AGEAdABpAGMALwBtAGUAZABpAGEALwBOAGEAdgBpAGcAYQB0AGkAbwBuAC4AYQAyAGQAMABlADgAOAA3AC4AcwB2AGcAIgAsACIAYQBsAHQAIgA6ACIAIgB9ACwAIgBuAGEAbQBlACIAOgAiACIALAAiAGQAZQBwAHQAaAAiADoAMAAsACIAZABlAHMAYwByAGkAcAB0AGkAbwBuACIAOgAiACIALAAiAHMAaABvAHUAbABkAEMAYQBzAHQAIgA6AGYAYQBsAHMAZQAsACIAaQBzAFUAbAB0ACIAOgBmAGEAbABzAGUAfQAsAHsAIgBpAGMAbwBuACIAOgB7ACIAcwByAGMAIgA6ACIALwBzAHQAYQB0AGkAYwAvAG0AZQBkAGkAYQAvAE4AYQB2AGkAZwBhAHQAaQBvAG4ALgBhADIAZAAwAGUAOAA4ADcALgBzAHYAZwAiACwAIgBhAGwAdAAiADoAIgAiAH0ALAAiAG4AYQBtAGUAIgA6ACIAIgAsACIAZABlAHAAdABoACIAOgAwACwAIgBkAGUAcwBjAHIAaQBwAHQAaQBvAG4AIgA6ACIAIgAsACIAcwBoAG8AdQBsAGQAQwBhAHMAdAAiADoAZgBhAGwAcwBlACwAIgBpAHMAVQBsAHQAIgA6AGYAYQBsAHMAZQB9ACwAewAiAGkAYwBvAG4AIgA6AHsAIgBzAHIAYwAiADoAIgAvAHMAdABhAHQAaQBjAC8AbQBlAGQAaQBhAC8ATgBhAHYAaQBnAGEAdABpAG8AbgAuAGEAMgBkADAAZQA4ADgANwAuAHMAdgBnACIALAAiAGEAbAB0ACIAOgAiACIAfQAsACIAbgBhAG0AZQAiADoAIgAiACwAIgBkAGUAcAB0AGgAIgA6ADAALAAiAGQAZQBzAGMAcgBpAHAAdABpAG8AbgAiADoAIgAiACwAIgBzAGgAbwB1AGwAZABDAGEAcwB0ACIAOgBmAGEAbABzAGUALAAiAGkAcwBVAGwAdAAiADoAZgBhAGwAcwBlAH0ALAB7ACIAaQBjAG8AbgAiADoAewAiAHMAcgBjACIAOgAiAC8AcwB0AGEAdABpAGMALwBtAGUAZABpAGEALwBOAGEAdgBpAGcAYQB0AGkAbwBuAC4AYQAyAGQAMABlADgAOAA3AC4AcwB2AGcAIgAsACIAYQBsAHQAIgA6ACIAIgB9ACwAIgBuAGEAbQBlACIAOgAiAINetVsnWa5mIgAsACIAZABlAHAAdABoACIAOgAwACwAIgBkAGUAcwBjAHIAaQBwAHQAaQBvAG4AIgA6ACIA+04PYW4wk5UIVEQwazBEMIswdWVrMCAANgAsACAANAAsACAAMgAgAJIwDk5IMGYwAGeMX2swDk5IMF8wdWVuMJOVCFREMGsw7zD8MNcwVzC5MMYw6zC5MGswajCLMAIwDFRYMHVlkjD+W2GMazDWU2MwZjCCMIgwRDACMCIALAAiAHMAaABvAHUAbABkAEMAYQBzAHQAIgA6AHQAcgB1AGUALAAiAGkAcwBVAGwAdAAiADoAdAByAHUAZQB9ACwAewAiAGkAYwBvAG4AIgA6AHsAIgBzAHIAYwAiADoAIgAvAHMAdABhAHQAaQBjAC8AbQBlAGQAaQBhAC8ATgBhAHYAaQBnAGEAdABpAG8AbgAuAGEAMgBkADAAZQA4ADgANwAuAHMAdgBnACIALAAiAGEAbAB0ACIAOgAiACIAfQAsACIAbgBhAG0AZQAiADoAIgCNURRvIgAsACIAZABlAHAAdABoACIAOgAwACwAIgBkAGUAcwBjAHIAaQBwAHQAaQBvAG4AIgA6ACIA6oGrjkwwojCvMLcw5zDzMGcwGpA4XrkwrTDrMJIwf08odVcwXzBoME0wATBdMG4wuTCtMOswbjDxbaZeopUjkOVOFlluMLlSnGeSMCFqI1BXMGYwc1OnXmswUzBuMLkwrTDrMJIwf08odVcwZjCCMIgwRDACMF8wYDBXMPFtpl5MMN4wpDDKMLkwazAtippbVTCMMGYwRDCLMLkwrTDrMG8wIWojUGcwTTBqMEQwAjAiACwAIgBzAGgAbwB1AGwAZABDAGEAcwB0ACIAOgBmAGEAbABzAGUALAAiAGkAcwBVAGwAdAAiADoAZgBhAGwAcwBlAH0ALAB7ACIAaQBjAG8AbgAiADoAewAiAHMAcgBjACIAOgAiAC8AcwB0AGEAdABpAGMALwBtAGUAZABpAGEALwBOAGEAdgBpAGcAYQB0AGkAbwBuAC4AYQAyAGQAMABlADgAOAA3AC4AcwB2AGcAIgAsACIAYQBsAHQAIgA6ACIAIgB9ACwAIgBuAGEAbQBlACIAOgAiAHp6ZWdfMIowIgAsACIAZABlAHAAdABoACIAOgAwACwAIgBkAGUAcwBjAHIAaQBwAHQAaQBvAG4AIgA6ACIAIgAsACIAcwBoAG8AdQBsAGQAQwBhAHMAdAAiADoAZgBhAGwAcwBlACwAIgBpAHMAVQBsAHQAIgA6AGYAYQBsAHMAZQB9AF0AfQAsACIAYQBiAGkAbABpAHQAaQBlAHMAIgA6AFsAewAiAG4AYQBtAGUAIgA6ACIAaFYodSIALAAiAGQAZQBzAGMAcgBpAHAAdABpAG8AbgAiADoAIgAHY0hRZzBMiEYw1VJcT24wvnz7fVUwkjA6eVkwgGL9gCIALAAiAGkAYwBvAG4AIgA6AHsAIgBhAGwAdAAiADoAIgAiAH0ALAAiAHMAdQBjAGMAZQBzAHMAUgBhAHQAZQAiADoANAAuADMAfQAsAHsAIgBuAGEAbQBlACIAOgAiABRvgGIiACwAIgBkAGUAcwBjAHIAaQBwAHQAaQBvAG4AIgA6ACIAGFaSMP6YizBTMGgwazCCMCh1RDBmMIIwiDBEMEwwATAQYp9Sh3NMME5PTzBqMIswSzCCMFcwjDBqMEQwIgAsACIAaQBjAG8AbgAiADoAewAiAHMAcgBjACIAOgAiAC8AcwB0AGEAdABpAGMALwBtAGUAZABpAGEALwBBAGMAdABpAG4AZwAuADYAMQA0AGUANgA5ADkAMgAuAHMAdgBnACIALAAiAGEAbAB0ACIAOgAiACIAfQAsACIAcwB1AGMAYwBlAHMAcwBSAGEAdABlACIAOgA2AC4AMwB9ACwAewAiAG4AYQBtAGUAIgA6ACIAv4pZZSIALAAiAGQAZQBzAGMAcgBpAHAAdABpAG8AbgAiADoAIgB0WbeWkjCTXwaYazBVMFswizCAYv2AIgAsACIAaQBjAG8AbgAiADoAewAiAHMAcgBjACIAOgAiAC8AcwB0AGEAdABpAGMALwBtAGUAZABpAGEALwBUAHIAYQBpAG4AaQBuAGcALgAwADgANwBkAGQANAA4ADcALgBzAHYAZwAiACwAIgBhAGwAdAAiADoAIgAiAH0ALAAiAHMAdQBjAGMAZQBzAHMAUgBhAHQAZQAiADoANAAuADMAfQAsAHsAIgBuAGEAbQBlACIAOgAiAB9USpAiACwAIgBkAGUAcwBjAHIAaQBwAHQAaQBvAG4AIgA6ACIAGoFyglcwZjBgioAwgGL9gCIALAAiAGkAYwBvAG4AIgA6AHsAIgBzAHIAYwAiADoAIgAvAHMAdABhAHQAaQBjAC8AbQBlAGQAaQBhAC8AQgBpAHIAZAAuADQAOQA1ADEANgA1AGQAMgAuAHMAdgBnACIALAAiAGEAbAB0ACIAOgAiACIAfQAsACIAcwB1AGMAYwBlAHMAcwBSAGEAdABlACIAOgA2AC4AMwB9ACwAewAiAG4AYQBtAGUAIgA6ACIA5FPjTuV3WIsiACwAIgBkAGUAcwBjAHIAaQBwAHQAaQBvAG4AIgA6ACIA5FPjTodlV1tuMOOJrYqEMGGMtF+Edmow5FPjTnqQ4Y1uMCRSJVIiACwAIgBpAGMAbwBuACIAOgB7ACIAcwByAGMAIgA6ACIALwBzAHQAYQB0AGkAYwAvAG0AZQBkAGkAYQAvAEEAbgBjAGkAZQBuAHQASwBuAG8AdwBsAGUAZABnAGUALgBhAGYAMwBmAGMAMgA3ADcALgBzAHYAZwAiACwAIgBhAGwAdAAiADoAIgAiAH0ALAAiAHMAdQBjAGMAZQBzAHMAUgBhAHQAZQAiADoAMwAuADYAOQA5ADkAOQA5ADkAOQA5ADkAOQA5ADkAOQA5ADcAfQBdAH0A',
              )
            }
          >
            読込
          </ButtonBase>
        </LoadButton>
        <CopyToClipboard
          text={handleClickToSave()}
          onCopy={() => alert('data is saved!')}
        >
          <CopyButtonWrapper>
            <ButtonBase>保存</ButtonBase>
          </CopyButtonWrapper>
        </CopyToClipboard>
      </CopyWrapper>
      <Name>{name}</Name>
      <HeadWrapper>
        <ToggleWrapper>
          <ToggleButton
            {...AdventureToggle}
            onClick={toggleAdventureMode}
            isReversed={isAdventureMode}
          />
        </ToggleWrapper>
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
      </HeadWrapper>
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
            <ButtonBase onClick={handleClickToUse} accent={hasEditError}>
              使用
            </ButtonBase>
          </ActionButton>
        )}
      </ButtonsWrapper>
    </CharacterSheetWrapper>
  )
}

/**
 * css
 */
const CharacterSheetWrapper = styled.div`
  max-width: 90%;
  min-width: 60%;
  min-height: 84vh;
  margin: 0 auto;
  width: 100%;
`
const Name = styled.h1`
  margin-bottom: ${space.l};
`
const HeadWrapper = styled.div`
  display: flex;
  column-gap: ${space.xl};
  margin: 0 auto;
  width: fit-content;
  align-items: center;

  @media screen and (max-width: 35rem) {
    display: block;
  }
`
const ToggleWrapper = styled.div`
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
  column-gap: ${space.m};
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
const CopyWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: ${space.xs};
`
const LoadButton = styled.div``
const CopyButtonWrapper = styled.div``
