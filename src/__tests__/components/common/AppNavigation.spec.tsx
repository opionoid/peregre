import React from 'react';
import { AppNavigation } from 'src/components/common/AppNavigation';
import MOCK_APP_NAVIGATION_PROPS from 'src/__mocks__/components/common/AppNavigation';
import { render } from '@testing-library/react';

describe('common', () => {
  const snapshot = render(<AppNavigation {...MOCK_APP_NAVIGATION_PROPS}/>);

  it('default test', () => {
    expect(snapshot.baseElement).toMatchSnapshot();
  });
});
