import { rollDice10 } from 'src/utils/Math'
import { IRollResult, ROLL_RESULT } from 'src/constants'
import { IAbility } from 'src/interfaces'
import { useDiscord } from './useDiscord'
import { configShouldCopyTextOnClick } from 'src/data/atom'
import { useRecoilValue } from 'recoil'

export const useAdventure = () => {
  const shouldCopy = useRecoilValue(configShouldCopyTextOnClick)
  const { sendMessage } = useDiscord()

  const onClickAbility = (ability: IAbility, sender: string) => {
    const diceNumber = rollDice10()
    const rollResult: IRollResult = (() => {
      if (diceNumber === 1) return ROLL_RESULT.CRITICAL
      else if (diceNumber === 10) return ROLL_RESULT.FUMBLE
      else if (diceNumber < ability.successRate)
        return ROLL_RESULT.SUCCESS
      else return ROLL_RESULT.FAILURE
    })()

    const message = `${ability.name} ${rollResult} - ${ability.description}`
    if (shouldCopy) navigator.clipboard.writeText(message)
    sendMessage(message, sender)
  }

  return {
    onClickAbility
  }
}