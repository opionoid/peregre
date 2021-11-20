import { StoryArticle } from 'src/components/stories/StoryArticle';
import MOCK_STORY_ARTICLE_PROPS from 'src/__mocks__/components/stories/StoryArticle';
import { render } from '@testing-library/react';

describe('stories', () => {
  const snapshot = render(<StoryArticle {...MOCK_STORY_ARTICLE_PROPS} />);

  it('default test', () => {
    expect(snapshot.baseElement).toMatchSnapshot();
  });
});
