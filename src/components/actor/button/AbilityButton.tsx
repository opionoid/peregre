import React from 'react'
import styled from 'styled-components'
import { space } from 'src/assets/style'
import { IRollResult, ROLL_RESULT } from 'src/constants'
import { IAbility } from 'src/interfaces'
import { rollDice10 } from 'src/utils/Math'
import { ButtonBase } from './ButtonBase'

export interface IAbilityButtonProps {
  ability: IAbility;
}

// dummy function
const sendMessageToDiscord = (type: string, message: string) => {
  console.log(type)
  console.log(message)
  return
}

export const AbilityButton: React.VFC<IAbilityButtonProps> = ({ ability }) => {
  const handleClick = () => {
    if (ability == null) return

    const diceNumber = rollDice10()
    const rollResult: IRollResult = (() => {
      if (diceNumber === 1) return ROLL_RESULT.CRITICAL
      else if (diceNumber === 10) return ROLL_RESULT.FUMBLE
      else if (diceNumber < 3 * ability.level) return ROLL_RESULT.SUCCESS
      else return ROLL_RESULT.FAILURE
    })()
    const message = `${ability.name}: ${diceNumber}${rollResult}`
    sendMessageToDiscord('ability', message)
  }

  return (
    <AbilityButtonWrapper>
      {/** TODO: 文言組み込み */}
      <ButtonBase onClick={handleClick} unset={ability.name === '未設定'}>
        {/** TODO: NO_IMAGE */}
        <Icon {...ability.icon} />
        <Label>{ability.name}</Label>
      </ButtonBase>
    </AbilityButtonWrapper>
  )
}

const AbilityButtonWrapper = styled.div`
  width: 120px;
  height: 120px;
`

const Icon = styled.img`
  padding: ${space.xxs};
`

const Label = styled.p`
`