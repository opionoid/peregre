
import React from 'react'
import styled, { css } from 'styled-components'
import { color, space } from '~/assets/style'

export interface IButtonBaseProps {
  children?: React.ReactNode
  isEditMode?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  unset?: boolean
  lighten?: boolean
  name?: string;
  value?: any;
}

export const ButtonBase: React.FC<IButtonBaseProps> = ({ children, isEditMode = false, type = 'button', onClick, unset = false, lighten = false, name, value }) => {
  return (
    <ButtonBaseWrapper type={type} onClick={onClick} isEditMode={isEditMode} unset={unset} lighten={lighten} name={name} value={value}>
      {children}
    </ButtonBaseWrapper>
  )
}

// TODO: 押した時に中身を若干小さくする
// TODO: もっとかわいい感じのアニメーション
// TODO: 型推論が効いていない
const ButtonBaseWrapper = styled.button<IButtonBaseProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${color.backgroundHighContrast};
  color: ${color.fontInHighContrast};
  padding: ${space.xs};
  border: 0;
  border-radius: inherit;
  outline: 0;
  transition: box-shadow ease-out 0.3s;
  font-size: calc(0.8rem + 0.5vmin);
  line-height: 1.8;
  box-shadow:  2px 2px 6px ${color.backgroundLowContrastShadowDarken},
                 -2px -2px 6px ${color.backgroundLowContrastShadowLighten};
  &:active {
    box-shadow: inset 2px 2px 6px ${color.backgroundLowContrastShadowDarken},
                inset -2px -2px 6px ${color.backgroundLowContrastShadowLighten};
  }

  ${props => props.isEditMode && css `
    border-radius: 20px;
  `}

  ${props => props.unset && css `
    color: ${color.background};
    background-color: ${color.font};
  `}

  ${props => props.lighten && css`
    color: ${color.font};
    background-color: ${color.background};
  `}
`
