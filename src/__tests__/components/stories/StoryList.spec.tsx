import React from 'react';
import { StoryList } from 'src/components/stories/StoryList';
import MOCK_STORY_LIST_PROPS from 'src/__mocks__/components/stories/StoryList';
import { render } from '@testing-library/react';

describe('stories', () => {
  const snapshot = render(<StoryList {...MOCK_STORY_LIST_PROPS}/>);

  it('default test', () => {
    expect(snapshot.baseElement).toMatchSnapshot();
  });
});
