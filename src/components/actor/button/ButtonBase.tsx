
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

const ButtonBaseWrapper = styled.button`
  background-color: inherit;
  color: ${color.font};
  padding: ${space.xs};
  border-radius: 8px;
  border: 0;
  outline: 0;
  transition: box-shadow ease-out 0.3s;
  box-shadow:  4px 4px 12px ${color.backgroundDarkShadowDarken},
                 -4px -4px 12px ${color.backgroundDarkShadowLighten};
  &:active {
    box-shadow: inset 4px 4px 12px ${color.backgroundDarkShadowDarken},
                inset -4px -4px 12px ${color.backgroundDarkShadowLighten};
  }
`
