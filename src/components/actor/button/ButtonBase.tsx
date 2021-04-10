
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
`
