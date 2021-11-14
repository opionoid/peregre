import { RecoilRoot } from 'recoil'
import { CharacterMaking } from 'src/components/character/making/CharacterMaking'
import MOCK_CHARACTER_MAKING_PROPS from 'src/__mocks__/components/character/CharacterMaking'
import { render } from '@testing-library/react'

describe('character', () => {
  const snapshot = render(
    <RecoilRoot>
      <CharacterMaking {...MOCK_CHARACTER_MAKING_PROPS} />
    </RecoilRoot>
  )

  it('default test', () => {
    expect(snapshot.baseElement).toMatchSnapshot()
  })
})
