
import React from 'react'
import styled from 'styled-components'

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
 * - 最後に、キャラクターの名前を入力してください
 *   - input...
 *   - サインするようなアニメーション
 */
export const CharacterMaking: React.VFC<ICharacterMakingProps> = () => {
  return (
    <CharacterMakingWrapper>
    </CharacterMakingWrapper>
  )
}

const CharacterMakingWrapper = styled
