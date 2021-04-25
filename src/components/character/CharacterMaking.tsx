
import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import styled from 'styled-components'
import { INITIAL_WEAPON } from '~/constants'
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
  const weaponsData = useRecoilValue(allWeaponListAtom)
  const weaponsTable: IWeapon[] = [...Array(4)].map((_, i) => {
    const dirtyData = weaponsData[randomizeXorShift(seed + i) % weaponsData.length]
    return {
      name: dirtyData.name,
      range: dirtyData.range,
      description: dirtyData.description,
      icon: {
        src: '',
        alt: ''
      },
      hp: parseInt(dirtyData.hp),
      skillList: dirtyData.skills.map(skill => ({
        name: skill.name || '',
        depth: parseInt(skill.depth) || 0,
        description: skill.description || '',
        shouldCast: skill.shouldCast === 'TRUE',
        isUlt: skill.isUlt === 'TRUE'
      }))
    }
  })

  // アビリティテーブル作成
  const abilitiesData = useRecoilValue(allAbilityListAtom)
  const abilitiesTable: IAbility[] = [...Array(10)].map((_, i) => {
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

  /**
   * 各質問に応じた制御
   */
  const [currentStepIndex, setCurrentStepIndex] = React.useState<number>(0)
  const [currentAbilityStep, setCurrentAbilityStep] = React.useState<number>(0)

  // 2pick用タプル
  const choiceItems: [IAbility, IAbility][] | [IWeapon, IWeapon][] = React.useMemo(() => {
    switch (STEPS[currentStepIndex]) {
      case ('weaponMain'):
        return [[weaponsTable[0], weaponsTable[1]]]
      case ('weaponSub'):
        return [[weaponsTable[2], weaponsTable[3]]]
      case ('ability'):
        return [...Array(5)].map((_, i) => [abilitiesTable[i * 2], abilitiesTable[i * 2 + 1]])
      default:
        return [[INITIAL_WEAPON, INITIAL_WEAPON]]
    }
  }, [currentStepIndex, currentAbilityStep])

  const [isFirstIndex, setIsFirstIndex] = React.useState<boolean>(true)
  const handleChoice = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsFirstIndex(e.currentTarget.value === "first")
  }

  const setMainWeapon = useSetRecoilState(mainWeaponAtom)
  const setSubWeapon = useSetRecoilState(subWeaponAtom)
  const setAbilities = useSetRecoilState(abilityListAtom)
  const setName = useSetRecoilState(nameAtom)

  const handleClickToNextStep = () => {
    switch (STEPS[currentStepIndex]) {
      case ('weaponMain'):
        setMainWeapon(weaponsTable[isFirstIndex ? 0 : 1])
        setCurrentStepIndex(prev => prev + 1)
        return
      case ('weaponSub'):
        setSubWeapon(weaponsTable[isFirstIndex ? 3 : 4])
        setCurrentStepIndex(prev => prev + 1)
        return
      // アビリティは5回選択する必要がある
      case ('ability'):
        if (currentAbilityStep === 0) {
          setAbilities([abilitiesTable[isFirstIndex ? 0 : 1]]) // 1回目のみアビリティリストを選択したアビリティで初期化
          setCurrentAbilityStep(prev => prev + 1)
        } else if (currentAbilityStep === 4) {
          setAbilities(prev => [...prev, abilitiesTable[isFirstIndex ? currentAbilityStep * 2 : currentAbilityStep * 2 + 1]])
          setCurrentAbilityStep(0) // 意図しない参照バグを防止
          setCurrentStepIndex(prev => prev + 1) // 5回目のみ次のステップ（名前入力）へ移行
        } else {
          setAbilities(prev => [...prev, abilitiesTable[isFirstIndex ? currentAbilityStep * 2 : currentAbilityStep * 2 + 1]])
          setCurrentAbilityStep(prev => prev + 1)
        }
        return
      case ('name'):
        setName('たなかたろう')
        // TODO go to character sheet
        return
    }
  }

  const buttonLabel = currentStepIndex === STEPS.length - 1 ? WORDS.button.finish : WORDS.button.next

  return (
    <CharacterMakingWrapper>
      <QuestionHeading>{WORDS.question[STEPS[currentStepIndex]]}</QuestionHeading>
      {STEPS[currentStepIndex] !== 'name' &&
        <ChoiceCardArea>
          <ChoiceCard>
            <ButtonBase onClick={handleChoice} value={choiceItems[currentAbilityStep][0]}>
              {choiceItems[currentAbilityStep][0].name} : {currentAbilityStep}
            </ButtonBase>
          </ChoiceCard>
          <ChoiceCard>
            <ButtonBase onClick={handleChoice} value={choiceItems[currentAbilityStep][1]}>
              {choiceItems[currentAbilityStep][1].name}
            </ButtonBase>
          </ChoiceCard>
        </ChoiceCardArea>
      }
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