import React from 'react';
import { CharacterSheet } from 'src/components/character/CharacterSheet';
import MOCK_CHARACTER_SHEET_PROPS from 'src/__mocks__/components/character/CharacterSheet';
import { render } from '@testing-library/react';

describe('character', () => {
  const snapshot = render(<CharacterSheet {...MOCK_CHARACTER_SHEET_PROPS}/>);

  it('default test', () => {
    expect(snapshot.baseElement).toMatchSnapshot();
  });
});
