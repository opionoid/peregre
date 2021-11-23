import { useRecoilValue } from "recoil"
import { configShouldCopyTextOnClick } from "src/data/atom"
import { ISkill } from "src/interfaces"
import { useDiscord } from "./useDiscord"

export const useBattle = () => {
  const shouldCopy = useRecoilValue(configShouldCopyTextOnClick)
  const { sendMessage } = useDiscord()

  const onClickSkill = (skill: ISkill, setDepth: (value: React.SetStateAction<0 | 3 | 2 | 1 | 4>) => void, sender: string) => {
    setDepth(prev => Math.min(prev + skill.depth, 4) as typeof prev)

    const message = `${skill.name} - ${skill.shouldCast ? '詠唱中 - ' : ''}${skill.description}`
    if (shouldCopy) navigator.clipboard.writeText(message)
    sendMessage(message, sender)
  }

  return {
    onClickSkill
  }
}
