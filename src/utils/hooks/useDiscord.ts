import axios from "axios"
import { useRecoilValue } from 'recoil'
import { configDiscordWebhookUrl } from 'src/data/atom'

export const useDiscord = () => {
  const webhookUrl = useRecoilValue(configDiscordWebhookUrl)

  const sendMessage = (message: string, sender = 'システムメッセージ') => {
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

/*
TODO:
元の読みにくいコード、generateMessage, sendMessage に分離して後者のみ Discord.ts で扱う
export function sendAttackMessage(skill, isCritical: boolean, damage: number) {
  const WEBHOOK_URL =
    "https://discordapp.com/api/webhooks/659659187189710858/mQWl7Qkj7HCnhPDYT1YqhnC8KgQMcfgO9FWi4o0cR2cpr88UUXOyhms0DIbcXlw4hYpM";

  // 0, undefined, null のときはダメージを非表示にします
  let content: string;
  if (damage) {
    content = isCritical
      ? `${skill.name}\r${skill.description}\rクリティカル！${damage}ダメージ`
      : `${skill.name}\r${skill.description}\r${damage}ダメージ`;
  } else {
    content = `${skill.name}\r${skill.description}`;
  }

  const message = {
    username: "システムメッセージ",
    content: `${content}`
  };
  const messageJson = JSON.stringify(message);

  axios({
    method: "POST",
    url: WEBHOOK_URL,
    data: messageJson,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
*/
