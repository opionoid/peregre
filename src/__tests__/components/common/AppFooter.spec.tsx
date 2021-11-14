import { BrowserRouter as Router } from 'react-router-dom'
import { AppFooter } from 'src/components/common/AppFooter';
import MOCK_APP_FOOTER_PROPS from 'src/__mocks__/components/common/AppFooter';
import { render } from '@testing-library/react';

describe('common', () => {
  const snapshot = render(
    <Router>
      <AppFooter {...MOCK_APP_FOOTER_PROPS} />
    </Router>
  );

  it('default test', () => {
    expect(snapshot.baseElement).toMatchSnapshot();
  });
});
