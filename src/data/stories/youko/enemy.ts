import { IStoryNpcProps } from "src/components/stories/StoryNpc";

export const crumblyBeast: IStoryNpcProps = {
  name: '崩れかけた獣',
  hp: 20,
  skills: [
    {
      name: '崩壊',
      depth: 0,
      description: '[常時] ターン終了時、このキャラクターは4を受ける。',
      shouldCast: false
    },
    {
      name: '惨殺',
      depth: -4,
      description: '6。相手にダメージが通ったとき、さらに 4 を与える。',
      shouldCast: false
    },
    {
      name: '強襲',
      depth: 1,
      description: '[先制] 移動して 2 を与える。',
      shouldCast: false
    },
    {
      name: '噛み砕き',
      depth: 1,
      description: '3',
      shouldCast: false
    },
  ]
}