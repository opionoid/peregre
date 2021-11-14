import { BrowserRouter as Router } from 'react-router-dom'
import { AppNavigation } from 'src/components/common/AppNavigation'
import MOCK_APP_NAVIGATION_PROPS from 'src/__mocks__/components/common/AppNavigation'
import { render } from '@testing-library/react'

describe('common', () => {
  const snapshot = render(
    <Router>
      <AppNavigation {...MOCK_APP_NAVIGATION_PROPS} />
    </Router>
  )

  it('default test', () => {
    expect(snapshot.baseElement).toMatchSnapshot()
  })
})
