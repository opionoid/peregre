import React from 'react';
import { StoryListItem } from 'src/components/stories/molecules/StoryListItem';
import MOCK_STORY_LIST_ITEM_PROPS from 'src/__mocks__/components/stories/molecules/StoryListItem';
import { render } from '@testing-library/react';

describe('stories/molecules', () => {
  const snapshot = render(<StoryListItem {...MOCK_STORY_LIST_ITEM_PROPS}/>);

  it('default test', () => {
    expect(snapshot.baseElement).toMatchSnapshot();
  });
});
