
import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import styled from 'styled-components'
import { INITIAL_ABILITY, INITIAL_WEAPON } from '~/constants'
import { abilityListAtom, allAbilityListAtom, allWeaponListAtom, mainWeaponAtom, nameAtom, subWeaponAtom } from '~/data/atom'
import { IAbility, IWeapon } from '~/interfaces'
import { randomizeXorShift } from '~/utils/Math'
import { ButtonBase } from '../actor/button/ButtonBase'

export interface ICharacterMakingProps {}

/**
 * 質問事項
 * - ストーリーで決められた事項について質問です。
 * 1. 武器の数は？
 *   -（ロール中のアニメーション画面: ガチャ画面的なの）
 *   - 2pick方式で武器の数だけ選ぶ
 * 2. 総合レベルは？
 *   -（ロール中のアニメーション画面: ガチャ画面的なの）
 *   - 2pick方式で5回選ぶ
 * - 最後に、キャラクターの名前を入力してください。
 *   - input...
 *   - サインするようなアニメーション
 */

// 余裕があったらここも csv -> json にまとめたほうがいい
const WORDS = {
  question: {
    weaponMain: 'メイン武器を選んでください',
    weaponSub: 'サブ武器を選んでください',
    ability: 'アビリティを選んでください',
    name: '最後に、キャラクターの名前を入力してください。'
  },
  button: {
    next: '次へ',
    back: '戻る',
    finish: '完成！'
  },
  cancel: {
    annotation: 'キャラクター作成を中断しても、24時間は同じ武器／アビリティ構成で作成が再開されます。中断しますか？'
  }
} as const

const STEPS = ['weaponMain', 'weaponSub', 'ability', 'name'] as const

export const CharacterMaking: React.VFC<ICharacterMakingProps> = () => {
  /**
   * シード
   */
  const seed = /** TODO */1111

  // 武器テーブル作成
  const [weaponsTable, setWeaponsTable] = React.useState<IWeapon[]>([INITIAL_WEAPON]);
  const weaponsData = useRecoilValue(allWeaponListAtom)
  const weapons: IWeapon[] = [...Array(4)].map((_, i) => {
    const dirtyData = weaponsData[randomizeXorShift(seed + i) % weaponsData.length]
    return {
      name: dirtyData.name,
      range: dirtyData.range,
      description: dirtyData.description,
      //icon: dirtyData.icon? || ''
      icon: {
        src: '',
        alt: ''
      },
      hp: parseInt(dirtyData.hp),
      skillList: dirtyData.skills.map(skill => ({
        name: skill.name,
        depth: parseInt(skill.depth),
        description: skill.description,
        shouldCast: skill.shouldCast === 'TRUE',
        isUlt: skill.isUlt === 'TRUE'
      }))
    }
  })
  setWeaponsTable(weapons)

  // アビリティテーブル作成
  const [abilitiesTable, setAbilitiesTable] = React.useState<IAbility[]>([INITIAL_ABILITY]);
  const abilitiesData = useRecoilValue(allAbilityListAtom)
  const abilities: IAbility[] = [...Array(10)].map((_, i) => {
    const dirtyData = abilitiesData[randomizeXorShift(seed + i) % abilitiesData.length]
    return {
      name: dirtyData.name,
      description: dirtyData.description,
      icon: {
        src: dirtyData.icon,
        alt: "" // nameと同じなのでからっぽ
      },
      level: randomizeXorShift(seed + i) % 3 + 1
    }
  })
  setAbilitiesTable(abilities)

  const [currentStepIndex, setCurrentStepIndex] = React.useState<number>(0)
  //const [selectedAbility, setSelectedAbility] = React.useState<IAbility | never[]>([])

  const handleChoice = (e: React.MouseEvent<HTMLButtonElement>) => {
    switch (STEPS[currentStepIndex]) {
      case ('weaponMain'):
        const setMainWeapon = useSetRecoilState(mainWeaponAtom)
        e.currentTarget.value === "first" ? setMainWeapon(weaponsTable[0]) : setMainWeapon(weaponsTable[1])
        return
      case ('weaponSub'):
        const setSubWeapon = useSetRecoilState(subWeaponAtom)
        e.currentTarget.value === "first" ? setSubWeapon(weaponsTable[3]) : setSubWeapon(weaponsTable[4])
        return
      case ('ability'):
        // TODO
        return
    }
  }

  const handleClickToNextStep = () => {
    if (currentStepIndex === STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1)
      return
    }

    // TODO go to character sheet
  }

  const buttonLabel = currentStepIndex === STEPS.length - 1 ? WORDS.button.finish : WORDS.button.next

  return (
    <CharacterMakingWrapper>
      <QuestionHeading>{WORDS.question[STEPS[currentStepIndex]]}</QuestionHeading>
      <ChoiceCardArea>
        <ChoiceCard>
          <ButtonBase onClick={handleChoice} value="first"></ButtonBase>
        </ChoiceCard>
        <ChoiceCard>
          <ButtonBase onClick={handleChoice} value="second"></ButtonBase>
        </ChoiceCard>
      </ChoiceCardArea>
      <ChoiceDescription></ChoiceDescription>
      <ButtonBase onClick={handleClickToNextStep}>{buttonLabel}</ButtonBase>
      {/** TODO 戻るボタン */}
      {/** TODO 中断ボタン */}
    </CharacterMakingWrapper>
  )
}

const CharacterMakingWrapper = styled.div``
const QuestionHeading = styled.p``
const ChoiceCardArea = styled.div``
// ページ固有のコンポーネントなので現状は切り出していない
const ChoiceCard = styled.div``
const ChoiceDescription = styled.p``