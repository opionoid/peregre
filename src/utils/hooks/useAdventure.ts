import { rollDice10 } from 'src/utils/Math'
import { IRollResult, ROLL_RESULT } from 'src/constants'
import { IAbility } from 'src/interfaces'
import { useDiscord } from './useDiscord'

export const useAdventure = () => {
  const { sendMessage } = useDiscord()
  const onClickAbility = (currentAbility: IAbility, sender: string) => {
    const diceNumber = rollDice10()
    const rollResult: IRollResult = (() => {
      if (diceNumber === 1) return ROLL_RESULT.CRITICAL
      else if (diceNumber === 10) return ROLL_RESULT.FUMBLE
      else if (diceNumber < currentAbility.successRate)
        return ROLL_RESULT.SUCCESS
      else return ROLL_RESULT.FAILURE
    })()
    sendMessage(`${currentAbility.name} ${rollResult} - ${currentAbility.description}`, sender)
  }

  return {
    onClickAbility
  }
}