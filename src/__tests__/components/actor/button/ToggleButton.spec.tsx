import React from 'react';
import { ToggleButton } from 'src/components/actor/button/ToggleButton';
import MOCK_TOGGLE_BUTTON_PROPS from 'src/__mocks__/components/actor/button/ToggleButton';
import { render } from '@testing-library/react';

describe('actor/button', () => {
  const snapshot = render(<ToggleButton {...MOCK_TOGGLE_BUTTON_PROPS}/>);

  it('default test', () => {
    expect(snapshot.baseElement).toMatchSnapshot();
  });
});
