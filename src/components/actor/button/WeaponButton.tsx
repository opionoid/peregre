import React from 'react'
import styled from 'styled-components'
import { space } from 'src/assets/style'
import { ISkill } from 'src/interfaces'
import { ButtonBase } from './ButtonBase'

export interface IWeaponButtonProps {
  skill: ISkill
  setCurrentSkill: any
}

export const WeaponButton: React.VFC<IWeaponButtonProps> = ({
  skill,
  setCurrentSkill,
}) => {
  const handleClick = () => {
    if (skill == null) return
    setCurrentSkill()
  }

  return (
    <WeaponButtonWrapper>
      <ButtonBase onClick={handleClick}>
        <Icon {...skill.icon} />
        <Label>{skill.name}</Label>
      </ButtonBase>
    </WeaponButtonWrapper>
  )
}

const WeaponButtonWrapper = styled.div`
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
