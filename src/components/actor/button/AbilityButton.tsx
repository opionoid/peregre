import React from 'react'
import styled from 'styled-components'
import { space } from 'src/assets/style'
import { IAbility } from 'src/interfaces'
import { ButtonBase } from './ButtonBase'

export interface IAbilityButtonProps {
  ability: IAbility
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const AbilityButton: React.VFC<IAbilityButtonProps> = ({
  ability,
  onClick,
}) => {
  return (
    <AbilityButtonWrapper>
      <ButtonBase onClick={onClick}>
        <Icon {...ability.icon} />
        <Label>{ability.name}</Label>
      </ButtonBase>
    </AbilityButtonWrapper>
  )
}

const AbilityButtonWrapper = styled.div`
  border-radius: 40px;
  width: 142px;
  height: 160px;
  transition: all 0.1s ease-out;
  &:hover {
    border-radius: 24px;
    opacity: 0.98;
    transform: translateZ(1.8);
  }
`

const Icon = styled.img`
  width: 60px;
  height: 60px;
  margin-top: ${space.xs};
`

const Label = styled.p``
