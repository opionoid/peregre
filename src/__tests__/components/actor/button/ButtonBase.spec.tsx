import { ButtonBase } from 'src/components/actor/button/ButtonBase';
import MOCK_BUTTON_BASE_PROPS from 'src/__mocks__/components/actor/button/ButtonBase';
import { render } from '@testing-library/react';

describe('actor/button', () => {
  const snapshot = render(<ButtonBase {...MOCK_BUTTON_BASE_PROPS}/>);

  it('default test', () => {
    expect(snapshot.baseElement).toMatchSnapshot();
  });
});
