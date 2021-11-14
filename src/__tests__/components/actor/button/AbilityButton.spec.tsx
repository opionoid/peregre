import { AbilityButton } from 'src/components/actor/button/AbilityButton';
import MOCK_ABILITY_BUTTON_PROPS from 'src/__mocks__/components/actor/button/AbilityButton';
import { render } from '@testing-library/react';
jest.mock('src/components/actor/button/AbilityButton')

describe('actor/button', () => {
  const snapshot = render(<AbilityButton {...MOCK_ABILITY_BUTTON_PROPS} />);

  it('default test', () => {
    expect(snapshot.baseElement).toMatchSnapshot();
  });
});
