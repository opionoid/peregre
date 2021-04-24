
import React from 'react'
import styled from 'styled-components'
import { color, space } from '~/assets/style'

export interface IButtonBaseProps {
  children?: React.ReactNode,
  type?: 'button' | 'submit' | 'reset',
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const ButtonBase: React.FC<IButtonBaseProps> = ({ children, type = 'button', onClick }) => {
  return (
    <ButtonBaseWrapper type={type} onClick={onClick}>
      {children}
    </ButtonBaseWrapper>
  )
}

// TODO: 押した時に中身を若干小さくする
// TODO: もっとかわいい感じのアニメーション
const ButtonBaseWrapper = styled.button`
  background-color: inherit;
  color: ${color.font};
  padding: ${space.xs};
  border-radius: 8px;
  border: 0;
  outline: 0;
  transition: box-shadow ease-out 0.3s;
  box-shadow:  2px 2px 6px ${color.backgroundDarkShadowDarken},
                 -2px -2px 6px ${color.backgroundDarkShadowLighten};
  &:active {
    box-shadow: inset 2px 2px 6px ${color.backgroundDarkShadowDarken},
                inset -2px -2px 6px ${color.backgroundDarkShadowLighten};
  }
`
