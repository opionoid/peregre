import { ISkill } from "src/interfaces"
import { useDiscord } from "./useDiscord"

const { sendMessage } = useDiscord()

export const useBattle = () => {
  const onClickSkill = (currentSkill: ISkill, setDepth: (value: React.SetStateAction<0 | 3 | 2 | 1 | 4>) => void, sender: string) => {
    setDepth(prev => Math.min(prev + currentSkill.depth, 4) as typeof prev)
    sendMessage(`${currentSkill.name} - ${currentSkill.shouldCast && '詠唱中 - '}${currentSkill.description}`, sender)
  }

  return {
    onClickSkill
  }
}
