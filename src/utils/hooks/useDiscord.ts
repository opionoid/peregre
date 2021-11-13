import axios from "axios"
import { useRecoilValue } from 'recoil'
import { configDiscordWebhookUrl } from 'src/data/atom'

export const useDiscord = () => {
  const webhookUrl = useRecoilValue(configDiscordWebhookUrl)

  const sendMessage = (message: string, sender = 'システムメッセージ') => {
    if (webhookUrl === '') return

    const messageData = {
      username: sender,
      content: message
    };
    const data = JSON.stringify(messageData);

    axios({
      method: "POST",
      url: webhookUrl,
      data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  return {
    sendMessage
  }
}
