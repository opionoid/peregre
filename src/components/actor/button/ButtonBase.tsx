import React from 'react'
import styled, { css } from 'styled-components'
import { color, space } from 'src/assets/style'

export interface IButtonBaseProps {
  children?: React.ReactNode
  isEditMode?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  accent?: boolean
  lighten?: boolean
  name?: string
  value?: any
  disabled?: boolean
}

export const ButtonBase: React.FC<IButtonBaseProps> = ({
  children,
  isEditMode = false,
  type = 'button',
  onClick,
  accent = false,
  lighten = false,
  name,
  value,
  disabled = false
}) => {
  return (
    <ButtonBaseWrapper
      type={type}
      onClick={onClick}
      isEditMode={isEditMode}
      accent={accent}
      lighten={lighten}
      name={name}
      value={value}
      aria-disabled={disabled}
    >
      {children}
    </ButtonBaseWrapper>
  )
}

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
  transition: all ease-out 0.3s;
  font-size: 1.125rem;
  box-shadow: 2px 2px 6px ${color.backgroundLowContrastShadowDarken},
    -2px -2px 6px ${color.backgroundLowContrastShadowLighten};
  &:active,
  &[aria-pressed='true'] {
    box-shadow: inset 2px 2px 6px ${color.backgroundLowContrastShadowDarken},
      inset -2px -2px 6px ${color.backgroundLowContrastShadowLighten};
    transform: scale3d(0.98, 0.98, 0.99);
  }
  &[aria-disabled='true'] {
    cursor: not-allowed;
    background-color: ${color.backgroundLowContrast};
  }

  ${(props) =>
    props.isEditMode &&
    css`
      border-radius: 20px;
    `}

  ${(props) =>
    props.accent &&
    css`
      color: ${color.fontInHighContrast};
      background-color: ${color.accent};
    `}

  ${(props) =>
    props.lighten &&
    css`
      color: ${color.font};
      background-color: ${color.background};
    `}
`
