import { StoryNpc } from 'src/components/stories/StoryNpc';
import MOCK_STORY_NPC_PROPS from 'src/__mocks__/components/stories/StoryNpc';
import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

describe('stories', () => {
  const snapshot = render(<RecoilRoot><StoryNpc {...MOCK_STORY_NPC_PROPS} /></RecoilRoot>);

  it('default test', () => {
    expect(snapshot.baseElement).toMatchSnapshot();
  });
});
