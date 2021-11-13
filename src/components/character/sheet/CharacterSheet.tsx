/**
 * TODO: 要リファクタリング
 */
import React from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import {
  abilityListAtom,
  mainWeaponAtom,
  nameAtom,
  subWeaponAtom,
} from 'src/data/atom'
import { IAbility, IWeapon } from 'src/interfaces'
// import { useToggle } from 'react-use'
import { color, space } from 'src/assets/style'
import { Icons } from 'src/assets/icons'
import { ButtonBase } from '../../actor/button/ButtonBase'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import {
  decodeObfuscatedTextToReadable,
  encodeTextToObfuscated,
} from 'src/utils/Obfuscation'
import { ModeAbility } from './molecules/ability/ModeAbility'
import { ModeBattle } from './molecules/battle/ModeBattle'

type IData = {
  name: string
  mainWeapon: IWeapon
  subWeapon: IWeapon
  abilities: IAbility[]
}

export interface ICharacterSheetProps {}

export const CharacterSheet: React.VFC<ICharacterSheetProps> = () => {
  /**
   * 基礎データ
   */
  const [name, setName] = useRecoilState(nameAtom)
  const [mainWeapon, setMainWeapon] = useRecoilState(mainWeaponAtom)
  const [subWeapon, setSubWeapon] = useRecoilState(subWeaponAtom)
  const [abilities, setAbilities] = useRecoilState(abilityListAtom)

  /**
   * モード：探索 / 戦闘
   */
  /*
  const [isAdventureMode, toggleAdventureMode] = useToggle(false) // 探索 / 戦闘
  const [isEditMode, toggleEditMode] = useToggle(false) // 編集モードは戦闘モードの子要素
*/

  // TODO: コンポーネント化
  // 保存 / 読込
  const handleClickToSave = (): string => {
    const jsonData: IData = {
      name: name,
      // hp: hp, recoil に含めるかどうか
      mainWeapon: mainWeapon,
      subWeapon: subWeapon,
      // skillHand: skillHand... recoil に含めるかどうか
      abilities: abilities,
    }
    const textData = JSON.stringify(jsonData)
    return encodeTextToObfuscated(textData)
  }
  const [dataToLoad, setDataToLoad] = React.useState('')
  const handleClickToLoad = (): void => {
    if (!dataToLoad) return
    const textData = decodeObfuscatedTextToReadable(dataToLoad)
    const jsonData: IData = JSON.parse(textData)

    setName(jsonData.name ?? name)
    setMainWeapon(jsonData.mainWeapon ?? mainWeapon)
    setSubWeapon(jsonData.subWeapon ?? subWeapon)
    setAbilities(jsonData.abilities ?? abilities)

    setDataToLoad('')
  }

  return (
    <CharacterSheetWrapper>
      <CopyWrapper>
        <LoadInputField>
          <LoadInput
            value={dataToLoad}
            onChange={(e) => setDataToLoad(e.currentTarget.value)}
          />
          <SaveAndLoadButton>
            <ButtonBase onClick={handleClickToLoad}>
              <img src={Icons.Paste} alt="paste" style={{ width: '32px' }} />
            </ButtonBase>
          </SaveAndLoadButton>
        </LoadInputField>
        <CopyToClipboard
          text={(() => handleClickToSave())()}
          onCopy={() => alert('data is saved!')}
        >
          <SaveAndLoadButton>
            <ButtonBase lighten>
              <img src={Icons.Save} alt="save" style={{ width: '32px' }} />
            </ButtonBase>
          </SaveAndLoadButton>
        </CopyToClipboard>
      </CopyWrapper>
      <Name>{name}</Name>
      <div>
        <ModeAbility />
      </div>
      <div>
        <ModeBattle />
      </div>
    </CharacterSheetWrapper>
  )
}

/**
 * css
 */
const CharacterSheetWrapper = styled.div`
  max-width: 90%;
  min-width: 60%;
  min-height: 84vh;
  margin: 0 auto;
  width: 100%;
`
const CopyWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  column-gap: ${space.xs};
`
const LoadInputField = styled.div`
  display: flex;
  margin-right: ${space.xxs};
  align-items: center;
  height: 3rem;
`
const LoadInput = styled.input`
  border: 1px solid ${color.backgroundHighContrastShadowLighten};
  background-color: inherit;
  max-width: 30vw;
  height: 3rem;
  border-radius: 0.5rem;
`
const SaveAndLoadButton = styled.div`
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 0.5rem;

  &:hover {
    height: 3rem;
    padding: 0.125rem 0;
    border-radius: 0.2rem;
  }
`

const Name = styled.h1`
  margin: ${space.l} auto;
`
