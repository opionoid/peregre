import React, { SetStateAction } from 'react'
import styled from 'styled-components'
import { space } from '~/assets/style'
import { INITIAL_ABILITY, IRollResult, ROLL_RESULT } from '~/constants'
import { IAbility } from '~/interfaces'
import { rollDice10 } from '~/utils/Math'
import { ButtonBase } from './ButtonBase'

export interface IAbilityButtonProps {
  isEditMode?: boolean;
}

// dummy function
const openEditModal = (type: string, setFunction: React.Dispatch<SetStateAction<any>>) => {
  // openModal
  const dummyAbility: IAbility = {
    name: 'dummy',
    icon: {
      src: '',
      alt: ''
    },
    description: 'this is debug data',
    level: 2
  }
  switch (type) {
    case ('ability'):
      setFunction(dummyAbility)
      break
    default:
      console.log('err: set nothing')
  }
}

// dummy function
const sendMessageToDiscord = (type: string, message: string) => {
  console.log(type)
  console.log(message)
  return
}

export const AbilityButton: React.VFC<IAbilityButtonProps> = ({ isEditMode }) => {
  const [ability, setAbility] = React.useState<IAbility>(INITIAL_ABILITY)

  const handleClick = () => isEditMode ? handleClickForEditing : handleClickForUsingSkill

  const handleClickForEditing = () => {
    openEditModal('ability', setAbility)
  }

  const handleClickForUsingSkill = () => {
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
      <ButtonBase isEditMode={isEditMode} onClick={handleClick} unset={ability.name === '未設定'}>
        {/** TODO: NO_IMAGE */}
        <Icon {...ability?.icon || INITIAL_ABILITY.icon} />
        <Label>{ability?.name || INITIAL_ABILITY.name}</Label>
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