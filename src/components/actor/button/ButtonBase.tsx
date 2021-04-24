
import React from 'react'
import styled, { css } from 'styled-components'
import { color, space } from '~/assets/style'

export interface IButtonBaseProps {
  children?: React.ReactNode
  isEditMode?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  unset?: boolean
}

export const ButtonBase: React.FC<IButtonBaseProps> = ({ children, isEditMode = false, type = 'button', onClick, unset = false }) => {
  return (
    <ButtonBaseWrapper editMode={isEditMode} type={type} onClick={onClick} unset={unset}>
      {children}
    </ButtonBaseWrapper>
  )
}

// TODO: 押した時に中身を若干小さくする
// TODO: もっとかわいい感じのアニメーション
// TODO: 型推論が効いていない
const ButtonBaseWrapper = styled.button`
  width: 100%;
  height: 100%;
  display flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: inherit;
  color: ${color.font};
  padding: ${space.xs};
  border-radius: 40px;
  border: 0;
  outline: 0;
  transition: box-shadow ease-out 0.3s;
  box-shadow:  2px 2px 6px ${color.backgroundDarkShadowDarken},
                 -2px -2px 6px ${color.backgroundDarkShadowLighten};
  &:active {
    box-shadow: inset 2px 2px 6px ${color.backgroundDarkShadowDarken},
                inset -2px -2px 6px ${color.backgroundDarkShadowLighten};
  }

  ${props => props.editMode && css `
    border-radius: 20px;
  `}

  ${props => props.unset && css `
    color: ${color.background};
    background-color: ${color.font};
  `}
`
