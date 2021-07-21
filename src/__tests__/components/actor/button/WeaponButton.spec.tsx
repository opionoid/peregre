import { WeaponButton } from 'src/components/actor/button/WeaponButton'
import MOCK_WEAPON_BUTTON_PROPS from 'src/__mocks__/components/actor/button/WeaponButton'
import { render } from '@testing-library/react'

describe('actor/button', () => {
  const snapshot = render(<WeaponButton {...MOCK_WEAPON_BUTTON_PROPS} />)

  it('default test', () => {
    expect(snapshot.baseElement).toMatchSnapshot()
  })
})
