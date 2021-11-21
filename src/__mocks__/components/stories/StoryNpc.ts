import { IStoryNpcProps } from 'src/components/stories/StoryNpc';

const MOCK_STORY_NPC_PROPS: IStoryNpcProps = {
  name: '敵の名前',
  hp: 10,
  skills: [{
    name: 'なんか長そうな名前です',
    description: 'このスキルを使用したとき何かを発動する。何かを発動して敵が何かの状態であれば、何かの追加効果を発生させる。',
    shouldCast: false,
    depth: 0,
  }]
};

export default MOCK_STORY_NPC_PROPS;
