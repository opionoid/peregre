import { RecoilRoot } from 'recoil'
import { CharacterSheet } from 'src/components/character/sheet/CharacterSheet'
import MOCK_CHARACTER_SHEET_PROPS from 'src/__mocks__/components/character/CharacterSheet'
import { render } from '@testing-library/react'

describe('character', () => {
  const snapshot = render(
    <RecoilRoot>
      <CharacterSheet {...MOCK_CHARACTER_SHEET_PROPS} />
    </RecoilRoot>
  )

  it('default test', () => {
    expect(snapshot.baseElement).toMatchSnapshot()
  })
})
